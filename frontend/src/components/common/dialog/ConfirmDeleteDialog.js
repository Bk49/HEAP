import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import SmallButton from "../button/SmallButton";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Fragment } from "react";
import Button from "@mui/material/Button";
import { grey } from "@mui/material/colors";
import deleteRecipe from "../../../axios/recipe/deleteRecipeAPI";
import deleteMenu from "../../../axios/menu/deleteMenuAPI";
import deleteBusiness from "../../../axios/business/deleteBusinessAPI";
import { queueError } from "../../../functions/formHandling";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const ConfirmDeleteDialog = ({
    id = "",
    type = "business",
    name = "Name Text",
    dateCreated = new Date(),
}) => {
    const toConfirm =
        type === "menu"
            ? "Menu"
            : type === "recipe"
            ? "Recipe"
            : "Business Growth Plan";
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <Fragment>
            {type === "business" ? (
                <IconButton onClick={() => setOpen(true)}>
                    <DeleteIcon />
                </IconButton>
            ) : (
                <SmallButton onClick={() => setOpen(true)} type="error">
                    Delete
                </SmallButton>
            )}

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Confirm Delete {toConfirm}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this {toConfirm}?
                        <br />
                        <br />
                        {type === "menu"
                            ? "Menu name: "
                            : type === "recipe"
                            ? "Recipe name: "
                            : "Type: "}
                        {name}
                        <br />
                        Date Created:{" "}
                        {`${`0${dateCreated.getDay()}`.slice(-2)}/${`0${
                            dateCreated.getMonth() + 1
                        }`.slice(
                            -2
                        )}/${dateCreated.getFullYear()} ${`0${dateCreated.getHours()}`.slice(
                            -2
                        )}:${dateCreated.getMinutes()}`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        sx={{ color: grey[600] }}
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={async () => {
                            try {
                                if (type === "recipe") {
                                    const result = await deleteRecipe(id);
                                    navigate("/my-recipes", {
                                        state: { success: result },
                                    });
                                } else if (type === "menu") {
                                    const result = await deleteMenu(id);
                                    navigate("/my-menus", {
                                        state: { success: result },
                                    });
                                } else {
                                    const result = await deleteBusiness(id);
                                    navigate("/my-plans", {
                                        state: { success: result },
                                    });
                                }
                            } catch (e) {
                                queueError(e, enqueueSnackbar);
                            }
                        }}
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
};

export default ConfirmDeleteDialog;
