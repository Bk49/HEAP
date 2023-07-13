import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
    width: "652px",
    height: "342px",
};

const center = {
    lat: 1.3521,
    lng: 103.8198,
};

const Map = () => {
    return (
        <LoadScript googleMapsApiKey="AIzaSyChsCzm5-iAjK2cMpj_garxpAQdC4YbqsE">
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

function App() {
    return (
        <div>
            <Map />
        </div>
    );
}

export default App;
