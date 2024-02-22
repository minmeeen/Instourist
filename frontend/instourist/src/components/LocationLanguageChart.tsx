import { PieChart } from '@mui/x-charts/PieChart'
import {
  Box,
  FormControl,
  FormControlLabel,
  InputLabel,
  PaletteColor,
  Typography,
  useTheme,
} from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import React, { useContext, useEffect, useState } from 'react'
import {
  languageDetectedData,
  pieChartLanguageDetectedData,
  transformLanguageDetectedData,
} from '../constant/getDataType'
import axios from 'axios'

interface LocationLanguageChartProps {
  locationID: string
  timeline: string
}

export default function LocationLanguageChart(
  props: LocationLanguageChartProps
) {
  const { locationID, timeline } = props
  const [selectedThai, setSelectedThai] = useState<boolean>(true)
  const theme = useTheme()
  const initial = {
    'Number of posts': 0,
    Languages: {},
  }

  const [reponseData, setResponseData] = useState<languageDetectedData>(initial)

  const [afterTransformData, setAfterTransformData] = useState<
    transformLanguageDetectedData[]
  >([])

  const [afterTransformDataNoThai, setAfterTransformDataNoThai] = useState<
    transformLanguageDetectedData[]
  >([])

  const [pieChartData, setPieChartData] = useState<
    pieChartLanguageDetectedData[]
  >([])

  const [pieChartDataNoThai, setPieChartDataNoThai] = useState<
    pieChartLanguageDetectedData[]
  >([])

  function transformData() {
    let total0 = Number(Object.values(reponseData?.Languages)[0])
    let total1 = Number(Object.values(reponseData?.Languages)[1])
    let total2 = Number(Object.values(reponseData?.Languages)[2])
    let language0 = Object.keys(reponseData?.Languages)[0]
    let language1 = Object.keys(reponseData?.Languages)[1]
    let language2 = Object.keys(reponseData?.Languages)[2]

    setAfterTransformData([
      {
        id: 0,
        language: language0,
        percent: `${((total0 * 100) / reponseData['Number of posts']).toFixed(
          2
        )} %`,
        total: total0,
      },
      {
        id: 1,
        language: language1,
        percent: `${((total1 * 100) / reponseData['Number of posts']).toFixed(
          2
        )} %`,
        total: total1,
      },
      {
        id: 2,
        language: language2,
        percent: `${((total2 * 100) / reponseData['Number of posts']).toFixed(
          2
        )} %`,
        total: total2,
      },
    ])

    setPieChartData([
      {
        id: 0,
        value: total0,
        label: `${language0} ${(
          (total0 * 100) /
          reponseData['Number of posts']
        ).toFixed(2)} %`,
      },
      {
        id: 1,
        value: total1,
        label: `${language1} ${(
          (total1 * 100) /
          reponseData['Number of posts']
        ).toFixed(2)} %`,
      },
      {
        id: 2,
        value: total2,
        label: `${language2} ${(
          (total2 * 100) /
          reponseData['Number of posts']
        ).toFixed(2)} %`,
      },
    ])
  }

  useEffect(() => {
    if (reponseData === initial) {
      getData()
    }
  }, [])

  useEffect(() => {
    transformData()
  }, [reponseData])

  const getData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/languageDetected/locationId=1&time=1705708800&duration=1D`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      console.log('first', response.data)
      setResponseData(response.data)
    } catch (error) {
      // Handle errors (e.g., display an error message)
      console.error('Error fetching item:', error)
    }
  }

  const handleClickSelectThai = () => {
    setSelectedThai(!selectedThai)
    const mockData = afterTransformData.filter((x) => x.language !== 'Thai')
    const mockPie = pieChartData.filter(
      (x) =>
        x.label !==
        `Thai ${((x.value * 100) / reponseData['Number of posts']).toFixed(
          2
        )} %`
    )

    setAfterTransformDataNoThai(mockData)
    setPieChartDataNoThai(mockPie)
  }

  return (
    <>
      <Box
        display={'flex'}
        width={'100%'}
        alignItems={'center'}
        flexDirection={'column'}
      >
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
        {selectedThai
          ? afterTransformData.map((x) => (
              <Box
                id={x.id + 'lan'}
                display={'flex'}
                width={'90%'}
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
            ))
          : afterTransformDataNoThai.map((x) => (
              <Box
                id={x.id + 'lan'}
                display={'flex'}
                width={'90%'}
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
    </>
  )
}
