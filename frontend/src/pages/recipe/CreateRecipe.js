import { Fragment } from "react";
import HeadingOne from "../../components/common/heading/HeadingOne";
import CommonRecipeForm from "../../components/recipe/CommonRecipeForm";

const CreateRecipe = () => {
    return (
        <Fragment>
            <HeadingOne divider={true}>Create Recipe</HeadingOne>
            <CommonRecipeForm isCreate={true}/>
        </Fragment>
    );
};

export default CreateRecipe;
