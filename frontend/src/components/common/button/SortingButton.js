import Button from "@mui/material/Button";
import { smallButtonStyles as style } from "../../../constants/buttonStyles";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const SortingButton = ({
    sort,
    setSort,
    name = "default",
    children = "Button Text",
}) => {
    return (
        <Button
            sx={{
                backgroundColor:
                    style[sort.sortBy === name ? "primary" : "secondary"]
                        .backgroundColor,
                color: "white",
                boxShadow: "2",
                width: "7rem",
                "&:hover": {
                    backgroundColor:
                        style[sort.sortBy === name ? "primary" : "secondary"]
                            .hoverColor,
                },
            }}
            variant="contained"
            onClick={() =>
                setSort(({ sortBy: prevSortBy, order: prevOrder }) => ({
                    sortBy:
                        prevSortBy === name && prevOrder === "ascending"
                            ? "default"
                            : name,
                    order:
                        prevSortBy === name && prevOrder === "descending"
                            ? "ascending"
                            : "descending",
                }))
            }
        >
            {children}
            {sort.sortBy === name ? (
                sort.order === "descending" ? (
                    <ExpandMoreIcon />
                ) : (
                    <ExpandLessIcon />
                )
            ) : null}
        </Button>
    );
};

export default SortingButton;
