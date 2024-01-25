import { Box, Typography, useTheme } from '@mui/material'
import { MAPBOX_ACCESS_TOKEN } from '../constant/accessToken'
import { touristLocations } from '../constant/touristLocations'
import { useState } from 'react'
import MapGL, { Marker, NavigationControl } from '@urbica/react-map-gl'
import { theme } from '../constant/theme'
import { useNavigate } from 'react-router-dom'

interface customMapGLProps {
  locationID: string
}

export default function CustomMapGL(props: customMapGLProps) {
  const { locationID } = props

  const defaultlng = touristLocations.features.find(
    (x) => x.properties.id === locationID
  )?.geometry.longitude

  const defaultlat = touristLocations.features.find(
    (x) => x.properties.id === locationID
  )?.geometry.latitude

  const [viewport, setViewport] = useState({
    latitude: defaultlat ?? 18.78,
    longitude: defaultlng ?? 99,
    zoom: 16,
  })
  const navigate = useNavigate()

  const onClickMarker = (lg: number, lat: number, id: string) => {
    navigate(`/location/${id}`)
    setViewport({ latitude: lat, longitude: lg, zoom: 16 })
  }

  return (
    <>
      <MapGL
        accessToken={MAPBOX_ACCESS_TOKEN}
        mapStyle={'mapbox://styles/mapbox/streets-v11'}
        style={{ width: '100%', height: '800px' }}
        longitude={viewport.longitude}
        latitude={viewport.latitude}
        zoom={16}
        onViewportChange={setViewport}
      >
        <NavigationControl showCompass showZoom position='top-right' />
        {touristLocations.features.map((f) => (
          <Marker
            longitude={f.geometry.longitude}
            latitude={f.geometry.latitude}
            // onDragEnd={onDragEnd}
            // draggable
            onClick={() =>
              onClickMarker(
                f.geometry.longitude,
                f.geometry.latitude,
                f.properties.id
              )
            }
          >
            <Box display={'flex'} flexDirection={'row'} gap={'8px'}>
              <div
                className={
                  f.properties.id === locationID ? 'marker-current' : 'marker'
                }
              />
              <Typography
                variant='subtitle1'
                color={theme.palette.secondary.main}
                sx={{
                  textShadow:
                    '2px 2px 0 #fff, -2px 2px 0 #fff, -2px -2px 0 #fff, 2px -2px 0 #fff',
                }}
              >
                {f.properties.title}
              </Typography>
            </Box>
          </Marker>
        ))}
      </MapGL>
    </>
  )
}
