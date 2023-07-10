import { Fragment, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import SubmitFormGroup from "../../components/common/form/SubmitFormGroup";
import HeadingTwo from "../../components/common/heading/HeadingTwo";
import TextField from "../../components/common/form/TextField";
import SingleItemDropdown from "../../components/common/form/SingleItemDropdown";
import { recipeCategories } from "../../constants/dropdown-choices";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import FileInput from "../../components/common/form/FileInput";
import FieldsColumn from "../../components/common/form/FieldsColumn";
import FieldsRow from "../../components/common/form/FieldsRow";
import TextArea from "../../components/common/form/TextArea";
import ImagePlaceHolder from "../../assets/image-placeholder.png";
import PreparationStepsFieldArray from "../../components/recipe/datarow/PreparationStepsFieldArray";
import { useNavigate } from "react-router-dom";
import { queueError } from "../../functions/formHandling";
import { enqueueSnackbar } from "notistack";
import createRecipe from "../../axios/recipe/createRecipeAPI";
import Cookies from "js-cookie";
import CommonFieldArray from "../common/datarow/CommonFieldArray";
import RecipeIngredientsRow from "./datarow/RecipeIngredientsRow";

const CommonRecipeForm = ({ isCreate = false }) => {
    const formMethods = useForm();
    const { watch } = formMethods;
    const imageFile = watch("image");
    const [imgUrl, setImgUrl] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const reader = new FileReader();
        reader.onload = () => {
            setImgUrl(reader.result);
        };

        if (imageFile) {
            reader.readAsDataURL(imageFile);
        }
    }, [imageFile]);

    return (
        <Fragment>
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
                <CommonFieldArray
                    name="ingredients"
                    appendObj={{ name: "", unit: "", quantity: "" }}
                    heading="Recipe Ingredients"
                    Component={RecipeIngredientsRow}
                />
                <br />
                <PreparationStepsFieldArray />
                <SubmitFormGroup
                    submitErrorText={`${
                        isCreate ? "Creation" : "Update"
                    } of recipe is unsuccessful, please check your input`}
                    onSubmit={
                            async (data) => {
                                try {
                                    const result = await createRecipe(data);
                                    console.log(result);
                                } catch (e) {
                                    queueError(e, enqueueSnackbar);
                                }
        
                                // navigate("/my-recipes")
                            }

                        }
                />
            </FormProvider>
        </Fragment>
    );
};

export default CommonRecipeForm;
