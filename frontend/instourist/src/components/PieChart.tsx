import { useTheme } from '@mui/material'
import React from 'react'
import Chart from 'react-google-charts'
import { webSiteLabel } from '../constant/websiteLabel'

interface CustomPieChartProps {
  selectedThai: boolean
  googlepieChartData: any
  googlepieChartDataNoThai: any
  pieChartWidth: number | string
}

export default function CustomPieChart(props: CustomPieChartProps) {
  const theme = useTheme()

  const options = {
    title: '',
    pieHole: 0.4,
    is3D: false,
    legend: 'none',
    pieSliceText: 'label',
    backgroundColor: theme.palette.mode === 'dark' ? '#2C2C2C' : '#f5f5f5',
  }

  const {
    selectedThai,
    googlepieChartData,
    googlepieChartDataNoThai,
    pieChartWidth,
  } = props

  return (
    <>
      <Chart
        chartType='PieChart'
        width={pieChartWidth}
        height='400px'
        data={selectedThai ? googlepieChartData : googlepieChartDataNoThai}
        options={options}
      />
    </>
  )
}
