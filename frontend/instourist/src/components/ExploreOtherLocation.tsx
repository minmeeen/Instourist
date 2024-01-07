import { Box, Button, Icon, Typography } from '@mui/material'
import React, { useState } from 'react'
import CustomButton from './CustomButton'
import { touristDestinationType } from '../type/touristDestinationType'
import {
  Art_CultureLocation,
  HistoricLocation,
  InstouristLocation,
  ModernLocation,
  NatureLocation,
  locationENUM,
} from '../constant/locations'
import LocationCard from './LocationCard'
import { useNavigate } from 'react-router-dom'
import nature from '../img/nature.svg'

export default function ExploreOtherLocation() {
  const [selectDestination, setSelectDestination] =
    useState<touristDestinationType>()
  const [showLocation, setShowLocation] = useState<InstouristLocation[]>([])

  const navigate = useNavigate()
  function checkSelectedDestination(type: touristDestinationType) {
    return type === selectDestination
  }

  const handleClickSelect = (destination: touristDestinationType) => {
    setSelectDestination(destination)
    if (destination === locationENUM.nature) setShowLocation(NatureLocation)
    else if (destination === locationENUM.art)
      setShowLocation(Art_CultureLocation)
    else if (destination === locationENUM.historic)
      setShowLocation(HistoricLocation)
    else setShowLocation(ModernLocation)
  }

  const natureIcon = (
    <Icon>
      <img alt='edit' src={nature} style={{ width: '20px', height: '20px' }} />
    </Icon>
  )
  return (
    <Box>
      <Typography color={'text.primary'}>Explore other locations</Typography>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        gap={'16px'}
      >
        <CustomButton
          startIcon={natureIcon}
          onClick={() => handleClickSelect(locationENUM.nature)}
          isClicked={checkSelectedDestination(locationENUM.nature)}
          text={locationENUM.nature}
        />
        <CustomButton
          startIcon={natureIcon}
          onClick={() => handleClickSelect(locationENUM.art)}
          isClicked={checkSelectedDestination(locationENUM.art)}
          text={locationENUM.artModified}
        />
        <CustomButton
          startIcon={natureIcon}
          onClick={() => handleClickSelect(locationENUM.historic)}
          isClicked={checkSelectedDestination(locationENUM.historic)}
          text={locationENUM.historic}
        />
        <CustomButton
          startIcon={natureIcon}
          onClick={() => handleClickSelect(locationENUM.modern)}
          isClicked={checkSelectedDestination(locationENUM.modern)}
          text={locationENUM.modern}
        />
      </Box>
      <Box
        display={'flex'}
        flexDirection={'column'}
        alignItems={'flex-start'}
        gap={'24px'}
        alignSelf={'stretch'}
        paddingTop={'12px'}
      >
        {showLocation.map((location) => (
          <LocationCard
            location={location}
            onClickSeeDetail={() =>
              navigate(`/location/${location.locationID}`)
            }
          />
        ))}
      </Box>
    </Box>
  )
}
