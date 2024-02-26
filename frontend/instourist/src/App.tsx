import {
  Box,
  Container,
  IconButton,
  Link,
  PaletteMode,
  ThemeProvider,
  Typography,
  createTheme,
  useTheme,
} from '@mui/material'
import './App.css'
import background from './img/background.png'
import logoLg from './img/logo-lg.svg'
import Homepage from './pages/Homepage'
import { createContext, useContext, useMemo, useState } from 'react'
import { theme } from './constant/theme'
import { DarkMode, LightMode } from '@mui/icons-material'
import LocationDetail from './pages/LocationDetail'
import Navbar from './components/Navbar'
import {
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from 'react-router-dom'
import { ROUTE } from './constant/ROUTE'
import { grey } from '@mui/material/colors'

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
})

export function ToggleModeComponent() {
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)
  return (
    <Box
      sx={{
        display: 'flex',

        alignItems: 'center',
        justifyContent: 'center',
        color: 'text.primary',
        borderRadius: 1,
        p: 0,
      }}
    >
      <IconButton
        sx={{ ml: 1 }}
        onClick={colorMode.toggleColorMode}
        color='inherit'
      >
        {theme.palette.mode === 'dark' ? <LightMode /> : <DarkMode />}
      </IconButton>
    </Box>
  )
}

function App() {
  const [mode, setMode] = useState<PaletteMode>('light')
  const colorMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === 'light' ? 'dark' : 'light'
        )
      },
    }),
    []
  )

  const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // palette values for light mode
            primary: {
              main: '#38405F',
            },
            error: {
              main: '#FF0038',
            },
            secondary: {
              main: '#6A6E83',
            },
            text: {
              primary: '#38405F',
              secondary: grey[800],
            },
          }
        : {
            // palette values for dark mode
            primary: {
              main: '#38405F',
            },
            error: {
              main: '#FF0038',
            },
            secondary: {
              main: '#6A6E83',
            },
            text: {
              primary: '#fff',
              secondary: grey[500],
            },
            background: {
              default: '#121212',
            },
          }),
    },
    typography: {
      fontFamily: ['Kanit', 'sans-serif'].join(','),
      h1: {
        // DISPLAY LARGE
        fontFamily: 'Kanit',
        fontWeight: 400,
        fontSize: '36px',
        lineHeight: '64px',
        letterSpacing: '-0.25px',
      },
      h2: {
        // DISPLAY MEDIUM
        fontFamily: 'Kanit',
        fontWeight: 400,
        fontSize: '32px',
        lineHeight: '52px',
      },
      h3: {
        // DISPLAY SMALL
        fontFamily: 'Kanit',
        fontWeight: 400,
        fontSize: '28px',
        lineHeight: '44px',
      },
      h4: {
        // HEADLINE LARGE
        fontFamily: 'Kanit',
        fontWeight: 400,
        fontSize: '24px',
        lineHeight: '40px',
      },
      h5: {
        // HEADLINE SMALL
        fontFamily: 'Kanit',
        fontWeight: 400,
        fontSize: '20px',
        lineHeight: '36px',
      },
      h6: {
        // HEADLINE SMALL
        fontFamily: 'Kanit',
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '32px',
      },
      subtitle1: {
        fontFamily: 'Kanit',
        fontWeight: 500,
        fontSize: '16px',
        lineHeight: '24px',
        letterSpacing: '0.15px',
      },
      body1: {
        fontFamily: 'Kanit',
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '24px',
        letterSpacing: '0.5px',
      },
      body2: {
        fontFamily: 'Kanit',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '20px',
        letterSpacing: '0.25px',
      },
    },
  })
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode])
  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path={ROUTE.HOME} element={<Homepage />} />
            <Route path={ROUTE.LOCATION_DETAIL} element={<LocationDetail />} />
          </Routes>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  )
}

export default App
