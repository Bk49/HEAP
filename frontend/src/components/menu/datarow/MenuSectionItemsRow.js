import { useFormContext } from "react-hook-form";
import SingleItemDropdown from "../../common/form/SingleItemDropdown";
import TextField from "../../common/form/TextField";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/RemoveCircleOutline";

const items = [
    { text: "Spaghetti Bolognese", value: "spaghetti bolognese", id: 1 },
    { text: "Chicken Stir-Fry", value: "chicken stir-fry", id: 2 },
    { text: "Caprese Salad", value: "caprese salad", id: 3 },
    { text: "Beef Tacos", value: "beef tacos", id: 4 },
    { text: "Mushroom Risotto", value: "mushroom risotto", id: 5 },
    { text: "Teriyaki Salmon", value: "teriyaki salmon", id: 6 },
    { text: "Caesar Salad", value: "caesar salad", id: 7 },
    { text: "Hawaiian Pizza", value: "hawaiian pizza", id: 8 },
    { text: "Chicken Parmesan", value: "chicken parmesan", id: 9 },
    { text: "Beef Stir-Fry", value: "beef stir-fry", id: 10 },
    { text: "Chicken Noodle Soup", value: "chicken noodle soup", id: 11 },
    { text: "Margherita Pizza", value: "margherita pizza", id: 12 },
    { text: "Shrimp Scampi", value: "shrimp scampi", id: 13 },
    { text: "Chicken Curry", value: "chicken curry", id: 14 },
    { text: "Classic Cheeseburger", value: "classic cheeseburger", id: 15 },
    { text: "Chocolate Chip Cookies", value: "chocolate chip cookies", id: 16 },
    { text: "Chicken Fajitas", value: "chicken fajitas", id: 17 },
    { text: "Vegetable Stir-Fry", value: "vegetable stir-fry", id: 18 },
];

const MenuSectionItemsRow = ({
    sectionIndex = -1,
    itemIndex = -1,
    removeFn = () => {},
}) => {
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
            <SingleItemDropdown
                rules={{ required: true }}
                label="Menu Item"
                name={`sections.${sectionIndex}.items.${itemIndex}.item`}
                nestedError={
                    errors.sections?.[sectionIndex]?.items?.[itemIndex]?.item
                }
                choices={items}
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
