import { Box, Button, Container, Typography, useTheme } from '@mui/material'
import background from '../img/background.png'
import background_dark from '../img/background_dark.png'
import logoLg from '../img/logo-lg.svg'
import logoLgDark from '../img/logo-lg-dark.svg'
import { useContext, useState } from 'react'
import { common } from '@mui/material/colors'
import { useNavigate } from 'react-router-dom'
import SelectTouristAttraction from '../components/SelectTouristAttraction'
import { ToggleModeComponent } from '../App'
import Navbar from '../components/Navbar'

export default function Homepage() {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'
  const navigate = useNavigate()
  return (
    <div
      style={{
        backgroundImage: `url(${isDark ? background_dark : background})`,
        height: '100vh',
        fontSize: '50px',
        backgroundSize: 'cover',
      }}
    >
      <Navbar variant='homepage' />
      <Container>
        <Box
          display={'flex'}
          flexDirection={'column'}
          paddingTop={'60px'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <img
            src={isDark ? logoLgDark : logoLg}
            style={{ height: '80px', width: '433px' }}
          />
          <Typography variant='h4' color={'text.primary'}>
            Analyze languages used by visitors at tourist destinations.
          </Typography>
        </Box>
        <Box height={'40px'} />
        <SelectTouristAttraction />
      </Container>
    </div>
  )
}
