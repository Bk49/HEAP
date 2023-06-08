import HeadingOne from "../../components/common/heading/HeadingOne";
import { Fragment } from "react";
import CommonMenuForm from "../../components/menu/CommonMenuForm";

const EditMenu = () => {
    return (
        <Fragment>
            <HeadingOne divider={true}>Edit Menu</HeadingOne>
            <CommonMenuForm />
        </Fragment>
    );
};

export default EditMenu;
