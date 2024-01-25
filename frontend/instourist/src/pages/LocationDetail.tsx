import { createContext, useRef, useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { Box, Typography, useTheme } from '@mui/material'
import LocationSideBar from '../components/LocationSideBar'
import { findLocationID } from '../functions/findLocationID'
import ExploreOtherLocation from '../components/ExploreOtherLocation'
import MapGL, { Marker } from '@urbica/react-map-gl'
import { MAPBOX_ACCESS_TOKEN } from '../constant/accessToken'
import touristLocation from '../constant/locations.json'
import { LngLatLike } from 'mapbox-gl'
import { touristLocations } from '../constant/touristLocations'
import CustomMapGL from '../components/CustomMapGL'

export const ExploreOtherLocationContext = createContext({
  toggleExploreMode: () => {},
})

let initial = {
  latitude: 18.78,
  longitude: 99,
  zoom: 12,
  pitch: 0,
  antialias: true,
}

export default function LocationDetail() {
  const params = useParams()
  const locationID = params.locationID
  const theme = useTheme()
  const [fullSize, setFullSize] = useState<boolean>(false)

  const style = {
    padding: '10px',
    color: '#fff',
    cursor: 'pointer',
    background: '#1978c8',
    borderRadius: '6px',
  }

  return (
    <>
      <Navbar variant='other' />

      <Box display={'flex'}>
        <Box
          padding={'12px 24px'}
          borderRight={'1px solid rgba(0,0,0,0.12)'}
          bgcolor={theme.palette.mode === 'dark' ? '#2C2C2C' : '#f5f5f5'}
          justifyContent={'space-between'}
        >
          {!fullSize && (
            <LocationSideBar location={findLocationID(locationID!)} />
          )}

          <ExploreOtherLocation
            fullSize={fullSize}
            setFullSize={setFullSize}
            location={findLocationID(locationID!)}
          />
        </Box>

        {/* <MapBox locationID={findLocationID(locationID!)} />
        <AppMap mapRef={mapRef} viewport={viewport} setViewport={setViewport} /> */}

        <CustomMapGL locationID={locationID!} />
      </Box>
    </>
  )
}
