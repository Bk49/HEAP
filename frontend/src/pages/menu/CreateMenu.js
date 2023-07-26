import HeadingOne from "../../components/common/heading/HeadingOne";
import { Fragment } from "react";
import CommonMenuForm from "../../components/menu/CommonMenuForm";

const CreateMenu = () => {
    return (
        <Fragment>
            <HeadingOne divider={true}>Create Menu</HeadingOne>
            <CommonMenuForm isCreate={true} />
        </Fragment>
    );
};

export default CreateMenu;
    