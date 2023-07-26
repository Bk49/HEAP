import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const MapComponent = () => {
  // eslint-disable-next-line
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  // eslint-disable-next-line
  const [marker, setMarker] = useState(null);
  const [clickedLocation, setClickedLocation] = useState(null);
  const [addressDetails, setAddressDetails] = useState(null);

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

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
        setClickedLocation(null);
        setAddressDetails(null);
      }
    });
  };

  const handleMapClick = (event) => {
    // Update marker's position on map click
    setClickedLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });

    // Reverse geocode the clicked location to get address details
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat: event.latLng.lat(), lng: event.latLng.lng() } }, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK) {
        setAddressDetails(results[0].formatted_address);
      }
    });
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
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
        {clickedLocation && <Marker position={clickedLocation} />}

        {/* Add info window */}
        {addressDetails && clickedLocation && (
          <InfoWindow
            position={clickedLocation}
            onCloseClick={() => setClickedLocation(null)}
          >
            <div>
              <p>Address: {addressDetails}</p>
              <p>Latitude: {clickedLocation.lat}</p>
              <p>Longitude: {clickedLocation.lng}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
