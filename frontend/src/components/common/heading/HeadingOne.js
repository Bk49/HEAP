import Divider from "@mui/material/Divider";
import { Fragment } from "react";

const HeadingOne = ({ divider = false, children = "Heading One" }) => {
    return (
        <Fragment>
            <span
                style={{
                    color: "#163172",
                    fontFamily: "Cocogoose",
                    fontSize: "2rem",
                }}
            >
                {children}
            </span>
            {divider && <Divider sx={{ margin: "1rem 0" }} />}
        </Fragment>
    );
};

export default HeadingOne;
