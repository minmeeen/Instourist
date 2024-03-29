import { Box, Button, useTheme } from '@mui/material'
import logoLg from '../img/logo-lg.svg'
import logoLgDark from '../img/logo-lg-dark.svg'
import { useNavigate } from 'react-router-dom'
import { ToggleModeComponent } from '../App'

interface NavbarProps {
  variant: 'homepage' | 'other'
}

export default function Navbar(props: NavbarProps) {
  const { variant } = props
  const theme = useTheme()
  const navigate = useNavigate()
  return (
    <>
      {variant === 'other' ? (
        <Box
          display={'flex'}
          padding={'4px 24px'}
          borderBottom={'1px solid rgba(0,0,0,0.12)'}
          bgcolor={'background.default'}
          justifyContent={'space-between'}
        >
          <Button sx={{ padding: 0 }} onClick={() => navigate('/')}>
            <img
              src={theme.palette.mode === 'dark' ? logoLgDark : logoLg}
              style={{ height: '30px', width: '140px' }}
              alt='logo'
            />
          </Button>
          <ToggleModeComponent />
        </Box>
      ) : (
        <Box display={'flex'} padding={'10px 40px'} justifyContent={'flex-end'}>
          <ToggleModeComponent />
        </Box>
      )}
    </>
  )
}
