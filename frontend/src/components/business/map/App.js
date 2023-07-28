import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, Marker, InfoWindow, Autocomplete, useLoadScript } from '@react-google-maps/api';

const libraries = ['places'];

//Size of map container
const mapContainerStyle = {
  width: "652px",
  height: "342px",
};

//Set center
const center = {
  lat: 1.3521,
  lng: 103.8198,
};

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [infoWindowPosition, setInfoWindowPosition] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const autocompleteRef = useRef(null); // Ref to store the Autocomplete instance

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  // Load the google object from the script
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries,
  });

  useEffect(() => {
    if (window.google && isLoaded) {
      // The Google Maps API is loaded and ready to use
      // You can put any code that depends on the Google Maps API here
    }
  }, [isLoaded]);

  const handleMapClick = (event) => {
    setMarkerPosition({ lat: event.latLng.lat(), lng: event.latLng.lng() });
  };

  const handleMarkerClick = () => {
    setInfoWindowPosition(markerPosition);
  };

  const handleInfoWindowClose = () => {
    setInfoWindowPosition(null);
  };

  const handlePlaceSelect = () => {
    // Get the selected place from the Autocomplete component using the ref
    const selectedPlace = autocompleteRef.current.getPlace();

    setSearchValue(selectedPlace.formatted_address);
    setMarkerPosition({
      lat: selectedPlace.geometry.location.lat(),
      lng: selectedPlace.geometry.location.lng(),
    });
    setInfoWindowPosition({
      lat: selectedPlace.geometry.location.lat(),
      lng: selectedPlace.geometry.location.lng(),
    });
    map.panTo({
      lat: selectedPlace.geometry.location.lat(),
      lng: selectedPlace.geometry.location.lng(),
    });
  };

  //Loading of maps
  if (!isLoaded) return 'Loading Maps...';
  if (loadError) return 'Error loading maps';

  return (
    <div>
      <Autocomplete
        onLoad={(autocomplete) => {
          autocomplete.setFields(['formatted_address', 'geometry']);
          // Save the Autocomplete instance in the ref
          autocompleteRef.current = autocomplete;
        }}
        onPlaceChanged={handlePlaceSelect}
      >
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search for a location..."

          style={{
            width: "652px", // Set the desired width
            // Add any other styling you want
          }}

        />
      </Autocomplete>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={11}
        center={center}
        onClick={handleMapClick}
        onLoad={(map) => setMap(map)}
      >
        {markerPosition && (
          <Marker position={markerPosition} onClick={handleMarkerClick} />
        )}

        {infoWindowPosition && (
          <InfoWindow
            position={infoWindowPosition}
            onCloseClick={handleInfoWindowClose}
          >
            <div>
              <h3>Marker Location</h3>
              <p>Latitude: {infoWindowPosition.lat}</p>
              <p>Longitude: {infoWindowPosition.lng}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default MapComponent;