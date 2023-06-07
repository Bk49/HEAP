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

const ConfirmDeleteDialog = ({
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

    return (
        <Fragment>
            {type === "business" ? (
                <IconButton>
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
                    <Button onClick={() => {}}>Confirm</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
};

export default ConfirmDeleteDialog;
