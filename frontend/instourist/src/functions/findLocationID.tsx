import {
  Art_CultureLocation,
  HistoricLocation,
  ModernLocation,
  NatureLocation,
} from '../constant/locations'

export function findLocationID(locationID: string) {
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
  return currLocation ? currLocation : null
}
