import { Button } from "@mui/material";
import HeadingOne from "../../components/common/heading/HeadingOne";
import { Fragment } from "react";
import {useNavigate} from "react-router-dom"

const MySummary = () => {
    const navigate = useNavigate()

    return (
        <Fragment>
            <HeadingOne divider={true}>Summary</HeadingOne>
            <Button onClick={() => navigate("/create-plan")}>Create</Button>
        </Fragment>
    );
};

export default MySummary;
