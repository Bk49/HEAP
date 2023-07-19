import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker as MUIDatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller, useFormContext } from "react-hook-form";
import { generateRules } from "../../../functions/generateRules";
import { convertDateToObject } from "../../../functions/convertDate";

const DatePicker = ({
    defaultValue,
    rules = { disableFuture: false, disablePast: false },
    name = "textfield",
    label = "Label Text",
    nestedError = null,
}) => {
    const { required } = rules;
    const {
        control,
        formState: { errors },
    } = useFormContext();
    const error = nestedError ? nestedError : errors[name];

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={convertDateToObject(defaultValue)}
            rules={generateRules({ name: label, required: required })}
            render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MUIDatePicker
                        {...field}
                        variant="filled"
                        disableFuture={rules.disableFuture}
                        disablePast={rules.disablePast}
                        label={label}
                        slotProps={{
                            textField: {
                                helperText: error && error.message,
                                variant: "filled",
                                error: error,
                            },
                        }}
                    />
                </LocalizationProvider>
            )}
        />
    );
};

export default DatePicker;
