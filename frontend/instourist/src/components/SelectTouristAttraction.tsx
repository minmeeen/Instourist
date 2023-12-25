import { Box, Button, Icon, Typography } from '@mui/material'
import { common } from '@mui/material/colors'
import nature from '../img/nature.svg'
import React, { useContext, useState } from 'react'
import { DarkModeContext } from '../App'
import CustomButton from './CustomButton'
import { touristDestinationType } from '../type/touristDestinationType'

interface SelectTouristAttractionProps {
  darkMode?: boolean
}

export default function SelectTouristAttraction(
  props: SelectTouristAttractionProps
) {
  //   const { darkMode } = props

  const natureIcon = (
    <Icon>
      <img alt='edit' src={nature} style={{ width: '20px', height: '20px' }} />
    </Icon>
  )

  const darkMode = useContext(DarkModeContext)
  const isDark = darkMode.darkMode

  const [selectDestination, setSelectDestination] =
    useState<touristDestinationType>()

  function checkSelectedDestination(type: touristDestinationType) {
    return type === selectDestination
  }
  return (
    // <Box textAlign={'center'}>

    <Box
      sx={{
        borderRadius: '8px',
        bgcolor: `${
          isDark ? 'rgba(0, 0, 0, 0.65)' : 'rgba(255, 255, 255, 0.65)'
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
      <Typography variant='h4' color={isDark ? common.white : '#38405F'}>
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
          onClick={() => setSelectDestination('NATURE')}
          isClicked={checkSelectedDestination('NATURE')}
          text='Nature'
        />
        <CustomButton
          startIcon={natureIcon}
          onClick={() => setSelectDestination('ART&CULTURE')}
          isClicked={checkSelectedDestination('ART&CULTURE')}
          text='Art & Culture'
        />
        <CustomButton
          startIcon={natureIcon}
          onClick={() => setSelectDestination('HISTORIC')}
          isClicked={checkSelectedDestination('HISTORIC')}
          text='Historic'
        />
        <CustomButton
          startIcon={natureIcon}
          onClick={() => setSelectDestination('MODERN')}
          isClicked={checkSelectedDestination('MODERN')}
          text='Modern'
        />
      </Box>
    </Box>
  )
}
