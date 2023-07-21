import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [markers, setMarkers] = useState([]);

  const onLoad = (map) => {
    setMap(map);
  };

  useEffect(() => {
    // Fetch the user's current location or set a default location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
        },
        () => {
          setCenter({ lat: 1.3521, lng: 103.8198 }); // Default to a location if user denies location access
        }
      );
    }
  }, []);

  const handleSearch = (event) => {
    // Handle search input and update the map's center
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: event.target.value }, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK) {
        setCenter({
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        });
      }
    });
  };

  const handleMapClick = (event) => {
    // Add a new marker on map click
    setMarkers([...markers, { lat: event.latLng.lat(), lng: event.latLng.lng() }]);
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyChsCzm5-iAjK2cMpj_garxpAQdC4YbqsE">
      <GoogleMap
        mapContainerStyle={{ width: "652px", height: "342px" }}
        center={center}
        zoom={14}
        onLoad={onLoad}
        onClick={handleMapClick}
      >
        {/* Add search input */}
        <div>
          <input
            type="text"
            placeholder="Search location"
            onChange={handleSearch}
          />
        </div>

        {/* Add markers */}
        {markers.map((marker, index) => (
          <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

function App() {
    return (
        <div>
            <MapComponent/>
        </div>
    );
}

export default App;


// import React from "react";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// const containerStyle = {
//     width: "652px",
//     height: "342px",
// };

// const center = {
//     lat: 1.3521,
//     lng: 103.8198,
// };

// const Map = () => {
//     return (
//         <LoadScript googleMapsApiKey="AIzaSyChsCzm5-iAjK2cMpj_garxpAQdC4YbqsE">
//             <GoogleMap
//                 mapContainerStyle={containerStyle}
//                 center={center}
//                 zoom={10}
//             >
//                 <Marker position={center} />
//             </GoogleMap>
//         </LoadScript>
//     );
// };

// function App() {
//     return (
//         <div>
//             <Map />
//         </div>
//     );
// }

// export default App;