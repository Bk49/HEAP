import FormControlLabel from "@mui/material/FormControlLabel";
import MUICheckbox from "@mui/material/Checkbox";
import { Controller, useFormContext } from "react-hook-form";

const Checkbox = ({ name = "checkbox", label = "", defaultValue = false }) => {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <FormControlLabel
                    control={
                        <MUICheckbox
                            {...field}
                            checked={defaultValue}
                            sx={{
                                "&.Mui-checked": {
                                    color: "#163172",
                                },
                            }}
                        />
                    }
                    label={label}
                />
            )}
        />
    );
};

export default Checkbox;
