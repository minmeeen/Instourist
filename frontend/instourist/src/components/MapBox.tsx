import { Box, useTheme } from '@mui/material'
import mapboxgl, { LngLatLike } from 'mapbox-gl'
import React, { useRef, useEffect, useState } from 'react' // eslint-disable-line import/no-webpack-loader-syntax
import touristLocation from '../constant/locations.json'
import { createRoot } from 'react-dom/client'
import { InstouristLocation } from '../constant/locations'
import { useParams } from 'react-router-dom'

// this is a general token for all mapbox user
mapboxgl.accessToken =
  'pk.eyJ1IjoicGFpbnQ1NDBtYXBib3giLCJhIjoiY2xyNGhqaGx4MW85YjJrcW13NHZoeHZ0ZyJ9.rj429V71oEAb1O1ZAQdk3Q'

interface MapBoxProps {
  locationID: InstouristLocation | ''
}
export default function MapBox(props: MapBoxProps) {
  // const mapContainer = useRef(null)
  // const map = useRef(null)

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

  let map: mapboxgl.Map

  useEffect(() => {
    map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style:
        theme.palette.mode === 'dark'
          ? 'mapbox://styles/mapbox/navigation-night-v1'
          : 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    })

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right')

    map.on('move', () => {
      setLng(+map.getCenter().lng.toFixed(4))
      setLat(+map.getCenter().lat.toFixed(4))
      setZoom(+map.getZoom().toFixed(2))
      touristLocation.features.map((feature) => {
        const el = document.createElement('div')
        el.id = `marker-${feature.properties.id}`
        /* Assign the `marker` class to each marker for styling. */
        el.className = 'marker'
        new mapboxgl.Marker()
          .setLngLat(feature.geometry.coordinates as LngLatLike)
          .addTo(map)

        el.addEventListener('drag', (e) => {
          /* Fly to the point */
          // map.flyTo({
          //   center: feature.geometry.coordinates as LngLatLike,
          //   zoom: zoom,
          // })
          // console.log('first', feature.geometry.coordinates as LngLatLike)
          console.log(e)
        })
      })
    })

    return () => map.remove()
  }, [theme.palette.mode]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box width={'100%'}>
      <div className='sidebarStyle'></div>
      <div className='map-container' ref={mapContainerRef} />
    </Box>
  )
}
