import { createContext, useRef, useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { Box } from '@mui/material'
import LocationSideBar from '../components/LocationSideBar'
import { findLocationID } from '../functions/findLocationID'
import MapBoxStore from '../components/MapBoxStore'
import MapBox from '../components/MapBox'
import ExploreOtherLocation from '../components/ExploreOtherLocation'

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

  const [fullSize, setFullSize] = useState<boolean>(false)

  return (
    <>
      <Navbar variant='other' />

      <Box display={'flex'}>
        <Box
          padding={'12px 24px'}
          borderRight={'1px solid rgba(0,0,0,0.12)'}
          bgcolor={'background.default'}
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

        <MapBox locationID={findLocationID(locationID!)} />
      </Box>
    </>
  )
}
