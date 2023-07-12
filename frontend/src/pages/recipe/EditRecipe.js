import { Fragment } from "react";
import HeadingOne from "../../components/common/heading/HeadingOne";
import CommonRecipeForm from "../../components/recipe/CommonRecipeForm";
import { useLoaderData } from "react-router-dom";

const EditRecipe = () => {
    const { recipe } = useLoaderData();

    return (
        <Fragment>
            <HeadingOne divider={true}>Edit Recipe</HeadingOne>
            <CommonRecipeForm loaderData={recipe} />
        </Fragment>
    );
};

export default EditRecipe;
