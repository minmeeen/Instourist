import NATURE from '../img/nature.svg'
import NATURE_WHITE from '../img/nature-white.svg'
import ART_CULTURE from '../img/art.svg'
import ART_CULTURE_WHITE from '../img/art-white.svg'
import MODERN from '../img/modern.svg'
import MODERN_WHITE from '../img/modern-white.svg'
import HISTORIC from '../img/historic.svg'
import HISTORIC_WHITE from '../img/historic-white.svg'
import { touristDestinationType } from '../type/touristDestinationType'
import { PaletteMode } from '@mui/material'

export default function findLocationTypeIcon(
  locationType: touristDestinationType,
  mode: PaletteMode
) {
  switch (locationType) {
    case 'NATURE':
      return (
        <img
          src={mode === 'dark' ? NATURE_WHITE : NATURE}
          width={'14px'}
          height={'14px'}
          alt='nature'
        ></img>
      )

    case 'ART_CULTURE':
      return (
        <img
          src={mode === 'dark' ? ART_CULTURE_WHITE : ART_CULTURE}
          width={'14px'}
          height={'14px'}
          alt='art'
        ></img>
      )
    case 'HISTORIC':
      return (
        <img
          src={mode === 'dark' ? HISTORIC_WHITE : HISTORIC}
          width={'14px'}
          height={'14px'}
          alt='historic'
        ></img>
      )
    case 'MODERN':
      return (
        <img
          src={mode === 'dark' ? MODERN_WHITE : MODERN}
          width={'14px'}
          height={'14px'}
          alt='modern'
        ></img>
      )
  }
}
