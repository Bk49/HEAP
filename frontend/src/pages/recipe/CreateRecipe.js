import { Fragment, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import SubmitFormGroup from "../../components/common/form/SubmitFormGroup";
import HeadingTwo from "../../components/common/heading/HeadingTwo";
import TextField from "../../components/common/form/TextField";
import SingleItemDropdown from "../../components/common/form/SingleItemDropdown";
import { recipeCategories } from "../../constants/dropdown-choices";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import HeadingOne from "../../components/common/heading/HeadingOne";
import FileInput from "../../components/common/form/FileInput";
import FieldsColumn from "../../components/common/form/FieldsColumn";
import FieldsRow from "../../components/common/form/FieldsRow";
import TextArea from "../../components/common/form/TextArea";
import ImagePlaceHolder from "../../assets/image-placeholder.png";
import RecipeIngredientsFieldArray from "../../components/recipe/datarow/RecipeIngredientsFieldArray";
import PreparationStepsFieldArray from "../../components/recipe/datarow/PreparationStepsFieldArray";

const CreateRecipe = () => {
    const formMethods = useForm();
    const { watch } = formMethods;
    const imageFile = watch("image");
    const [imgUrl, setImgUrl] = useState(null);
    const reader = new FileReader();

    useEffect(() => {
        reader.onload = () => {
            setImgUrl(reader.result);
        };

        if (imageFile) {
            reader.readAsDataURL(imageFile);
        }
    }, [imageFile]);

    return (
        <Fragment>
            <HeadingOne divider={true}>Create Recipe</HeadingOne>
            <FormProvider {...formMethods}>
                <HeadingTwo>Recipe Information</HeadingTwo>
                <FieldsColumn>
                    <FieldsRow>
                        <TextField
                            rules={{ required: true }}
                            name="name"
                            label="Recipe Name"
                        />
                        <SingleItemDropdown
                            name="category"
                            rules={{ required: true }}
                            label="Category"
                            choices={recipeCategories}
                        />
                        <TextField
                            rules={{ required: true, min: 0 }}
                            name="cost"
                            label="Cost to Produce"
                        />
                        <FileInput
                            rules={{ required: true }}
                            name="image"
                            label="Recipe Image"
                            icon={<AttachFileIcon />}
                        />
                    </FieldsRow>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "1rem",
                            justifyContent: "space-between",
                        }}
                    >
                        <FieldsColumn>
                            <TextArea
                                rule={{ required: true }}
                                name="description"
                                label="Description"
                            />
                        </FieldsColumn>
                        <FieldsColumn>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    marginRight: "2.5rem",
                                    alignItems: "center",
                                    height: "100%",
                                    width: "100%",
                                }}
                            >
                                <img
                                    style={{
                                        height: "11rem",
                                        width: "18rem",
                                        objectFit: "cover",
                                        borderRadius: "4px",
                                    }}
                                    alt="PreviewImage"
                                    src={imgUrl ? imgUrl : ImagePlaceHolder}
                                />
                                <span>Recipe Image Preview</span>
                            </div>
                        </FieldsColumn>
                    </div>
                </FieldsColumn>

                <HeadingTwo>Recipe Preparation</HeadingTwo>
                <br />
                <RecipeIngredientsFieldArray />
                <br />
                <PreparationStepsFieldArray />
                <SubmitFormGroup
                    submitErrorText="Creation of recipe is unsuccessful, please check your input"
                    onSubmit={(data) => {
                        console.log(data);
                    }}
                />
            </FormProvider>
        </Fragment>
    );
};

export default CreateRecipe;
