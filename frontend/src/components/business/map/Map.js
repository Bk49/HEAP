import React, { useState, Fragment } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import axios from "axios";
import MapSearchField from "./MapSearchField";
import { useFormContext } from "react-hook-form";

const libraries = ["places"];

const Map = ({
    rules = {},
    label = "Location",
    name = "location",
    nestedError,
}) => {
    const [map, setMap] = useState(null);
    const { setValue } = useFormContext();

    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    // Load the google object from the script
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: apiKey,
        libraries,
    });

    return !isLoaded ? (
        <Fragment />
    ) : (
        <div>
            {map && (
                <MapSearchField
                    rules={rules}
                    name={name}
                    label={label}
                    map={map}
                    nestedError={nestedError}
                />
            )}

            <GoogleMap
                mapContainerStyle={{ width: "40rem", height: "20rem" }}
                zoom={11}
                center={{
                    lat: 1.3521,
                    lng: 103.8198,
                }}
                onClick={async (location) => {
                    if (location.placeId) {
                        const { data } = await axios.get(
                            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latLng.lat()},${location.latLng.lng()}&key=${apiKey}`
                        );
                        setValue(name, data.results[0].formatted_address);
                    }
                }}
                onLoad={(map) => setMap(map)}
                onUnmount={() => setMap(null)}
            ></GoogleMap>
        </div>
    );
};

export default Map;
