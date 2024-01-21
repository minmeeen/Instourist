import { createContext, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { Box } from '@mui/material'
import LocationSideBar from '../components/LocationSideBar'
import { findLocationID } from '../functions/findLocationID'
import MapBoxStore from '../components/MapBoxStore'
import MapBox from '../components/MapBox'

export const ExploreOtherLocationContext = createContext({
  toggleExploreMode: () => {},
})

let initial = {
  latitude: 99,
  longitude: 18.78,
  zoom: 9,
  pitch: 0,
  antialias: true,
}

export default function LocationDetail() {
  const params = useParams()
  const locationID = params.locationID
  const mapRef = useRef()
  const [viewport, setViewport] = useState(initial)

  return (
    <>
      <Navbar variant='other' />

      <Box display={'flex'}>
        <LocationSideBar location={findLocationID(locationID!)} />
        <MapBox locationID={findLocationID(locationID!)} />
        {/* <Box width={'100%'} height={'100%'}>
          <MapBoxStore
            mapRef={mapRef}
            viewport={viewport}
            setViewport={setViewport}
          />
        </Box> */}
      </Box>
    </>
  )
}
