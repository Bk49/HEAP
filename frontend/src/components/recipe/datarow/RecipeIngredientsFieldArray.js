import { useFieldArray } from "react-hook-form";
import RecipeIngredientsRow from "./RecipeIngredientsRow";
import { Fragment } from "react";
import HeadingThree from "../../common/heading/HeadingThree";

const RecipeIngredientsFieldArray = () => {
    const { fields, append, remove } = useFieldArray({
        name: "ingredients",
    });

    return (
        <Fragment>
            <HeadingThree
                add={true}
                addFn={() => append({ name: "", unit: "", quantity: "" })}
            >
                Recipe Ingredients
            </HeadingThree>
            <div
                style={{
                    marginTop: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}
            >
                {fields.map((field, index) => (
                    <RecipeIngredientsRow
                        removeFn={() => remove(index)}
                        key={field.id}
                        index={index}
                    />
                ))}
            </div>
        </Fragment>
    );
};

export default RecipeIngredientsFieldArray;
