import RemoveIcon from "@mui/icons-material/RemoveCircleOutline";
import TextArea from "../../common/form/TextArea";
import IconButton from "@mui/material/IconButton";
import { useFormContext } from "react-hook-form";
import FieldsColumn from "../../common/form/FieldsColumn";
import FieldsRow from "../../common/form/FieldsRow";
import Map from "../map/App";

const LocationRow = ({ index = -1, removeFn = () => {} }) => {
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
        
        <FieldsColumn>
            <FieldsRow>
                <Map/>

                <TextArea
                rules={{ required: true }}
                label="Location Address"
                name={`address.${index}.text`}
                nestedError={errors.address?.[index]?.text}
                />

            </FieldsRow>
        </FieldsColumn>
        </div>
    )

}

export default LocationRow;