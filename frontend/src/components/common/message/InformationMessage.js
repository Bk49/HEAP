import { forwardRef } from "react";
import ErrorIcon from "@mui/icons-material/Error";
import BaseMessage from "./BaseMessage";

const InformationMessage = forwardRef(
    ({ message = "This is an information message", id }, ref) => {
        return (
            <BaseMessage
                ref={ref}
                message={message}
                icon={<ErrorIcon fontSize="inherit" />}
                id={id}
                type="info"
            />
        );
    }
);

export default InformationMessage;
