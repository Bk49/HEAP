import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import ImagePlaceholder from "../../../assets/image-placeholder.png";
import SmallButton from "../../common/button/SmallButton";
import { useNavigate } from "react-router-dom";
import MenuCardDetails from "./MenuCardDetails";
import { Fragment } from "react";
import ConfirmDeleteDialog from "../../common/dialog/ConfirmDeleteDialog";

const MenuCard = ({ menu }) => {
    const {
        id,
        name,
        items,
        sections,
        image = "default",
    } = menu;
    const navigate = useNavigate();

    return (
        <Fragment>
            <Card sx={{ width: "22vw", boxShadow: 4 }}>
                <CardMedia
                    sx={{ width: "100%", paddingTop: "100%" }}
                    image={image === "default" ? ImagePlaceholder : image}
                    title={image}
                />
                <CardContent>
                    <Typography gutterBottom component="div" variant="h5">
                        {name}
                    </Typography>
                    <MenuCardDetails type="sections">
                        {sections} Sections
                    </MenuCardDetails>
                    <MenuCardDetails type="preparation">
                        {items} Food & Beverages
                    </MenuCardDetails>
                </CardContent>
                <CardActions>
                    <SmallButton
                        onClick={() => navigate(`/edit-menu/${id}`)}
                        type="primary"
                    >
                        Edit
                    </SmallButton>
                    <ConfirmDeleteDialog name={name} type="menu" />
                </CardActions>
            </Card>
        </Fragment>
    );
};

export default MenuCard;
