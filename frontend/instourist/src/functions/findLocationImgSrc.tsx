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
      return (
        <img src={grandcanyon} className='Location-card' alt='grandcanyon' />
      )
    case 'doiinthanon':
      return (
        <img src={doiinthanon} className='Location-card' alt='doiinthanon' />
      )
    case 'maetaengelephant':
      return (
        <img
          src={maetaengelephant}
          className='Location-card'
          alt='elephantpark'
        />
      )
    case 'watphrasignh':
      return (
        <img src={watphrasignh} className='Location-card' alt='watphrasignh' />
      )
    case 'watumong':
      return <img src={watumong} className='Location-card' alt='watumong' />
    case 'watgate':
      return <img src={watgate} className='Location-card' alt='watgate' />
    case 'threekings':
      return <img src={threekings} className='Location-card' alt='threekings' />
    case 'watchiangman':
      return (
        <img src={watchiangman} className='Location-card' alt='watchiangman' />
      )
    case 'thaphaegate':
      return (
        <img src={thaphaegate} className='Location-card' alt='thaphaegate' />
      )
    case 'maya':
      return <img src={maya} className='Location-card' alt='maya' />
    case 'nightbazaar':
      return (
        <img src={nightbazaar} className='Location-card' alt='nightbazaar' />
      )
    case 'nightsafari':
      return (
        <img src={nightsafari} className='Location-card' alt='nightsafari' />
      )
  }
}
