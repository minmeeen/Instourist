import { Box, Typography } from '@mui/material'
import React from 'react'
import { LanguagesDataWithThai } from './LocationLanguageChart'

interface LocationLanguageDetailProps {
  locationID: string
  timeline: string
}

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
    percent: `${((10 * 100) / 85).toFixed(2)} %`,
    total: 10,
  },
  {
    id: 1,
    language: 'France',
    percent: `${((20 * 100) / 85).toFixed(2)} %`,
    total: 20,
  },
  {
    id: 2,
    language: 'Korean',
    percent: `${((20 * 100) / 85).toFixed(2)} %`,
    total: 20,
  },
  {
    id: 3,
    language: 'Spanish',
    percent: `${((20 * 100) / 85).toFixed(2)} %`,
    total: 20,
  },
]

export default function LocationLanguageDetail(
  props: LocationLanguageDetailProps
) {
  return (
    <Box>
      {LanguagesDetailWithThai.map((x) => (
        <Typography variant='h6'> {x.language}</Typography>
      ))}
      {LanguagesDetailWithThai.map((x) => (
        <Typography variant='h6'> {x.percent}</Typography>
      ))}
      {LanguagesDetailWithThai.map((x) => (
        <Typography variant='h6'> {x.total}</Typography>
      ))}
    </Box>
  )
}
