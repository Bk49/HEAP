import { Fragment } from "react";
import HeadingOne from "../../components/common/heading/HeadingOne";
import TextIconButton from "../../components/common/button/TextIconButton";
import { useLoaderData, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import MenuCard from "../../components/menu/card/MenuCard";

const MyMenus = () => {
    const navigate = useNavigate();
    const { returnedMenus: menus } = useLoaderData();

    return (
        <Fragment>
            <HeadingOne divider={true}>My Menus</HeadingOne>
            <Grid container direction="row-reverse" alignItems="flex-end">
                <TextIconButton
                    type="primary"
                    onClick={() => navigate("/create-menu")}
                >
                    Create
                </TextIconButton>
            </Grid>

            <br />
            <Grid container direction="row" columnGap={4} rowGap={5}>
                {menus.map((menu, index) => (
                    <Grid key={index} item>
                        <MenuCard menu={menu} />
                    </Grid>
                ))}
            </Grid>
        </Fragment>
    );
};

export default MyMenus;
