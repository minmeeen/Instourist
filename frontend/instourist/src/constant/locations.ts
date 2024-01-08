import { touristDestinationType } from '../type/touristDestinationType'

export interface InstouristLocation {
  locationID: string
  locationEN: string
  locationTH: string
  locationType: touristDestinationType
  locationImgName: string
}

export enum locationENUM {
  nature = 'NATURE',
  art = 'ART_CULTURE',
  artModified = 'ART&CULTURE',
  historic = 'HISTORIC',
  modern = 'MODERN',
}

export const NatureLocation: InstouristLocation[] = [
  {
    locationID: '1',
    locationEN: 'Chiang Mai Grand Canyon',
    locationTH: 'แกรนด์แคนยอน',
    locationType: locationENUM.nature,
    locationImgName: 'grandcanyon',
  },
  {
    locationID: '2',
    locationEN: 'Doi Inthanon',
    locationTH: 'ดอยอินทนนท์',
    locationType: locationENUM.nature,
    locationImgName: 'doiinthanon',
  },
  {
    locationID: '3',
    locationEN: 'Mae Taeng Elephant Park',
    locationTH: 'ปางช้างแม่แตง',
    locationType: locationENUM.nature,
    locationImgName: 'maetaengelephant',
  },
]

export const Art_CultureLocation: InstouristLocation[] = [
  {
    locationID: '4',
    locationEN: 'Wat Phra Singh',
    locationTH: 'วัดพระสิงห์',
    locationType: locationENUM.art,
    locationImgName: 'watphrasignh',
  },
  {
    locationID: '5',
    locationEN: 'Wat Gate Garam',
    locationTH: 'วัดเกตการาม',
    locationType: locationENUM.art,
    locationImgName: 'watgate',
  },
  {
    locationID: '6',
    locationEN: 'Wat Umong',
    locationTH: 'วัดอุโมงค์ (สวนพุทธธรรม)',
    locationType: locationENUM.art,
    locationImgName: 'watumong',
  },
]

export const HistoricLocation: InstouristLocation[] = [
  {
    locationID: '7',
    locationEN: 'Three Kings Monument',
    locationTH: 'พระบรมราชานุสาวรีย์สามกษัตริย์',
    locationType: locationENUM.historic,
    locationImgName: 'threekings',
  },
  {
    locationID: '8',
    locationEN: 'Wat Chiang Man',
    locationTH: 'วัดเชียงมั่น',
    locationType: locationENUM.historic,
    locationImgName: 'watchiangman',
  },
  {
    locationID: '9',
    locationEN: 'Tha Phae Gate',
    locationTH: 'ประตูท่าแพ',
    locationType: locationENUM.historic,
    locationImgName: 'thaphaegate',
  },
]

export const ModernLocation: InstouristLocation[] = [
  {
    locationID: '10',
    locationEN: 'MAYA Lifestyle Shopping Center',
    locationTH: 'ห้างสรรพสินค้าเมญ่า',
    locationType: locationENUM.modern,
    locationImgName: 'maya',
  },
  {
    locationID: '11',
    locationEN: 'Chiang Mai Night Bazaar',
    locationTH: 'ไนท์บาซาร์เชียงใหม่',
    locationType: locationENUM.modern,
    locationImgName: 'nightbazaar',
  },
  {
    locationID: '12',
    locationEN: 'Chiang Mai Night Safari',
    locationTH: 'เชียงใหม่ไนท์ซาฟารี',
    locationType: locationENUM.modern,
    locationImgName: 'nightsafari',
  },
]
