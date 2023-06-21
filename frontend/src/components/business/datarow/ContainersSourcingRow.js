import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/RemoveCircleOutline";
import TextField from "../../common/form/TextField";
import { useFormContext } from "react-hook-form";

const ContainersSourcingRow = ({ index = -1, removeFn = () => {} }) => {
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
                name={`containers.${index}.containerName`}
                label="Container Name"
                nestedError={errors.containers?.[index].containerName}
            />
            <TextField
                rules={{ required: true }}
                name={`containers.${index}.vendorName`}
                label="Vendor Name"
                nestedError={errors.containers?.[index].vendorName}
            />
            <TextField
                rules={{ required: true, min: 0 }}
                name={`containers.${index}.price`}
                label="Price"
                size="tiny"
                type="number"
                nestedError={errors.containers?.[index].price}
            />
            <TextField
                rules={{ required: true, min: 0 }}
                name={`containers.${index}.quantity`}
                label="Quantity"
                size="tiny"
                type="number"
                nestedError={errors.containers?.[index].quantity}
            />
        </div>
    );
};

export default ContainersSourcingRow;
