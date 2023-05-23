import Divider from "@mui/material/Divider";
import { Fragment } from "react";
import SmallButton from "../button/SmallButton";

const SubmitFormGroup = ({ submitText = "Confirm Changes" }) => {
    return (
        <Fragment>
            <Divider sx={{ margin: "1rem 0" }} />
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    width: "100%",
                    gap: "1rem",
                }}
            >
                <SmallButton type="default">Return</SmallButton>
                <SmallButton type="primary">{submitText}</SmallButton>
            </div>
        </Fragment>
    );
};

export default SubmitFormGroup;
