import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useState } from 'react'
import CustomButton from './CustomButton'
import { touristDestinationType } from '../type/touristDestinationType'
import LocationCard from './LocationCard'
import {
  Art_CultureLocation,
  HistoricLocation,
  InstouristLocation,
  ModernLocation,
  NatureLocation,
  locationENUM,
} from '../constant/locations'
import { useNavigate } from 'react-router-dom'
import {
  BookOutlined,
  LocationCityOutlined,
  PaletteOutlined,
  ParkOutlined,
} from '@mui/icons-material'
import { webSiteLabel } from '../constant/websiteLabel'

export default function SelectTouristAttraction() {
  const matches = useMediaQuery('(min-width:960px)')

  const navigate = useNavigate()

  const theme = useTheme()

  const [selectDestination, setSelectDestination] =
    useState<touristDestinationType>()
  const [showLocation, setShowLocation] = useState<InstouristLocation[]>([])

  function checkSelectedDestination(type: touristDestinationType) {
    return type === selectDestination
  }

  const handleClickSelect = (destination: touristDestinationType) => {
    setSelectDestination(destination)
    if (destination === locationENUM.nature) setShowLocation(NatureLocation)
    else if (destination === locationENUM.art)
      setShowLocation(Art_CultureLocation)
    else if (destination === locationENUM.historic)
      setShowLocation(HistoricLocation)
    else setShowLocation(ModernLocation)
  }

  return (
    // <Box textAlign={'center'}>

    <Box
      sx={{
        borderRadius: '8px',
        bgcolor: `${
          theme.palette.mode === 'dark'
            ? 'rgba(0, 0, 0, 0.65)'
            : 'rgba(255, 255, 255, 0.65)'
        } `,
        boxShadow: '0px 4px 4px 0px rgba(56, 64, 95, 0.25)',
      }}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'space-between'}
      alignItems={'center'}
      padding={'14px 40px'}
      gap={'8px'}
      textAlign={'center'}
    >
      <Typography color={'text.primary'} variant='h4'>
        {webSiteLabel.selectDestinationEN}
      </Typography>
      <Box
        display={'flex'}
        alignItems={{ xs: 'left', sm: 'center' }}
        justifyContent={'space-between'}
        flexDirection={{ xs: 'column', sm: 'row' }}
        gap={'16px'}
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
          text={webSiteLabel.natureEN}
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
          text={webSiteLabel.artEN}
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
          text={webSiteLabel.historicEN}
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
          text={webSiteLabel.modernEN}
          matches={matches}
        />
      </Box>
      <Box
        display={'flex'}
        alignItems={'flex-end'}
        gap={'24px'}
        alignSelf={'stretch'}
        flexDirection={matches ? 'row' : 'column'}
        paddingTop={'12px'}
      >
        {showLocation.map((location) => (
          <LocationCard
            location={location}
            onClickSeeDetail={() => navigate(`location/${location.locationID}`)}
          />
        ))}
      </Box>
    </Box>
  )
}
