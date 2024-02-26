import { createTheme } from '@mui/material'
const { palette } = createTheme()

export const theme = createTheme({
  typography: {
    fontFamily: ['Nunito', 'sans-serif'].join(','),
    h1: {
      // DISPLAY LARGE
      fontFamily: 'Nunito',
      fontWeight: 400,
      fontSize: '36px',
      lineHeight: '64px',
      letterSpacing: '-0.25px',
    },
    h2: {
      // DISPLAY MEDIUM
      fontFamily: 'Nunito',
      fontWeight: 400,
      fontSize: '32px',
      lineHeight: '52px',
    },
    h3: {
      // DISPLAY SMALL
      fontFamily: 'Nunito',
      fontWeight: 400,
      fontSize: '28px',
      lineHeight: '44px',
    },
    h4: {
      // HEADLINE LARGE
      fontFamily: 'Nunito',
      fontWeight: 400,
      fontSize: '24px',
      lineHeight: '40px',
    },
    h5: {
      // HEADLINE SMALL
      fontFamily: 'Nunito',
      fontWeight: 400,
      fontSize: '20px',
      lineHeight: '36px',
    },
    h6: {
      // HEADLINE SMALL
      fontFamily: 'Nunito',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '32px',
    },
    subtitle1: {
      fontFamily: 'Nunito',
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '0.15px',
    },
    body1: {
      fontFamily: 'Nunito',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '0.5px',
    },
    body2: {
      fontFamily: 'Nunito',
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: '0.25px',
    },
  },
  palette: {
    primary: {
      main: '#38405F',
    },
    error: {
      main: '#FF0038',
    },
    secondary: {
      main: '#51A3A3',
    },
    grey: {
      200: '#C7C7C7',
      600: '#808080',
    },
    text: {
      primary: '#212121',
    },
  },
})
