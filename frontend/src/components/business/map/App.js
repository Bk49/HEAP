import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [marker, setMarker] = useState(null);
  const [markerAdded, setMarkerAdded] = useState(false);

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
    // Update marker's position on map click
    setMarker({ lat: event.latLng.lat(), lng: event.latLng.lng() });
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyChsCzm5-iAjK2cMpj_garxpAQdC4YbqsE">
      <GoogleMap
        mapContainerStyle={{ width: "652px", height: "342px" }}
        center={center}
        zoom={11}
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

        {/* Add marker */}
        {marker && <Marker position={{ lat: marker.lat, lng: marker.lng }} />}
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
