import { Button } from "@mui/material";
import { Fragment } from "react";

const HeadingTwo = ({ children = "Heading Two", addButton = false }) => {
    return (
        <Fragment>
            <span
                style={{
                    color: "#1E56A0",
                    fontFamily: "Cocogoose",
                    fontSize: "1.5rem",
                }}
            >
                {children}
            </span>
            {/* The button here has yet been created as a TextIconButton */}
            {addButton && <Button>Add</Button>} 
        </Fragment>
    );
};

export default HeadingTwo;
