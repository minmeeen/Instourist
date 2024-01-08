import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { Box, createTheme, useTheme } from '@mui/material'
import {
  Art_CultureLocation,
  HistoricLocation,
  ModernLocation,
  NatureLocation,
} from '../constant/locations'
import LocationSideBar from '../components/LocationSideBar'
import ExploreOtherLocation from '../components/ExploreOtherLocation'
import { ColorModeContext, ToggleModeComponent } from '../App'
import mapboxgl from 'mapbox-gl' // or "const mapboxgl = require('mapbox-gl');"
import MapBox from '../components/MapBox'
import { findLocationID } from '../functions/findLocationID'

export const ExploreOtherLocationContext = createContext({
  toggleExploreMode: () => {},
})

export default function LocationDetail() {
  const params = useParams()
  const locationID = params.locationID

  return (
    <>
      <Navbar variant='other' />

      <Box display={'flex'}>
        <LocationSideBar location={findLocationID(locationID!)} />
        <MapBox locationID={findLocationID(locationID!)} />
      </Box>
    </>
  )
}
