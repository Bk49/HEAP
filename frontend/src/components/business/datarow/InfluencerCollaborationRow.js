import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/RemoveCircleOutline";
import TextField from "../../common/form/TextField";
import { useFormContext } from "react-hook-form";

const InfluencerCollaborationRow = ({ index = -1, removeFn = () => {} }) => {
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
            <IconButton>
                <RemoveIcon onClick={removeFn} />
            </IconButton>
            <TextField
                rules={{ required: true }}
                name={`influencer.${index}.name`}
                label="Name"
                nestedError={errors.influencer?.[index].name}
            />
            <TextField
                rules={{
                    required: true,
                    pattern:
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                }}
                name={`influencer.${index}.email`}
                label="Email"
                nestedError={errors.influencer?.[index].email}
            />
            <TextField
                rules={{ required: true, maxLength: 8 }}
                type="number"
                name={`influencer.${index}.phone`}
                label="Phone Number"
                size="small"
                nestedError={errors.influencer?.[index].phone}
            />
            <TextField
                rules={{ required: true, min: 0 }}
                type="number"
                name={`influencer.${index}.price`}
                label="Price"
                size="tiny"
                nestedError={errors.influencer?.[index].price}
            />
        </div>
    );
};

export default InfluencerCollaborationRow;
