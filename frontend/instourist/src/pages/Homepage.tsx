import { Box, Button, Container, Typography } from '@mui/material'
import background from '../img/background.png'
import background_dark from '../img/background_dark.png'
import logoLg from '../img/logo-lg.svg'
import logoLgDark from '../img/logo-lg-dark.svg'
import { useContext, useState } from 'react'
import { common } from '@mui/material/colors'
import { useNavigate } from 'react-router-dom'
import SelectTouristAttraction from '../components/SelectTouristAttraction'
import { DarkModeContext } from '../App'

export default function Homepage() {
  const darkMode = useContext(DarkModeContext)
  const isDark = darkMode.darkMode
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
      <Container>
        <Box
          display={'flex'}
          flexDirection={'column'}
          paddingTop={'120px'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <img
            src={isDark ? logoLgDark : logoLg}
            style={{ height: '80px', width: '433px' }}
          />
          <Typography variant='h4' color={isDark ? common.white : 'primary'}>
            Analyze languages used by visitors at tourist destinations.
          </Typography>
        </Box>
        <Box height={'40px'} />
        <SelectTouristAttraction />
      </Container>
    </div>
  )
}
