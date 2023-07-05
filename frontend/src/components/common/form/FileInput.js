import { Controller, useFormContext } from "react-hook-form";
import { MuiFileInput as MUIFileInput } from "mui-file-input";

const FileInput = ({
    name = "file",
    rules = { required: false },
    label = "Upload File",
    accept = { list: ["image/jpeg", "image/png"], type: "jpg, jpeg, png" },
    size = "small",
}) => {
    const { control, setError, setValue, clearErrors } = useFormContext();

    return (
        <Controller
            name={name}
            rules={rules.required ? { required: "No files chosen!" } : {}}
            control={control}
            render={({ field, fieldState }) => (
                <MUIFileInput
                    {...field}
                    onChange={(file) => {
                        if (file) {
                            if (accept.list.includes(file.type)) {
                                clearErrors(name);
                                return setValue(name, file);
                            } else {
                                setError(name, {
                                    message: `File input type is invalid, only accepts ${accept.type}`,
                                });
                            }
                        } else {
                            if (rules.required) {
                                setError(name, { message: `No files chosen!` });
                            }
                        }
                        return setValue(name, null);
                    }}
                    label={label}
                    variant="filled"
                    helperText={
                        fieldState.invalid ? fieldState.error.message : ""
                    }
                    error={fieldState.invalid}
                    sx={{
                        width: size === "small" ? "20rem" : "40rem",
                        "& input + span": { padding: "1.2rem 0 5px" },
                    }}
                />
            )}
        />
    );
};

export default FileInput;
