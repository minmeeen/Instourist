import { PieChart } from '@mui/x-charts/PieChart'
import {
  Box,
  CircularProgress,
  FormControlLabel,
  Typography,
  useTheme,
} from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import React, { useEffect, useMemo, useState } from 'react'
import {
  languageDetectedInitData,
  pieChartLanguageDetectedData,
  transformLanguageDetectedData,
} from '../constant/getDataType'
import { getData } from '../functions/getData'

interface LocationLanguageChartProps {
  locationID: string
  duration: string
}

export default function LocationLanguageChart(
  props: LocationLanguageChartProps
) {
  const { locationID, duration } = props
  const [selectedThai, setSelectedThai] = useState<boolean>(true)
  const theme = useTheme()
  const initial = {
    NumberOfPosts: 0,
    Languges: [],
  }

  const [responseData, setResponseData] =
    useState<languageDetectedInitData>(initial)
  const [responseStatus, setResponseStatus] = useState<number>(-1)
  const [loadingResponsese, setLoadingResponsese] = useState<boolean>(false)
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

  const mainUrl = 'http://172.104.62.253:8000/languageDetected'
  var time = Math.round(new Date().getTime() / 1000)
  const toGetUrl = `${mainUrl}/locationId=${locationID}&time=${time}&duration=${duration}`

  const forTestUrl = `http://172.104.62.253:8000/languageDetected/locationId=1&time=1705708800&duration=${duration}`

  function transformData() {
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
    setLoadingResponsese(true)
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
    setLoadingResponsese(false)
    console.log('afterTransformData', afterTransformData)
    console.log('afterTransformDataNoThai', afterTransformDataNoThai)
  }

  useMemo(() => {
    if (responseData === initial) {
      getData(
        forTestUrl,
        setResponseData,
        setResponseStatus,
        setLoadingResponsese
      )
    }
  }, [])

  useMemo(() => {
    getData(
      forTestUrl,
      setResponseData,
      setResponseStatus,
      setLoadingResponsese
    )
  }, [duration])

  useEffect(() => {
    transformData()
  }, [responseData])

  const handleClickSelectThai = () => {
    setSelectedThai(!selectedThai)
  }

  return (
    <>
      <Box
        display={'flex'}
        width={'100%'}
        alignItems={'center'}
        flexDirection={'column'}
        minHeight={'55vh'}
      >
        {/* 2 Types of nodata 1.responsedData = {Message: 'No data'}, 2. responseStatus !== 200 */}
        {loadingResponsese ? (
          <Box
            height={'45vh'}
            display={'flex'}
            textAlign={'center'}
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            gap={'16px'}
          >
            <CircularProgress />
            <Typography variant='h6' color={'text.primary'}>
              Loading datas..
            </Typography>
          </Box>
        ) : (
          <Box>
            {responseData?.Message === 'No data' || responseStatus === 400 ? (
              <Box
                height={'45vh'}
                display={'flex'}
                alignItems={'center'}
                textAlign={'center'}
              >
                <Typography variant='h6' color={'text.primary'}>
                  Please select different timeline or another location.
                </Typography>
              </Box>
            ) : (
              <Box
                id='lan-pie-and-detail'
                display={'flex'}
                width={'40vw'}
                flexDirection={'column'}
                gap={'16px'}
              >
                <Box id='pie-chart' display={'flex'} justifyContent={'center'}>
                  <PieChart
                    series={[
                      {
                        data: selectedThai ? pieChartData : pieChartDataNoThai,
                        innerRadius: '60px',
                      },
                    ]}
                    width={500}
                    height={200}
                  />
                </Box>

                <Box
                  id='select-thai-form'
                  width={'100%'}
                  display={'flex'}
                  justifyContent={'center'}
                >
                  <FormControlLabel
                    label={
                      <Typography variant='h6' color={'text.primary'}>
                        Include Thai language
                      </Typography>
                    }
                    control={
                      <Checkbox
                        onClick={handleClickSelectThai}
                        checked={selectedThai}
                        sx={{
                          '&.Mui-checked': {
                            color: 'primary',
                          },
                        }}
                      />
                    }
                  />
                </Box>

                <Box
                  id='lan-detail'
                  display={'flex'}
                  justifyContent={'center'}
                  flexDirection={'column'}
                  paddingX={'16px'}
                >
                  {selectedThai
                    ? afterTransformData.map((x) => (
                        <Box
                          id={x.id + 'lan'}
                          display={'flex'}
                          justifyContent={'space-between'}
                        >
                          <Box width={'40%'}>
                            <Typography variant='h6' color={'text.primary'}>
                              {' '}
                              {x.language}
                            </Typography>
                          </Box>

                          <Typography variant='h6' color={'text.primary'}>
                            {' '}
                            {x.percent} %
                          </Typography>
                          <Typography variant='h6' color={'gray'}>
                            {' '}
                            {x.total} posts
                          </Typography>
                        </Box>
                      ))
                    : afterTransformDataNoThai.map((x) => (
                        <Box
                          id={x.id + 'lan'}
                          display={'flex'}
                          justifyContent={'space-between'}
                        >
                          <Box width={'40%'}>
                            <Typography variant='h6' color={'text.primary'}>
                              {' '}
                              {x.language}
                            </Typography>
                          </Box>

                          <Typography variant='h6' color={'text.primary'}>
                            {' '}
                            {x.percent}
                          </Typography>
                          <Typography variant='h6' color={'gray'}>
                            {' '}
                            {x.total} posts
                          </Typography>
                        </Box>
                      ))}
                </Box>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </>
  )
}
