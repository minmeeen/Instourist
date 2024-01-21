import { Box, Button, Divider, Icon, Typography } from '@mui/material'
import React, { SetStateAction, useContext, useState } from 'react'
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
import { theme } from '../constant/theme'
import BACK_LIGHT from '../img/customback-light.svg'
import BACK_DARK from '../img/customback-dark.svg'

interface ExploreOtherLocationProps {
  fullSize: boolean
  setFullSize?: React.Dispatch<SetStateAction<boolean>>
  location?: InstouristLocation | ''
}

export default function ExploreOtherLocation(props: ExploreOtherLocationProps) {
  const { fullSize, setFullSize, location } = props
  const [selectDestination, setSelectDestination] =
    useState<touristDestinationType>()
  const [showLocation, setShowLocation] = useState<InstouristLocation[]>([])

  const navigate = useNavigate()
  function checkSelectedDestination(type: touristDestinationType) {
    return type === selectDestination
  }

  const handleClickSelect = (destination: touristDestinationType) => {
    if (setFullSize) {
      setFullSize(true)
    }
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
      {fullSize && (
        <Box paddingBottom={'24px'}>
          <Box
            display={'flex'}
            width={'100%'}
            justifyContent={'flex-end'}
            alignItems={'center'}
          >
            <Typography color={'text.primary'}>
              Back to {location ? location.locationEN : ''}
            </Typography>
            <Button onClick={() => setFullSize && setFullSize(false)}>
              <img
                src={theme.palette.mode === 'dark' ? BACK_DARK : BACK_LIGHT}
                width={'20px'}
                height={'20px'}
              ></img>
            </Button>
          </Box>

          <Box width={'100%'}>
            <Divider variant='fullWidth' orientation='horizontal' />
          </Box>
        </Box>
      )}
      <Typography color={'text.primary'} variant='h4'>
        Explore other locations
      </Typography>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        gap={'16px'}
        paddingTop={'16px'}
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
      {fullSize && (
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
      )}
    </Box>
  )
}
