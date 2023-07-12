// import { Map } from '@googlemaps/react-wrapper'

// function Map() {
//   return (
//     <div>
//       <Map apiKey="YOUR_API_KEY" />
//     </div>
//   )
// }

// export default Map

import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '652px',
    height: '342px',
};

const center = {
  lat: 1.3521,
  lng: 103.8198
};

const Map = () => {
  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

function GoogleMap() {
  return (
    <div>
      <h1>Map Example</h1>
      <Map />
    </div>
  );
}

export default GoogleMap;
