import { touristDestinationType } from '../type/touristDestinationType'

export interface InstouristLocation {
  locationID: string
  locationEN: string
  locationTH: string
  locationType: touristDestinationType
}

export const NatureLocation: InstouristLocation[] = [
  {
    locationID: '001',
    locationEN: 'Chiang Mai Grand Canyon',
    locationTH: 'แกรนด์แคนยอน',
    locationType: 'NATURE',
  },
  {
    locationID: '002',
    locationEN: 'Doi Inthanon',
    locationTH: 'ดอยอินทนนท์',
    locationType: 'NATURE',
  },
  {
    locationID: '003',
    locationEN: 'Mae Taeng Elephant Park',
    locationTH: 'ปางช้างแม่แตง',
    locationType: 'NATURE',
  },
]

export const Art_CultureLocation: InstouristLocation[] = [
  {
    locationID: '004',
    locationEN: 'Wat Phra Singh',
    locationTH: 'วัดพระสิงห์',
    locationType: 'ART&CULTURE',
  },
  {
    locationID: '005',
    locationEN: 'Wat Umong',
    locationTH: 'วัดอุโมงค์ (สวนพุทธธรรม)',
    locationType: 'ART&CULTURE',
  },
  {
    locationID: '006',
    locationEN: 'Wat Gate Garam',
    locationTH: 'วัดเกตการาม',
    locationType: 'ART&CULTURE',
  },
]

export const HistoricLocation: InstouristLocation[] = [
  {
    locationID: '007',
    locationEN: 'Three Kings Monument',
    locationTH: 'พระบรมราชานุสาวรีย์สามกษัตริย์',
    locationType: 'HISTORIC',
  },
  {
    locationID: '008',
    locationEN: 'Wat Chiang Man',
    locationTH: 'วัดเชียงมั่น',
    locationType: 'HISTORIC',
  },
  {
    locationID: '009',
    locationEN: 'Tha Phae Gate',
    locationTH: 'ประตูท่าแพ',
    locationType: 'HISTORIC',
  },
]

export const ModernLocation: InstouristLocation[] = [
  {
    locationID: '010',
    locationEN: 'MAYA Lifestyle Shopping Center',
    locationTH: 'ห้างสรรพสินค้าเมญ่า',
    locationType: 'MODERN',
  },
  {
    locationID: '011',
    locationEN: 'Chiang Mai Night Bazaar',
    locationTH: 'ไนท์บาซาร์เชียงใหม่',
    locationType: 'MODERN',
  },
  {
    locationID: '012',
    locationEN: 'Chiang Mai Night Safari',
    locationTH: 'เชียงใหม่ไนท์ซาฟารี',
    locationType: 'MODERN',
  },
]
