import { Box, useTheme } from '@mui/material'
import mapboxgl, { LngLatLike } from 'mapbox-gl'
import React, { useRef, useEffect, useState } from 'react' // eslint-disable-line import/no-webpack-loader-syntax
import touristLocation from '../constant/locations.json'
import { createRoot } from 'react-dom/client'
import { InstouristLocation } from '../constant/locations'
import { useParams } from 'react-router-dom'

mapboxgl.accessToken = process.env.MAPBOX_API_KEY ?? ''

interface MapBoxProps {
  locationID: InstouristLocation | ''
}
export default function MapBox(props: MapBoxProps) {
  //   const mapContainer = useRef(null)
  //   const map = useRef(null)

  const params = useParams()
  let locationID = params.locationID

  let defaultlng = touristLocation.features
    .find((x) => x.properties.id === locationID)
    ?.geometry.coordinates.at(0)

  let defaultlat = touristLocation.features
    .find((x) => x.properties.id === locationID)
    ?.geometry.coordinates.at(1)

  const [lng, setLng] = useState<number>(defaultlng ?? 99)
  const [lat, setLat] = useState<number>(defaultlat ?? 18.78)
  const [zoom, setZoom] = useState<number>(16)
  const mapContainerRef = useRef(null)
  const theme = useTheme()

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style:
        theme.palette.mode === 'dark'
          ? 'mapbox://styles/mapbox/navigation-night-v1'
          : 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    })

    touristLocation.features.map((feature) =>
      new mapboxgl.Marker()
        .setLngLat(feature.geometry.coordinates as LngLatLike)
        .addTo(map)
    )

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right')

    map.on('move', () => {
      setLng(+map.getCenter().lng.toFixed(4))
      setLat(+map.getCenter().lat.toFixed(4))
      setZoom(+map.getZoom().toFixed(2))
    })

    // Clean up on unmount
    return () => map.remove()
  }, [theme.palette.mode]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box width={'100%'}>
      <div className='sidebarStyle'></div>
      <div className='map-container' ref={mapContainerRef} />
    </Box>
  )
}