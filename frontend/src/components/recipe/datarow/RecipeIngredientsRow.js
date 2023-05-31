import RemoveIcon from "@mui/icons-material/RemoveCircleOutline";
import TextField from "../../common/form/TextField";
// import { Controller, useFormContext, useWatch } from "react-hook-form";
import IconButton from "@mui/material/IconButton";
import { useFormContext } from "react-hook-form";

const RecipeIngredientsRow = ({ index = -1, removeFn = () => {} }) => {
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
                rules={{ require: true }}
                name={`ingredients.${index}.name`}
                label="Ingredient Name"
                nestedError={errors.ingredients?.[index]?.name}
            />
            <TextField
                rules={{ require: true }}
                name={`ingredients.${index}.unit`}
                label="Measurement Unit"
                size="tiny"
                nestedError={errors.ingredients?.[index]?.unit}
            />
            <TextField
                rules={{ require: true, min: 0 }}
                name={`ingredients.${index}.quantity`}
                label="Quantity"
                size="tiny"
                type="number"
                nestedError={errors.ingredients?.[index]?.quantity}
            />
        </div>
    );
};

export default RecipeIngredientsRow;
