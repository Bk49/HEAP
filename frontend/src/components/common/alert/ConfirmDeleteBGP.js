import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Fragment } from "react";
import Button from "@mui/material/Button";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import ConfirmDeleteButton from "./ConfirmDeleteButton";

const ConfirmDeleteBGP = ({
    type = "business",
    name = "Name Text",
    onDelete,
    dateCreated = new Date(),
}) => {    
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <Fragment>
            {type === "business" ? (
                <IconButton>
                    <DeleteIcon />
                </IconButton>
            ) : (
                
                <ConfirmDeleteButton onClick={() => setOpen(true)} type="error">
                    <DeleteIcon fontSize="1.4rem" />
                </ConfirmDeleteButton>
            )}

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Confirm Delete {name}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this {name}?
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
                        onClick={event => {
                            onDelete()
                            setOpen(false)
                        }}
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
};

export default ConfirmDeleteBGP;
