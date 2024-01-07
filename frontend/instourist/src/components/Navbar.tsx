import { Box, Button, useTheme } from '@mui/material'
import React, { useContext } from 'react'
import logoLg from '../img/logo-lg.svg'
import logoLgDark from '../img/logo-lg-dark.svg'
import { useNavigate } from 'react-router-dom'
import { ColorModeContext, ToggleModeComponent } from '../App'

interface NavbarProps {
  variant: 'homepage' | 'other'
}

export default function Navbar(props: NavbarProps) {
  const { variant } = props
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)
  const navigate = useNavigate()
  return (
    <>
      {variant === 'other' ? (
        <Box
          display={'flex'}
          padding={'10px 40px'}
          borderBottom={'1px solid rgba(0,0,0,0.12)'}
          bgcolor={'background.default'}
          justifyContent={'space-between'}
        >
          <Button sx={{ padding: 0 }} onClick={() => navigate('/')}>
            <img
              src={theme.palette.mode === 'dark' ? logoLgDark : logoLg}
              style={{ height: '40px', width: '140px' }}
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
