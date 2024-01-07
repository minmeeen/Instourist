import React, { useContext, useMemo, useState } from 'react'
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

interface LocationDetailProps {
  mode?: any
}
export default function LocationDetail(props: LocationDetailProps) {
  const { mode } = props
  const params = useParams()
  const locationID = params.locationID
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)

  function findLocation() {
    let currLocation = NatureLocation.filter(
      (location) => location.locationID === locationID
    ).at(0)
    if (!currLocation) {
      currLocation = Art_CultureLocation.filter(
        (location) => location.locationID === locationID
      ).at(0)
    }
    if (!currLocation) {
      currLocation = HistoricLocation.filter(
        (location) => location.locationID === locationID
      ).at(0)
    }
    if (!currLocation) {
      currLocation = ModernLocation.filter(
        (location) => location.locationID === locationID
      ).at(0)
    }
    return currLocation ? currLocation : ''
  }

  return (
    <>
      <Navbar variant='other' />

      <Box display={'flex'} width={'100vw'}>
        <LocationSideBar location={findLocation()} />
      </Box>
    </>
  )
}
