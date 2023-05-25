import { forwardRef } from "react";
import WarningIcon from "@mui/icons-material/Warning";
import BaseMessage from "./BaseMessage";

const ErrorMessage = forwardRef(
    ({ message = "This is an error message", id }, ref) => {
        return (
            <BaseMessage
                ref={ref}
                message={message}
                icon={<WarningIcon fontSize="inherit" />}
                id={id}
                type="error"
            />
        );
    }
);

export default ErrorMessage;
