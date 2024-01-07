import { Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import CustomButton from './CustomButton'
import { touristDestinationType } from '../type/touristDestinationType'
import {
  Art_CultureLocation,
  HistoricLocation,
  InstouristLocation,
  ModernLocation,
  NatureLocation,
} from '../constant/locations'

export default function ExploreOtherLocation() {
  const [selectDestination, setSelectDestination] =
    useState<touristDestinationType>()
  const [showLocation, setShowLocation] = useState<InstouristLocation[]>([])

  function checkSelectedDestination(type: touristDestinationType) {
    return type === selectDestination
  }

  const handleClickSelect = (destination: touristDestinationType) => {
    setSelectDestination(destination)
    if (destination === 'NATURE') setShowLocation(NatureLocation)
    else if (destination === 'ART_CULTURE') setShowLocation(Art_CultureLocation)
    else if (destination === 'HISTORIC') setShowLocation(HistoricLocation)
    else setShowLocation(ModernLocation)
  }
  return (
    <Box>
      <Typography>Explore other locations</Typography>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        gap={'16px'}
      >
        <Button variant='outlined'>Nature</Button>
        <Button variant='outlined'>Art & Culture</Button>
        <Button variant='outlined'>Historic</Button>
        <Button variant='outlined'>Modern</Button>
      </Box>
    </Box>
  )
}
