import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import background from '../img/background.png'
import background_dark from '../img/background_dark.png'
import logoLg from '../img/logo-lg.svg'
import logoLgDark from '../img/logo-lg-dark.svg'
import SelectTouristAttraction from '../components/SelectTouristAttraction'
import Navbar from '../components/Navbar'
import { webSiteLabel } from '../constant/websiteLabel'

export default function Homepage() {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'
  const matches = useMediaQuery('(min-width:670px)')

  return (
    <div
      style={{
        backgroundImage: `url(${isDark ? background_dark : background})`,
        WebkitBackgroundSize: 'cover',
        minWidth: '100vw',
        minHeight: '100vh',
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
          textAlign={'center'}
        >
          <img
            src={isDark ? logoLgDark : logoLg}
            style={{ height: matches ? '80px' : '50px', width: '433px' }}
            alt='logo'
          />
          <Typography variant='h4' color={'text.primary'}>
            {webSiteLabel.webDespEN}
          </Typography>
        </Box>
        <Box height={'40px'} />
        <SelectTouristAttraction />
      </Container>
    </div>
  )
}
