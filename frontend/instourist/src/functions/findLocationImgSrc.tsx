import grandcanyon from '../img/grandcanyon.jpg'
import doiinthanon from '../img/doiinthanon.jpg'
import maetaengelephant from '../img/maetaengelephant.jpg'
import watphrasignh from '../img/watphrasignh.jpg'
import watumong from '../img/watumong.jpg'
import watgate from '../img/watgate.jpg'
import threekings from '../img/threekings.jpg'
import watchiangman from '../img/watchiangman.jpg'
import thaphaegate from '../img/thaphaegate.jpg'
import maya from '../img/maya.jpeg'
import nightbazaar from '../img/nightbazaar.jpg'
import nightsafari from '../img/nightsafari.jpg'

export default function findLocationImgSrc(locationImgSrc: string) {
  switch (locationImgSrc) {
    case 'grandcanyon':
      return <img src={grandcanyon} className='Location-card' />
    case 'doiinthanon':
      return <img src={doiinthanon} className='Location-card' />
    case 'maetaengelephant':
      return <img src={maetaengelephant} className='Location-card' />
    case 'watphrasignh':
      return <img src={watphrasignh} className='Location-card' />
    case 'watumong':
      return <img src={watumong} className='Location-card' />
    case 'watgate':
      return <img src={watgate} className='Location-card' />
    case 'threekings':
      return <img src={threekings} className='Location-card' />
    case 'watchiangman':
      return <img src={watchiangman} className='Location-card' />
    case 'thaphaegate':
      return <img src={thaphaegate} className='Location-card' />
    case 'maya':
      return <img src={maya} className='Location-card' />
    case 'nightbazaar':
      return <img src={nightbazaar} className='Location-card' />
    case 'nightsafari':
      return <img src={nightsafari} className='Location-card' />
  }
}
