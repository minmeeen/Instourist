import React from 'react'
import { InstouristLocation } from '../constant/locations'
import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'
import NATURE from '../img/nature.svg'
import ART_CULTURE from '../img/art.svg'
import MODERN from '../img/modern.svg'
import HISTORIC from '../img/historic.svg'
import ExploreOtherLocation from './ExploreOtherLocation'

interface LocationSideBarProps {
  location: InstouristLocation | ''
}

export default function LocationSideBar(props: LocationSideBarProps) {
  const { location } = props
  const [timeline, setTimeline] = React.useState('')
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
            <img src={NATURE} width={'14px'} height={'14px'}></img>
            <Typography>{location.locationType}</Typography>
          </Box>
          <Box
            id='location-name'
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'flex-end'}
            alignItems={'flex-start'}
          >
            <Typography variant='h1'>{location.locationEN}</Typography>
            <Typography variant='h4'>{location.locationTH}</Typography>
          </Box>
          <Box width={'100%'}>
            <Divider variant='fullWidth' orientation='horizontal' />
          </Box>
          <Box
            display={'flex'}
            flexDirection={'column'}
            width={'100%'}
            alignItems={'center'}
          >
            <Typography>Language used by tourists in the place</Typography>
            <Box
              display={'flex'}
              flexDirection={'row'}
              width={'100%'}
              gap={'16px'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <Typography>in the past</Typography>
              <FormControl sx={{ width: '200px' }} size='small'>
                <InputLabel id='demo-simple-select-label'>Timeline</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={timeline}
                  label='Timeline'
                  onChange={() => {}}
                >
                  <MenuItem value={1}>24 Hours</MenuItem>
                  <MenuItem value={2}>48 Hours</MenuItem>
                  <MenuItem value={3}>7 Days</MenuItem>
                  <MenuItem value={4}>14 Days</MenuItem>
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
