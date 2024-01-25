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
import React, { useContext, useState } from 'react'

interface LocationLanguageChartProps {
  locationID: string
  timeline: string
}

export const LanguagesDataWithThai = [
  {
    id: 0,
    value: 10,
    label: `English ${((10 * 100) / 85).toFixed(2)} %`,
  },
  {
    id: 1,
    value: 15,
    label: `Thai ${((15 * 100) / 85).toFixed(2)} %`,
  },
  {
    id: 2,
    value: 20,
    label: `France ${((20 * 100) / 85).toFixed(2)} %`,
  },
  {
    id: 3,
    value: 20,
    label: `Korean ${((20 * 100) / 85).toFixed(2)} %`,
  },
  {
    id: 4,
    value: 20,
    label: `Spanish ${((20 * 100) / 85).toFixed(2)} %`,
  },
]

export const LanguagesDataWithoutThai = [
  {
    id: 0,
    value: 10,
    label: `English ${((10 * 100) / 70).toFixed(2)} %`,
  },

  {
    id: 2,
    value: 20,
    label: `France ${((20 * 100) / 70).toFixed(2)} %`,
  },
  {
    id: 3,
    value: 20,
    label: `Korean ${((20 * 100) / 70).toFixed(2)} %`,
  },
  {
    id: 4,
    value: 20,
    label: `Spanish ${((20 * 100) / 70).toFixed(2)} %`,
  },
]

export const LanguagesDetailWithThai = [
  {
    id: 0,
    language: 'English',
    percent: `${((10 * 100) / 85).toFixed(2)} %`,
    total: 10,
  },
  {
    id: 1,
    language: 'Thai',
    percent: `${((15 * 100) / 85).toFixed(2)} %`,
    total: 15,
  },
  {
    id: 2,
    language: 'France',
    percent: `${((20 * 100) / 85).toFixed(2)} %`,
    total: 20,
  },
  {
    id: 3,
    language: 'Korean',
    percent: `${((20 * 100) / 85).toFixed(2)} %`,
    total: 20,
  },
  {
    id: 4,
    language: 'Spanish',
    percent: `${((20 * 100) / 85).toFixed(2)} %`,
    total: 20,
  },
]

export const LanguagesDetailWithoutThai = [
  {
    id: 0,
    language: 'English',
    percent: `${((10 * 100) / 70).toFixed(2)} %`,
    total: 10,
  },
  {
    id: 1,
    language: 'France',
    percent: `${((20 * 100) / 70).toFixed(2)} %`,
    total: 20,
  },
  {
    id: 2,
    language: 'Korean',
    percent: `${((20 * 100) / 70).toFixed(2)} %`,
    total: 20,
  },
  {
    id: 3,
    language: 'Spanish',
    percent: `${((20 * 100) / 70).toFixed(2)} %`,
    total: 20,
  },
]

export default function LocationLanguageChart(
  props: LocationLanguageChartProps
) {
  const { locationID, timeline } = props
  const [selectedThai, setSelectedThai] = useState<boolean>(true)
  const theme = useTheme()
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
              data: selectedThai
                ? LanguagesDataWithThai
                : LanguagesDataWithoutThai,
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
              onClick={() => setSelectedThai(!selectedThai)}
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
          ? LanguagesDetailWithThai.map((x) => (
              <Box
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
                  {x.total} users
                </Typography>
              </Box>
            ))
          : LanguagesDetailWithoutThai.map((x) => (
              <Box
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
                  {x.total} users
                </Typography>
              </Box>
            ))}
      </Box>
    </>
  )
}
