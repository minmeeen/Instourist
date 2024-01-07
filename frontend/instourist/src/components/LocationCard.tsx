import { Box, Button, Typography, useTheme } from '@mui/material'
import { common } from '@mui/material/colors'
import React, { useContext } from 'react'
import { InstouristLocation } from '../constant/locations'
import { theme } from '../constant/theme'

interface LocationCardProps {
  location: InstouristLocation
  onClickSeeDetail: () => void
}

export default function LocationCard(props: LocationCardProps) {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  const { location, onClickSeeDetail } = props
  return (
    <Box
      display={'flex'}
      width={'270px'}
      height={'160px'}
      padding={'10px 20px'}
      alignItems={'center'}
      gap={'10px'}
      flexShrink={0}
      sx={{
        borderRadius: '16px',
        boxShadow: isDark
          ? '0px 0px 6.3px 0px rgba(255, 255, 255, 0.25)'
          : '0px 0px 6.3px 0px rgba(0, 0, 0, 0.25)',
      }}
    >
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'space-between'}
        alignItems={'flex-start'}
        flex={'1 0 0'}
        alignSelf={'stretch'}
      >
        <Box
          display={'flex'}
          flexDirection={'column'}
          alignItems={'flex-start'}
          alignSelf={'stretch'}
        >
          <Typography variant='h3' color='text.primary'>
            {location.locationEN}
          </Typography>
          <Typography variant='body2' color='text.primary'>
            {location.locationTH}
          </Typography>
        </Box>
        <Button
          variant='outlined'
          sx={{
            textTransform: 'none',
            borderColor: 'text.primary',
          }}
          onClick={onClickSeeDetail}
        >
          <Typography color='text.primary'>See details</Typography>
        </Button>
      </Box>
    </Box>
  )
}
