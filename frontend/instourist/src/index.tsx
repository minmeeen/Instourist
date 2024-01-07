import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App, { ColorModeContext } from './App'
import reportWebVitals from './reportWebVitals'
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from 'react-router-dom'
import { ROUTE } from './constant/ROUTE'
import Homepage from './pages/Homepage'
import Homepage2 from './pages/Homepage'
import { ThemeProvider, useTheme } from '@mui/material'
import LocationDetail from './pages/LocationDetail'

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//   },
//   {
//     path: '/location/:locationID',
//     element: <LocationDetail />,
//   },
// ])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
