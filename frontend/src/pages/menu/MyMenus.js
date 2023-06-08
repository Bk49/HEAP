import { Fragment } from "react";
import HeadingOne from "../../components/common/heading/HeadingOne";
import TextIconButton from "../../components/common/button/TextIconButton";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import MenuCard from "../../components/menu/card/MenuCard";

const menus = [
    { id: 1, name: "Menu #1", sections: 8, items: 72 },
    { id: 2, name: "Menu #2", sections: 8, items: 72 },
    { id: 3, name: "Menu #3", sections: 8, items: 72 },
    { id: 4, name: "Menu #4", sections: 8, items: 72 },
    { id: 5, name: "Menu #5", sections: 8, items: 72 },
    { id: 6, name: "Menu #6", sections: 8, items: 72 },
    { id: 7, name: "Menu #7", sections: 8, items: 72 },
    { id: 8, name: "Menu #8", sections: 8, items: 72 },
    { id: 9, name: "Menu #9", sections: 8, items: 72 },
    { id: 10, name: "Menu #10", sections: 8, items: 72 },
    { id: 11, name: "Menu #11", sections: 8, items: 72 },
    { id: 12, name: "Menu #12", sections: 8, items: 72 },
];

const MyMenus = () => {
    const navigate = useNavigate();
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
                    <Grid item>
                        <MenuCard key={index} menu={menu}/>
                    </Grid>
                ))}
            </Grid>
        </Fragment>
    );
};

export default MyMenus;
