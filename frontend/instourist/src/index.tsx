import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ROUTE } from './constant/ROUTE';
import Homepage from './pages/Homepage';
import Homepage2 from './pages/Homepage2';
import { ThemeProvider } from '@mui/material';
import { theme } from './constant/theme';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: ROUTE.HOMEPAGE_1,
    element: <Homepage/>
  },
  {
    path: ROUTE.HOMEPAGE_2,
    element: <Homepage2/>
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
  <ThemeProvider theme={theme}>
    
      
        <RouterProvider router={router} />
     
   
  </ThemeProvider>
</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
