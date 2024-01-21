import React from 'react'

import ReactMapGL, {
  Layer,
  Marker,
  NavigationControl,
  Source,
} from 'react-map-gl'

import touristLocation from '../constant/locations.json'

// -26.475393195281754, 153.04416685709924

const AppMap = ({ mapRef, viewport, setViewport }) => {
  // const handleAddClick = (e) => {
  //   setNewPlace({
  //     lat: e?.lngLat?.lat,
  //     lng: e?.lngLat?.lng,
  //   })
  // }
  // const geojson = {
  //   type: 'Feature',
  //   geometry: {
  //     type: 'Polygon',
  //     coordinates: [polygonCord],
  //   },
  // }

  // const layerStyle = {
  //   id: 'maine',
  //   type: 'fill',
  //   source: 'maine', // reference the data source
  //   layout: {},
  //   paint: {
  //     'fill-color': layerColor || '#0080ff', // blue color fill
  //     'fill-opacity': 0.5,
  //   },
  // }
  // // Add a black outline around the polygon.
  // const layerOutlineStyle = {
  //   id: 'outline',
  //   type: 'line',
  //   source: 'maine',
  //   layout: {},
  //   paint: {
  //     'line-color': '#000',
  //     'line-width': 3,
  //   },
  // }

  return (
    <ReactMapGL
      ref={mapRef}
      mapboxAccessToken={
        'pk.eyJ1IjoicGFpbnQ1NDBtYXBib3giLCJhIjoiY2xyNGhqaGx4MW85YjJrcW13NHZoeHZ0ZyJ9.rj429V71oEAb1O1ZAQdk3Q'
      }
      initialViewState={viewport}
      onViewportChange={(viewport) => setViewport(viewport)}
      mapStyle='mapbox://styles/mapbox/streets-v11'
      // onDblClick={handleAddClick}
      transitionDuration='200'
      attributionControl={true}
    >
      {/* <Source id='my-data' type='geojson' data={geojson}>
        <Layer {...layerOutlineStyle} />
        <Layer {...layerStyle} />
      </Source> */}

      {/* { touristLocation ? (
        <Marker
          latitude={touristLocation?.lat}
          longitude={touristLocation?.lng}
          draggable
          onDragEnd={(e) =>
            setNewPlace({ lng: e.lngLat.lng, lat: e.lngLat.lat })
          }
        />
      ) : null} */}
      <NavigationControl position='bottom-right' />
    </ReactMapGL>
  )
}

export default AppMap
