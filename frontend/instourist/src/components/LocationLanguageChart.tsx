import { PieChart } from '@mui/x-charts/PieChart'
import {
  Box,
  CircularProgress,
  FormControlLabel,
  Typography,
  useMediaQuery,
} from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import { useState } from 'react'
import {
  googlepieChartLanguageDetectedData,
  languageDetectedInitData,
  pieChartLanguageDetectedData,
  transformLanguageDetectedData,
} from '../constant/getDataType'
import { CalendarMonthOutlined } from '@mui/icons-material'
import { webSiteLabel } from '../constant/websiteLabel'
import { Chart } from 'react-google-charts'
import CustomPieChart from './PieChart'

interface LocationLanguageChartProps {
  responseData: languageDetectedInitData | null
  responseStatus: number
  loadingResponsese: boolean
  transformingData: boolean
  afterTransformData: transformLanguageDetectedData[]
  afterTransformDataNoThai: transformLanguageDetectedData[]
  pieChartData: pieChartLanguageDetectedData[]
  googlepieChartData: [string, number][] | [string, string][]
  pieChartDataNoThai: pieChartLanguageDetectedData[]
  googlepieChartDataNoThai: [string, number][] | [string, string][]
}

export default function LocationLanguageChart(
  props: LocationLanguageChartProps
) {
  const {
    responseStatus,
    afterTransformData,
    afterTransformDataNoThai,
    pieChartData,
    googlepieChartData,
    pieChartDataNoThai,
    googlepieChartDataNoThai,
    loadingResponsese,
    transformingData,
  } = props
  const [selectedThai, setSelectedThai] = useState<boolean>(true)
  const matches = useMediaQuery('(min-width:960px)')

  const handleClickSelectThai = () => {
    setSelectedThai(!selectedThai)
  }

  // var now = dayjs()
  // var day = new Date().getDate()
  var day = new Date().toUTCString().split(' ').at(0)
  var month = new Date().toUTCString().split(' ').at(1)
  var year = new Date().toUTCString().split(' ').at(2)
  var year2 = new Date().toUTCString().split(' ').at(3)
  // var year = new Date().getFullYear()

  const hasWindow = typeof window !== 'undefined'

  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : null
    const height = hasWindow ? window.innerHeight : null
    return {
      width,
      height,
    }
  }

  function getChartWidth() {
    if (getWindowDimensions().width && matches) {
      return '100%'
    } else if (getWindowDimensions().width && !matches) {
      return '100%'
    } else {
      return 500
    }
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
        {loadingResponsese || transformingData ? (
          <Box
            height={'60vh'}
            display={'flex'}
            textAlign={'center'}
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            gap={'16px'}
          >
            <CircularProgress />
            <Typography variant='h6' color={'text.primary'}>
              {webSiteLabel.loadingDataTH}
            </Typography>
          </Box>
        ) : (
          <Box>
            {responseStatus !== 200 ? (
              <Box
                height={'45vh'}
                display={'flex'}
                alignItems={'center'}
                textAlign={'center'}
              >
                <Typography variant='h6' color={'text.primary'}>
                  {webSiteLabel.dataNotFoundTH}
                </Typography>
              </Box>
            ) : (
              <Box
                width={'100%'}
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
              >
                <CustomPieChart
                  selectedThai={selectedThai}
                  googlepieChartData={googlepieChartData}
                  googlepieChartDataNoThai={googlepieChartDataNoThai}
                  pieChartWidth={'100%'}
                />

                <Box
                  id='lan-pie-and-detail'
                  display={'flex'}
                  width={matches ? '80vw' : '80%'}
                  flexDirection={'column'}
                  alignItems={'center'}
                  gap={'16px'}
                >
                  <Box
                    id='select-thai-form'
                    display={'flex'}
                    justifyContent={'center'}
                  >
                    <FormControlLabel
                      label={
                        <Typography variant='h6' color={'text.primary'}>
                          {webSiteLabel.includeThaiTH}
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
                    width={matches ? '36vw' : '80vw'}
                    display={'flex'}
                    justifyContent={'center'}
                    flexDirection={'column'}
                    paddingX={'16px'}
                  >
                    {selectedThai
                      ? afterTransformData.map((x) => (
                          <Box
                            key={x.id + 'lan'}
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
                              {x.total + ' ' + webSiteLabel.postsTH}
                            </Typography>
                          </Box>
                        ))
                      : afterTransformDataNoThai.map((x) => (
                          <Box
                            key={x.id + 'lan'}
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
                              {x.total + ' ' + webSiteLabel.postsTH}
                            </Typography>
                          </Box>
                        ))}
                  </Box>
                </Box>

                <Typography variant='h6' color={'GrayText'}>
                  {webSiteLabel.lastUpdateOnTH +
                    ' ' +
                    day +
                    ' ' +
                    month +
                    ' ' +
                    year +
                    ' ' +
                    year2}
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </>
  )
}
