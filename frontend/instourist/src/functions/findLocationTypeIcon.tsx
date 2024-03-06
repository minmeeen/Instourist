import { touristDestinationType } from '../type/touristDestinationType'
import { PaletteMode } from '@mui/material'
import {
  BookOutlined,
  LocationCityOutlined,
  PaletteOutlined,
  ParkOutlined,
} from '@mui/icons-material'

export default function findLocationTypeIcon(
  locationType: touristDestinationType,
  mode: PaletteMode
) {
  switch (locationType) {
    case 'NATURE':
      return (
        // <img
        //   src={mode === 'dark' ? NATURE_WHITE : NATURE}
        //   width={'14px'}
        //   height={'14px'}
        //   alt='nature'
        // ></img>
        <ParkOutlined color={mode === 'dark' ? 'action' : 'primary'} />
      )

    case 'ART_CULTURE':
      return <PaletteOutlined color={mode === 'dark' ? 'action' : 'primary'} />
    case 'HISTORIC':
      return <BookOutlined color={mode === 'dark' ? 'action' : 'primary'} />
    case 'MODERN':
      return (
        <LocationCityOutlined color={mode === 'dark' ? 'action' : 'primary'} />
      )
  }
}
