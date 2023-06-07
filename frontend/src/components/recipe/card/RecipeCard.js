import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import ImagePlaceholder from "../../../assets/image-placeholder.png";
import SmallButton from "../../common/button/SmallButton";
import { useNavigate } from "react-router-dom";
import RecipeCardDetails from "./RecipeCardDetails";
import { Fragment } from "react";
import ConfirmDeleteDialog from "../../common/dialog/ConfirmDeleteDialog";

const RecipeCard = ({ recipe }) => {
    const {
        id,
        name,
        type,
        cost,
        ingredients,
        steps,
        image = "default",
    } = recipe;
    const navigate = useNavigate();

    return (
        <Fragment>
            <Card sx={{ width: "22vw", boxShadow: 4 }}>
                <CardMedia
                    sx={{ height: "12rem", width: "100%" }}
                    image={ImagePlaceholder}
                    title={image}
                />
                <CardContent>
                    <Typography gutterBottom component="div" variant="h5">
                        {name}
                    </Typography>
                    <RecipeCardDetails type="category">
                        {type}
                    </RecipeCardDetails>
                    <RecipeCardDetails type="price">
                        {parseFloat(cost).toFixed(2)}
                    </RecipeCardDetails>
                    <RecipeCardDetails type="preparation">
                        {ingredients.length} Ingredients, {steps.length} Steps
                    </RecipeCardDetails>
                </CardContent>
                <CardActions>
                    <SmallButton
                        onClick={() => navigate(`/edit-recipe/${id}`)}
                        type="primary"
                    >
                        Edit
                    </SmallButton>
                    <ConfirmDeleteDialog name={name} type="recipe"/>
                </CardActions>
            </Card>

        </Fragment>
    );
};

export default RecipeCard;
