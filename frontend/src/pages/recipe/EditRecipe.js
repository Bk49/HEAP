import { Fragment } from "react";
import HeadingOne from "../../components/common/heading/HeadingOne";
import CommonRecipeForm from "../../components/recipe/CommonRecipeForm";

const EditRecipe = () => {
    return (
        <Fragment>
            <HeadingOne divider={true}>Edit Recipe</HeadingOne>
            <CommonRecipeForm />
        </Fragment>
    );
};

export default EditRecipe;
