import { useFormContext } from "react-hook-form";
import SingleItemDropdown from "../../common/form/SingleItemDropdown";
import TextField from "../../common/form/TextField";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/RemoveCircleOutline";
import { useEffect, useState } from "react";
import getAllRecipes from "../../../axios/recipe/getAllRecipesAPI";

const MenuSectionItemsRow = ({
    sectionIndex = -1,
    itemIndex = -1,
    removeFn = () => {},
}) => {
    const {
        formState: { errors },
    } = useFormContext();
    const [choices, setChoices] = useState([
        { text: "Please Select a Recipe", value: "" },
    ]);

    useEffect(() => {
        (async () => {
            const {recipes} = await getAllRecipes();
            const dropdownChoices = await recipes.map((recipe, index) => ({
                key: index,
                text: recipe.name,
                value: recipe.id,
            }));
            console.log(dropdownChoices)

            setChoices((prev) => [...prev, ...dropdownChoices]);
        })();
    }, []);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "1rem",
            }}
        >
            <SingleItemDropdown
                rules={{ required: true }}
                label="Menu Item"
                name={`sections.${sectionIndex}.items.${itemIndex}.item`}
                nestedError={
                    errors.sections?.[sectionIndex]?.items?.[itemIndex]?.item
                }
                choices={choices}
            />
            <TextField
                rules={{ required: true, min: 0 }}
                label="Price"
                name={`sections.${sectionIndex}.items.${itemIndex}.price`}
                type="number"
                size="tiny"
                nestedError={
                    errors.sections?.[sectionIndex]?.items?.[itemIndex]?.price
                }
            />
            <IconButton onClick={removeFn}>
                <RemoveIcon />
            </IconButton>
        </div>
    );
};

export default MenuSectionItemsRow;
