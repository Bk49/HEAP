import HeadingOne from "../../components/common/heading/HeadingOne";
import { Fragment } from "react";
import CommonMenuForm from "../../components/menu/CommonMenuForm";
import { useLoaderData } from "react-router-dom";

const EditMenu = () => {
    const { menu } = useLoaderData();

    return (
        <Fragment>
            <HeadingOne divider={true}>Edit Menu</HeadingOne>
            <CommonMenuForm loaderData={menu} />
        </Fragment>
    );
};

export default EditMenu;
