import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [marker, setMarker] = useState(null);
  const [infoWindow, setInfoWindow] = useState(null);
  const [clickedLocation, setClickedLocation] = useState(null);

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
    event.preventDefault();
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: event.target.search.value }, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK) {
        setCenter({
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        });
        setMarker(null); // Reset marker when a new location is searched
      }
    });
  };

  const handleMapClick = (event) => {
    // Update marker's position on map click
    setClickedLocation(event.latLng);
  };

  const handleInfoWindowClose = () => {
    setClickedLocation(null);
  };

  useEffect(() => {
    if (clickedLocation) {
      setMarker(clickedLocation);
      setInfoWindow(clickedLocation);
    }
  }, [clickedLocation]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyChsCzm5-iAjK2cMpj_garxpAQdC4YbqsE">
      <GoogleMap
        mapContainerStyle={{ width: "652px", height: "342px" }}
        center={center}
        zoom={11}
        onLoad={onLoad}
        onClick={handleMapClick}
      >

        {/* Add marker */}
        {marker && <Marker position={{ lat: marker.lat(), lng: marker.lng() }} />}

        {/* Add info window */}
        {infoWindow && (
          <InfoWindow
            position={{ lat: infoWindow.lat(), lng: infoWindow.lng() }}
            onCloseClick={handleInfoWindowClose}
          >
            <div>
              <p>Clicked Location</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
