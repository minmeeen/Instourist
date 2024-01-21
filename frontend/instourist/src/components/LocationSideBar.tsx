import React, { useContext } from 'react'
import { InstouristLocation } from '../constant/locations'
import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import ExploreOtherLocation from './ExploreOtherLocation'
import { ColorModeContext } from '../App'
import findLocationTypeIcon from '../functions/findLocationTypeIcon'
import { Error } from '@mui/icons-material'
import LocationNotFound from './LocationNotFound'

interface LocationSideBarProps {
  location: InstouristLocation | ''
}

export default function LocationSideBar(props: LocationSideBarProps) {
  const { location } = props
  const [timeline, setTimeline] = React.useState('')
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)
  const hanldeClickSelectTimeline = (event: SelectChangeEvent) => {
    setTimeline(event.target.value as string)
  }
  if (location) {
    return (
      <Box
        display={'flex'}
        width={'490px'}
        // height={'100vh'}

        flexDirection={'column'}
        alignItems={'flex-start'}
        gap={'16px'}
        flexShrink={0}
      >
        <Box
          id='location-headline'
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'flex-end'}
          alignItems={'flex-start'}
          gap={'10px'}
          alignSelf={'stretch'}
        >
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
              variant='h1'
              sx={{ lineHeight: '110%' }}
              color={'text.primary'}
            >
              {location.locationEN}
            </Typography>
            <Typography
              color={'text.primary'}
              variant='h4'
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
            gap={'8px'}
          >
            <Typography color={'text.primary'}>
              Languages used by tourists at this place
            </Typography>
            <Box
              display={'flex'}
              flexDirection={'row'}
              width={'100%'}
              gap={'16px'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <Typography color={'text.primary'}>in the past</Typography>
              <FormControl sx={{ width: '200px' }} size='small'>
                <InputLabel id='demo-simple-select-label'>Timeline</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={timeline}
                  label='Timeline'
                  onChange={hanldeClickSelectTimeline}
                >
                  <MenuItem value={24}>24 Hours</MenuItem>
                  <MenuItem value={48}>48 Hours</MenuItem>
                  <MenuItem value={7}>7 Days</MenuItem>
                  <MenuItem value={14}>14 Days</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>
      </Box>
    )
  } else {
    return <LocationNotFound />
  }
}
