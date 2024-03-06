import {
  Box,
  Button,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import React, { SetStateAction, useState } from 'react'
import CustomButton from './CustomButton'
import { touristDestinationType } from '../type/touristDestinationType'
import {
  Art_CultureLocation,
  HistoricLocation,
  InstouristLocation,
  ModernLocation,
  NatureLocation,
  locationENUM,
} from '../constant/locations'
import LocationCard from './LocationCard'
import { useNavigate } from 'react-router-dom'
import BACK_LIGHT from '../img/customback-light.svg'
import BACK_DARK from '../img/customback-dark.svg'
import {
  BookOutlined,
  LocationCityOutlined,
  PaletteOutlined,
  ParkOutlined,
} from '@mui/icons-material'
import { webSiteLabel } from '../constant/websiteLabel'

interface ExploreOtherLocationProps {
  fullSize: boolean
  setFullSize: React.Dispatch<SetStateAction<boolean>>
  location?: InstouristLocation | null
}

export default function ExploreOtherLocation(props: ExploreOtherLocationProps) {
  const { fullSize, setFullSize, location } = props
  const matches = useMediaQuery('(min-width:1150px)')
  const theme = useTheme()
  const [selectDestination, setSelectDestination] =
    useState<touristDestinationType>()
  const [showLocation, setShowLocation] = useState<InstouristLocation[]>([])

  const navigate = useNavigate()

  function checkSelectedDestination(type: touristDestinationType) {
    return type === selectDestination
  }

  const handleClickSelect = (destination: touristDestinationType) => {
    setFullSize(true)
    setSelectDestination(destination)
    if (destination === locationENUM.nature) setShowLocation(NatureLocation)
    else if (destination === locationENUM.art)
      setShowLocation(Art_CultureLocation)
    else if (destination === locationENUM.historic)
      setShowLocation(HistoricLocation)
    else setShowLocation(ModernLocation)
  }

  return (
    <Box
      maxHeight={'95vh'}
      paddingTop={'24px'}
      paddingBottom={'200px'}
      key={`location-card-${location}`}
    >
      <Box width={'100%'}>
        <Divider variant='fullWidth' orientation='horizontal' />
      </Box>
      {fullSize && (
        <Box paddingBottom={'24px'}>
          <Box
            display={'flex'}
            width={'100%'}
            justifyContent={'flex-end'}
            alignItems={'center'}
          >
            <Typography color={'text.primary'}>
              {webSiteLabel.backToTH} {location ? location.locationTH : ''}
            </Typography>
            <Button onClick={() => setFullSize && setFullSize(false)}>
              <img
                src={theme.palette.mode === 'dark' ? BACK_DARK : BACK_LIGHT}
                width={'20px'}
                height={'20px'}
                alt='mode'
              ></img>
            </Button>
          </Box>

          <Box width={'100%'}>
            <Divider variant='fullWidth' orientation='horizontal' />
          </Box>
        </Box>
      )}
      <Typography color={'text.primary'} variant='h5'>
        {webSiteLabel.exploreOtherLocationsTH}
      </Typography>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        gap={'12px'}
      >
        <CustomButton
          defaultIcon={
            <ParkOutlined
              color={theme.palette.mode === 'dark' ? 'action' : 'primary'}
            />
          }
          onClickIcon={<ParkOutlined color='inherit' />}
          onClick={() => handleClickSelect(locationENUM.nature)}
          isClicked={checkSelectedDestination(locationENUM.nature)}
          text={webSiteLabel.natureTH}
          matches={matches}
        />
        <CustomButton
          defaultIcon={
            <PaletteOutlined
              color={theme.palette.mode === 'dark' ? 'action' : 'primary'}
            />
          }
          onClickIcon={<PaletteOutlined color='inherit' />}
          onClick={() => handleClickSelect(locationENUM.art)}
          isClicked={checkSelectedDestination(locationENUM.art)}
          text={webSiteLabel.artTH}
          matches={matches}
        />
        <CustomButton
          defaultIcon={
            <BookOutlined
              color={theme.palette.mode === 'dark' ? 'action' : 'primary'}
            />
          }
          onClickIcon={<BookOutlined color='inherit' />}
          onClick={() => handleClickSelect(locationENUM.historic)}
          isClicked={checkSelectedDestination(locationENUM.historic)}
          text={webSiteLabel.historicTH}
          matches={matches}
        />
        <CustomButton
          defaultIcon={
            <LocationCityOutlined
              color={theme.palette.mode === 'dark' ? 'action' : 'primary'}
            />
          }
          onClickIcon={<LocationCityOutlined color='inherit' />}
          onClick={() => handleClickSelect(locationENUM.modern)}
          isClicked={checkSelectedDestination(locationENUM.modern)}
          text={webSiteLabel.modernTH}
          matches={matches}
        />
      </Box>
      {fullSize && (
        <Box
          key={`location-card-${location}`}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'flex-start'}
          gap={'24px'}
          alignSelf={'stretch'}
          paddingTop={'12px'}
        >
          {showLocation.map((location) => (
            <LocationCard
              location={location}
              onClickSeeDetail={() =>
                navigate(`/location/${location.locationID}`)
              }
              fullSize={fullSize}
              setFullSize={setFullSize!}
            />
          ))}
        </Box>
      )}
    </Box>
  )
}
