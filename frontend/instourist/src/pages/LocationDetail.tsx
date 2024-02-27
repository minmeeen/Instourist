import { createContext, useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { Box, useMediaQuery, useTheme } from '@mui/material'
import LocationSideBar from '../components/LocationSideBar'
import { findLocationID } from '../functions/findLocationID'
import ExploreOtherLocation from '../components/ExploreOtherLocation'
import CustomMapGL from '../components/CustomMapGL'
import {
  languageDetectedInitData,
  pieChartLanguageDetectedData,
  transformLanguageDetectedData,
} from '../constant/getDataType'
import LocationLanguageChart from '../components/LocationLanguageChart'
import { useGet } from '../functions/getData'
import axios from 'axios'

export const ExploreOtherLocationContext = createContext({
  toggleExploreMode: () => {},
})

export default function LocationDetail() {
  const params = useParams()
  const locationID = params.locationID
  const theme = useTheme()
  const [fullSize, setFullSize] = useState<boolean>(false)
  const matches = useMediaQuery('(min-width:960px)')

  const [timeline, setTimeline] = useState<string>('1D')

  const [transformingData, setTransformingData] = useState<boolean>(false)
  const [afterTransformData, setAfterTransformData] = useState<
    transformLanguageDetectedData[]
  >([])
  const [afterTransformDataNoThai, setAfterTransformDataNoThai] = useState<
    transformLanguageDetectedData[]
  >([])
  const [pieChartData, setpieChartData] = useState<
    pieChartLanguageDetectedData[]
  >([])
  const [pieChartDataNoThai, setpieChartDataNoThai] = useState<
    pieChartLanguageDetectedData[]
  >([])

  var time = Math.round(new Date().getTime() / 1000)
  const [responseData, loadingResponsese, getData, responseStatus] =
    useGet<languageDetectedInitData>({
      url: `/locationId=${locationID}&time=${time}&duration=${timeline}`,
      autoFetch: false,
    })

  function transformData() {
    if (responseStatus === 200 && responseData && !responseData.Message) {
      const allPost = responseData?.NumberOfPosts ?? 0

      const thaiPost =
        responseData.Languges.filter(
          (x) => x.languageName.toUpperCase() === 'THAI'
        )
          .map((x) => x.total)
          .at(0) ?? 0
      const allPostNoThai = allPost - +thaiPost
      var id: number = -1

      let mockAfterTransformData: transformLanguageDetectedData[] = []
      let mockAfterTransformDataNoThai: transformLanguageDetectedData[] = []
      let mockPieChartData: pieChartLanguageDetectedData[] = []
      let mockPieChartDataNoThai: pieChartLanguageDetectedData[] = []
      setAfterTransformData(mockAfterTransformData) // clear the list when re-render
      setAfterTransformDataNoThai(mockAfterTransformDataNoThai)
      setpieChartData(mockPieChartData)
      setpieChartDataNoThai(mockPieChartDataNoThai)
      setTransformingData(true)
      responseData.Languges.forEach((x) => {
        id += 1
        mockAfterTransformData.push({
          id: id,
          language: x.languageName,
          percent: ((x.total * 100) / allPost).toFixed(2),
          total: x.total,
        })

        mockPieChartData.push({
          id: id,
          value: +x.total,
          label: x.languageName,
        })

        if (x.languageName.toUpperCase() !== 'THAI') {
          mockAfterTransformDataNoThai.push({
            id: id,
            language: x.languageName,
            percent: ((x.total * 100) / allPostNoThai).toFixed(2),
            total: x.total,
          })

          mockPieChartDataNoThai.push({
            id: id,
            value: +x.total,
            label: x.languageName,
          })
        }
      })
      setAfterTransformData(mockAfterTransformData)
      setTransformingData(false)
    }
  }

  useEffect(() => {
    getData()
    console.log('getData')
  }, [timeline, locationID])

  useEffect(() => {
    transformData()
  }, [responseData])

  return (
    <Box>
      <Navbar variant='other' />

      <Box display={'flex'} flexDirection={matches ? 'row' : 'column'}>
        <Box
          padding={'12px 24px'}
          borderRight={'1px solid rgba(0,0,0,0.12)'}
          bgcolor={theme.palette.mode === 'dark' ? '#2C2C2C' : '#f5f5f5'}
          justifyContent={'space-between'}
          width={matches ? '70%' : '95%'}
          // maxHeight={'90vh'}
          sx={{ overflowY: 'scroll' }}
        >
          {!fullSize && (
            <>
              <LocationSideBar
                location={findLocationID(locationID!)}
                timeline={timeline}
                setTimeline={setTimeline}
              />
              <LocationLanguageChart
                key={'lan-chart-' + locationID}
                responseData={responseData}
                responseStatus={responseStatus}
                loadingResponsese={loadingResponsese}
                transformingData={transformingData}
                afterTransformData={afterTransformData}
                afterTransformDataNoThai={afterTransformDataNoThai}
                pieChartData={pieChartData}
                pieChartDataNoThai={pieChartDataNoThai}
              />
            </>
          )}
          <ExploreOtherLocation
            fullSize={fullSize}
            setFullSize={setFullSize}
            location={findLocationID(locationID!)}
          />
        </Box>

        {/* <MapBox locationID={findLocationID(locationID!)} />
        <AppMap mapRef={mapRef} viewport={viewport} setViewport={setViewport} /> */}

        <CustomMapGL key={'mapbox-' + locationID} locationID={locationID!} />
      </Box>
    </Box>
  )
}
