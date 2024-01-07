import { Box, Button, Icon, Typography, useTheme } from '@mui/material'
import { common } from '@mui/material/colors'
import nature from '../img/nature.svg'
import React, { useContext, useState } from 'react'
import CustomButton from './CustomButton'
import { touristDestinationType } from '../type/touristDestinationType'
import LocationCard from './LocationCard'
import {
  Art_CultureLocation,
  HistoricLocation,
  InstouristLocation,
  ModernLocation,
  NatureLocation,
} from '../constant/locations'
import { useNavigate } from 'react-router-dom'

export default function SelectTouristAttraction() {
  //   const { darkMode } = props

  const natureIcon = (
    <Icon>
      <img alt='edit' src={nature} style={{ width: '20px', height: '20px' }} />
    </Icon>
  )

  const navigate = useNavigate()

  const theme = useTheme()

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
    // <Box textAlign={'center'}>

    <Box
      sx={{
        borderRadius: '8px',
        bgcolor: `${
          theme.palette.mode
            ? 'rgba(0, 0, 0, 0.65)'
            : 'rgba(255, 255, 255, 0.65)'
        } `,
        boxShadow: '0px 4px 4px 0px rgba(56, 64, 95, 0.25)',
      }}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'space-between'}
      alignItems={'center'}
      padding={'14px 40px'}
      gap={'8px'}
    >
      <Typography color={'text.primary'} variant='h4'>
        Select a tourist destination
      </Typography>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        gap={'16px'}
      >
        <CustomButton
          startIcon={natureIcon}
          onClick={() => handleClickSelect('NATURE')}
          isClicked={checkSelectedDestination('NATURE')}
          text='Nature'
        />
        <CustomButton
          startIcon={natureIcon}
          onClick={() => handleClickSelect('ART_CULTURE')}
          isClicked={checkSelectedDestination('ART_CULTURE')}
          text='Art & Culture'
        />
        <CustomButton
          startIcon={natureIcon}
          onClick={() => handleClickSelect('HISTORIC')}
          isClicked={checkSelectedDestination('HISTORIC')}
          text='Historic'
        />
        <CustomButton
          startIcon={natureIcon}
          onClick={() => handleClickSelect('MODERN')}
          isClicked={checkSelectedDestination('MODERN')}
          text='Modern'
        />
      </Box>
      <Box
        display={'flex'}
        alignItems={'flex-end'}
        gap={'24px'}
        alignSelf={'stretch'}
        paddingTop={'12px'}
      >
        {showLocation.map((location) => (
          <LocationCard
            location={location}
            onClickSeeDetail={() => navigate(`location/${location.locationID}`)}
          />
        ))}
      </Box>
    </Box>
  )
}
