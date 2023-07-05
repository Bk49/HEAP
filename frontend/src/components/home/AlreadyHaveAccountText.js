import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const AlreadyHaveAccountText = () => {
    return (
        <Typography
            display="inline"
            color="#1E56A0"
            sx={{
                fontFamily: "Cocogoose",
                fontSize: "0.8rem",
            }}
        >
            Already have an account? Sign in{" "}
            <Link style={{ display: "inline-block" }} to="/login">
                <Typography
                    display="inline"
                    color="#43ACD9"
                    sx={{
                        textDecoration: "underline",
                    }}
                >
                    here
                </Typography>
            </Link>
        </Typography>
    );
};

export default AlreadyHaveAccountText;
