import { useTheme } from '@mui/material'
import Chart from 'react-google-charts'

interface CustomPieChartProps {
  selectedThai: boolean
  googlepieChartData: [string, number][] | [string, string][]
  googlepieChartDataNoThai: [string, number][] | [string, string][]
  pieChartWidth: number | string
}

export default function CustomPieChart(props: CustomPieChartProps) {
  const theme = useTheme()

  const {
    selectedThai,
    googlepieChartData,
    googlepieChartDataNoThai,
    pieChartWidth,
  } = props

  const options = {
    title: '',
    pieHole: 0.4,
    is3D: false,
    legend: 'none',
    pieSliceText: 'label',
    pieSliceTextStyle: {
      color:
        selectedThai && googlepieChartData.length === 2
          ? 'black'
          : !selectedThai && googlepieChartDataNoThai.length === 2
            ? 'black'
            : 'white',
    },
    backgroundColor: theme.palette.mode === 'dark' ? '#2C2C2C' : '#f5f5f5',
  }

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
