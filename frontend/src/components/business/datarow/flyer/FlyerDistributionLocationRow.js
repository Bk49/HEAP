import RemoveIcon from "@mui/icons-material/RemoveCircleOutline";
import IconButton from "@mui/material/IconButton";
import { useFormContext } from "react-hook-form";
import FieldsColumn from "../../../common/form/FieldsColumn";
import FieldsRow from "../../../common/form/FieldsRow";
import Map from "../../map/Map";

const FlyerDistributionLocationRow = ({ index = -1, removeFn = () => {} }) => {
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
                    <Map
                        rules={{ required: true }}
                        label="Location Address"
                        name={`flyer.location.${index}`}
                        nestedError={errors.flyer?.location?.[index]?.text}
                    />
                </FieldsRow>
            </FieldsColumn>
        </div>
    );
};

export default FlyerDistributionLocationRow;
