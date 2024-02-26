import { Box, Typography, useTheme } from '@mui/material'
import { touristLocations } from '../constant/touristLocations'
import { useEffect, useState } from 'react'
import MapGL, { Marker, NavigationControl } from '@urbica/react-map-gl'
import { useNavigate } from 'react-router-dom'
import { common } from '@mui/material/colors'

interface customMapGLProps {
  locationID?: string
}

export default function CustomMapGL(props: customMapGLProps) {
  const { locationID } = props
  const navigate = useNavigate()
  const theme = useTheme()

  let defaultlng = touristLocations.features.find(
    (x) => x.properties.id === locationID
  )?.geometry.longitude

  let defaultlat = touristLocations.features.find(
    (x) => x.properties.id === locationID
  )?.geometry.latitude

  let mapStyle =
    theme.palette.mode === 'dark'
      ? 'mapbox://styles/mapbox/navigation-night-v1'
      : 'mapbox://styles/mapbox/streets-v11'

  const [viewport, setViewport] = useState({
    latitude: defaultlat ?? 18.78,
    longitude: defaultlng ?? 99,
    zoom: 13,
  })

  const onClickMarker = (lg: number, lat: number, id: string) => {
    setViewport({ latitude: lat, longitude: lg, zoom: 16 })
    navigate(`/location/${id}`)
  }

  useEffect(() => {
    setViewport({
      latitude: defaultlat ?? 18.78,
      longitude: defaultlng ?? 99,
      zoom: 13,
    })
  }, [locationID])

  useEffect(() => {
    if (theme.palette.mode === 'dark')
      mapStyle = 'mapbox://styles/mapbox/navigation-night-v1'
    else mapStyle = 'mapbox://styles/mapbox/streets-v11'
  }, [theme.palette.mode])
  return (
    <>
      <MapGL
        accessToken={process.env.REACT_APP_MAPBOX_API}
        mapStyle={mapStyle}
        style={{ width: '100%', height: '95vh' }}
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
            onClick={() =>
              onClickMarker(
                f.geometry.longitude,
                f.geometry.latitude,
                f.properties.id
              )
            }
            anchor='center'
          >
            <Box
              display={'flex'}
              flexDirection={'column'}
              // gap={'8px'}
              alignContent={'center'}
              position={'absolute'}
              width={'160px'}
            >
              <div
                className={
                  f.properties.id === locationID ? 'marker-current' : 'marker'
                }
              />
              <Typography
                variant='subtitle1'
                color={
                  theme.palette.mode === 'dark'
                    ? common.white
                    : theme.palette.secondary.main
                }
                sx={{
                  textShadow:
                    theme.palette.mode === 'dark'
                      ? '2px 2px 0 #000, -2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000'
                      : '2px 2px 0 #fff, -2px 2px 0 #fff, -2px -2px 0 #fff, 2px -2px 0 #fff',
                  position: 'absolute',
                  paddingLeft: '32px',
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
