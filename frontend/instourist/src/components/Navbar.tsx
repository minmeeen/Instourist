import { Box, Button } from '@mui/material'
import React, { useContext } from 'react'
import { DarkModeContext } from '../App'
import logoLg from '../img/logo-lg.svg'
import logoLgDark from '../img/logo-lg-dark.svg'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const darkMode = useContext(DarkModeContext)
  const isDark = darkMode.darkMode
  const navigate = useNavigate()
  return (
    <Box
      display={'flex'}
      width={'100vw'}
      padding={'8px 40px'}
      borderBottom={'1px solid rgba(0,0,0,0.12)'}
    >
      <Button sx={{ padding: 0 }} onClick={() => navigate('/')}>
        <img src={logoLg} style={{ height: '40px', width: '140px' }} />
      </Button>
    </Box>
  )
}
