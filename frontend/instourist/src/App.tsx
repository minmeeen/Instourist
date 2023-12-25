import { Box, Container, IconButton, Link, Typography } from '@mui/material'
import './App.css'
import background from './img/background.png'
import logoLg from './img/logo-lg.svg'
import Homepage from './pages/Homepage'
import { createContext, useState } from 'react'
import { DarkMode, LightMode } from '@mui/icons-material'

export const DarkModeContext = createContext({ darkMode: true })

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(true)
  return (
    <>
      <DarkModeContext.Provider value={{ darkMode: darkMode }}>
        <Box
          sx={{
            position: 'absolute',
            display: 'flex',
            width: '100%',
            justifyContent: 'flex-end',

            color: 'text.primary',
            borderRadius: 1,
          }}
        >
          <IconButton
            sx={{ ml: 1 }}
            onClick={() => setDarkMode(!darkMode)}
            color='inherit'
          >
            {darkMode ? <LightMode color='info' /> : <DarkMode />}
          </IconButton>
        </Box>
        <Homepage />
      </DarkModeContext.Provider>
    </>
  )
}

export default App
