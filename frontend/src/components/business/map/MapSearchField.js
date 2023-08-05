import { Autocomplete } from "@react-google-maps/api";
import { Controller, useFormContext } from "react-hook-form";
import { generateRules } from "../../../functions/generateRules";
import { useRef } from "react";
import TextField from "@mui/material/TextField";

const MapSearchField = ({
    rules = {},
    map,
    name = "searcharea",
    label = "Search Area",

    nestedError = null,
}) => {
    const {
        control,
        formState: { errors },
        setValue,
    } = useFormContext();
    const error = nestedError ? nestedError : errors[name];
    const autocompleteRef = useRef(null);

    const handlePlaceSelection = (selectedPlace) => {
        if (selectedPlace) {
            const { formatted_address, geometry } = selectedPlace;

            if (geometry && geometry.location) {
                const { lat, lng } = geometry.location;

                setValue(name, formatted_address);
                map.panTo({
                    lat: lat(),
                    lng: lng(),
                });
            }
        }
    };

    return (
        <Controller
            name={name}
            defaultValue=""
            control={control}
            rules={generateRules({ name: label, ...rules })}
            render={({ field }) => (
                <Autocomplete
                    onLoad={(autocomplete) => {
                        autocomplete.setFields([
                            "formatted_address",
                            "geometry",
                        ]);
                        autocompleteRef.current = autocomplete;
                    }}
                    onPlaceChanged={() => {
                        handlePlaceSelection(
                            autocompleteRef.current.getPlace()
                        );
                    }}
                >
                    <TextField
                        {...field}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                handlePlaceSelection(
                                    autocompleteRef.current.getPlace()
                                );
                            }
                        }}
                        error={nestedError ? nestedError : error}
                        helperText={
                            nestedError
                                ? nestedError.message
                                : error
                                ? error.message
                                : ""
                        }
                        label={label}
                        sx={{ width: "40rem" }}
                        variant="filled"
                    />
                </Autocomplete>
            )}
        />
    );
};

export default MapSearchField;
