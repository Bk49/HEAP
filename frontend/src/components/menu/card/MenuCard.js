import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import SmallButton from "../../common/button/SmallButton";
import { useNavigate } from "react-router-dom";
import MenuCardDetails from "./MenuCardDetails";
import { Fragment } from "react";
import ConfirmDeleteDialog from "../../common/dialog/ConfirmDeleteDialog";
import MenuIllustration from "../../../assets/illustrations/menu-illustration.jpg";

const MenuCard = ({ menu }) => {
    const { id, name, sections, image = "default" } = menu;
    const navigate = useNavigate();

    return (
        <Fragment>
            <Card sx={{ width: "22vw", boxShadow: 4 }}>
                <CardMedia
                    sx={{ width: "100%", paddingTop: "100%" }}
                    image={
                        image === "default" || !image ? MenuIllustration : image
                    }
                    title={image}
                />
                <CardContent>
                    <Typography gutterBottom component="div" variant="h5">
                        {name}
                    </Typography>
                    <MenuCardDetails type="sections">
                        {sections.length} Sections
                    </MenuCardDetails>
                    <MenuCardDetails type="preparation">
                        {sections.length === 0
                            ? 0
                            : sections
                                  .map(({ items }) => items.length)
                                  .reduce((a, b) => a + b)}{" "}
                        Food & Beverages
                    </MenuCardDetails>
                </CardContent>
                <CardActions>
                    <SmallButton
                        onClick={() => navigate(`/edit-menu/${id}`)}
                        type="primary"
                    >
                        Edit
                    </SmallButton>
                    <ConfirmDeleteDialog id={id} name={name} type="menu" />
                </CardActions>
            </Card>
        </Fragment>
    );
};

export default MenuCard;
