import React, { useState } from 'react'
import { InstouristLocation } from '../constant/locations'
import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  useTheme,
} from '@mui/material'
import findLocationTypeIcon from '../functions/findLocationTypeIcon'
import LocationNotFound from './LocationNotFound'
import dayjs, { Dayjs } from 'dayjs'
// import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers-pro'
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs'
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker'
import { DateRange } from '@mui/x-date-pickers-pro'

interface LocationSideBarProps {
  location: InstouristLocation | null
  timeline: string
  setTimeline: React.Dispatch<React.SetStateAction<string>>
}

export default function LocationSideBar(props: LocationSideBarProps) {
  const { location, timeline, setTimeline } = props
  const theme = useTheme()
  const hanldeClickSelectTimeline = (event: SelectChangeEvent) => {
    setTimeline(event.target.value as string)
  }

  const [state, setState] = useState<any>([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
    },
  ])

  const [value, setValue] = React.useState<DateRange<Dayjs>>([
    dayjs('2024-03-05'),
    dayjs('2024-01-30'),
  ])

  if (location) {
    return (
      <Box display={'flex'} width={'100%'} flexDirection={'column'} gap={'4px'}>
        <Box
          id='location-type'
          display={'flex'}
          padding={'4px 8px'}
          alignItems={'center'}
          gap={'8px'}
        >
          {findLocationTypeIcon(location.locationType, theme.palette.mode)}
          <Typography color={'text.primary'}>
            {location.locationType === 'ART_CULTURE'
              ? 'ART & CULTURE'
              : location.locationType}
          </Typography>
        </Box>
        <Box
          id='location-name'
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'flex-end'}
          alignItems={'flex-start'}
        >
          <Typography
            variant='h3'
            sx={{ lineHeight: '110%' }}
            color={'text.primary'}
          >
            {location.locationEN}
          </Typography>
          <Typography
            color={'text.primary'}
            variant='h6'
            sx={{ lineHeight: '120%' }}
          >
            {location.locationTH}
          </Typography>
        </Box>
        <Box width={'100%'}>
          <Divider variant='fullWidth' orientation='horizontal' />
        </Box>
        <Box
          display={'flex'}
          flexDirection={'column'}
          width={'100%'}
          alignItems={'center'}
          gap={'4px'}
        >
          <Typography color={'text.primary'} variant='h5'>
            Languages used by tourists at this place between
          </Typography>
          <Box
            display={'flex'}
            flexDirection={'row'}
            width={'100%'}
            gap={'16px'}
            alignItems={'flex-start'}
            justifyContent={'center'}
          >
            {/* <div>
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setState([item.selection])}
                moveRangeOnFirstSelection={true}
                ranges={state}
                retainEndDateOnFirstSelection={true}
                displayMode='dateRange'
              />
            </div> */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DateRangePicker']}>
                <DateRangePicker
                  localeText={{ start: 'Start date', end: 'End date' }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
        </Box>
      </Box>
    )
  } else {
    return <LocationNotFound />
  }
}
