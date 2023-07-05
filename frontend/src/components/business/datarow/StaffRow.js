import RemoveIcon from "@mui/icons-material/RemoveCircleOutline";
import TextField from "../../common/form/TextField";
import SingleItemDropdown from "../../common/form/SingleItemDropdown";
import IconButton from "@mui/material/IconButton";
import { useFormContext } from "react-hook-form";
import { hiringMethod } from "../../../constants/dropdown-choices";
import { position } from "../../../constants/dropdown-choices";

const StaffRow = ({ index = -1, removeFn = () => {} }) => {
    const {
        formState: { errors },
    } = useFormContext();

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "1rem",
            }}
        >
            <IconButton onClick={removeFn}>
                <RemoveIcon />
            </IconButton>

            <TextField
                rules={{ required: true }}
                label="Staff Name"
                name={`staffs.${index}.name`}
                nestedError={errors.staffs?.[index]?.name}
            />
             <SingleItemDropdown
                rules={{ required: true }}
                label="Hiring Method"
                name={`staffs.${index}.hiringMethod`}
                choices={[
                    { hiringMethod },
                ]}
                nestedError={errors.staffs?.[index]?.hiringMethod}
            />
            <SingleItemDropdown
                rules={{ required: true }}
                label="Position"
                name={`staffs.${index}.position`}
                choices={[
                    { position },
                ]}
                nestedError={errors.staffs?.[index]?.position}
            />
        </div>
    );
};

export default StaffRow;