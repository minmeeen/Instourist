import { Box, Button, Container, Typography } from '@mui/material'
import background from '../img/background.png'
import background_dark from '../img/background_dark.png'
import logoLg from '../img/logo-lg.svg'
import logoLgDark from '../img/logo-lg-dark.svg'
import React, { useState } from 'react'
import { common } from '@mui/material/colors'
import { useNavigate } from 'react-router-dom'
import { ROUTE } from '../constant/ROUTE'
import SelectTouristAttraction from '../components/SelectTouristAttraction'

export default function Homepage() {
  const [darkmode, setDarkMode] = useState<boolean>(false)
  const navigate = useNavigate()
  return (
    <div style={{ backgroundImage: `url(${darkmode? background_dark: background})` ,
      height: "100vh",
      // marginTop: "-70px",
      fontSize: "50px",
      backgroundSize: "cover",
      // backgroundRepeat: "no-repeat",
    }}
    >
      

      <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
      <div style={{padding: '16px'}}>
        <img src={darkmode? logoLgDark : logoLg} style={{height: '34px', width: '148px'}}/>
      </div>
      <Box>
      <Button variant='contained' onClick={() => setDarkMode(!darkmode)}>
          { darkmode? 'light mode':'dark mode'}
        </Button>
        <Button variant='contained' onClick={() => navigate(ROUTE.HOMEPAGE_2)}>
          Switch version
        </Button>
      </Box>
        
      </Box>
      <Container>
      
      <Box textAlign={'left'} paddingTop={'120px'}>
        <Typography variant='h2' style={{fontFamily: 'Nunito',fontWeight: 800,fontSize: '54px',lineHeight: '120%',}} color={darkmode? common.white : '#38405F'}>
      Discover languages used by    
      </Typography>
      <Typography variant='h2' style={{fontFamily: 'Nunito',fontWeight: 800,fontSize: '54px',lineHeight: '120%',}} color={darkmode? common.white : '#38405F'}>
      tourist in tourist attractions. 
      </Typography>
      
      </Box>
      <Box height={'40px'}/>
      <SelectTouristAttraction darkMode={darkmode}/>
      </Container>
      
      
    </div>
    // <Container/>
  )
}
