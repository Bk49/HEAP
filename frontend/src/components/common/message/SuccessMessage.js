import { forwardRef } from "react";
import SuccessIcon from "@mui/icons-material/Done";
import BaseMessage from "./BaseMessage";

const SuccessMessage = forwardRef(
    ({ message = "This is a success message", id }, ref) => {
        return (
            <BaseMessage
                ref={ref}
                message={message}
                icon={<SuccessIcon fontSize="inherit" />}
                id={id}
                type="success"
            />
        );
    }
);

export default SuccessMessage;
