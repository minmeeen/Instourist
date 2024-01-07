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
  Typography,
  useTheme,
} from '@mui/material'
import NATURE from '../img/nature.svg'
import NATURE_WHITE from '../img/nature-white.svg'
import ART_CULTURE from '../img/art.svg'
import MODERN from '../img/modern.svg'
import HISTORIC from '../img/historic.svg'
import ExploreOtherLocation from './ExploreOtherLocation'
import { ColorModeContext } from '../App'

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
        height={'100vh'}
        padding={'24px'}
        flexDirection={'column'}
        alignItems={'flex-start'}
        gap={'16px'}
        flexShrink={0}
        borderRight={'1px solid rgba(0,0,0,0.12)'}
        bgcolor={'background.default'}
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
            <img
              src={theme.palette.mode === 'dark' ? NATURE_WHITE : NATURE}
              width={'14px'}
              height={'14px'}
            ></img>
            <Typography color={'text.primary'}>
              {location.locationType}
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
        <ExploreOtherLocation />
      </Box>
    )
  } else {
    return <div>'No location'</div>
  }
}
