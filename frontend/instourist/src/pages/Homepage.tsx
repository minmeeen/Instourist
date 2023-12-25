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
        fontSize: "50px",
        backgroundSize: "cover",
      }}
      >
        <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'flex-end'}>
            <Button variant='contained' onClick={() => setDarkMode(!darkmode)}>
          { darkmode? 'light mode':'dark mode'}
        </Button>
        </Box>
        
        <Container>
        
        <Box display={'flex'} flexDirection={'column'} paddingTop={'120px'} justifyContent={'center'} alignItems={'center'}>
        <img src={darkmode? logoLgDark : logoLg} style={{height: '80px', width: '433px'}}/>
        <Typography variant='h4' color={darkmode? common.white: 'primary'}>
        Analyze languages used by visitors at tourist destinations. 
        </Typography>
        
        </Box>
        <Box height={'40px'}/>
        <SelectTouristAttraction darkMode={darkmode}/>
        </Container>
        
        
      </div>
    )
}
