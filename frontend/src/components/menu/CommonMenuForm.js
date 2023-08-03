import { Fragment, useEffect, useState } from "react";
import FieldsColumn from "../common/form/FieldsColumn";
import HeadingTwo from "../common/heading/HeadingTwo";
import FieldsRow from "../common/form/FieldsRow";
import TextField from "../common/form/TextField";
import SingleItemDropdown from "../common/form/SingleItemDropdown";
import { FormProvider, useForm } from "react-hook-form";
import MenuSectionFieldsArray from "./datarow/MenuSectionFieldsArray";
import SubmitFormGroup from "../common/form/SubmitFormGroup";
import { menuTypes } from "../../constants/dropdown-choices";
import { queueError } from "../../functions/formHandling";
import { enqueueSnackbar } from "notistack";
import createMenu from "../../axios/menu/createMenuAPI";
import { useNavigate } from "react-router-dom";
import updateMenu from "../../axios/menu/updateMenuAPI";
import FileInput from "../common/form/FileInput";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ImagePlaceHolder from "../../assets/image-placeholder.png";
import Grid from "@mui/material/Grid";

const CommonMenuForm = ({ isCreate = false, loaderData }) => {
    const formMethods = useForm({
        values: !isCreate && loaderData ? loaderData : {},
    });
    const { watch } = formMethods;
    const imageFile = watch("image");
    const navigate = useNavigate();
    const [imgUrl, setImgUrl] = useState(null);

    useEffect(() => {
        const reader = new FileReader();
        reader.onload = () => {
            setImgUrl(reader.result);
        };

        if (imageFile) {
            /^https?:\/\/.+/i.test(imageFile)
                ? setImgUrl(imageFile)
                : reader.readAsDataURL(imageFile);
        }
    }, [imageFile]);

    return (
        <Fragment>
            <FormProvider {...formMethods}>
                <HeadingTwo>Menu Information</HeadingTwo>
                <Grid container>
                    <Grid xs={9}>
                        <FieldsColumn>
                            <FieldsRow>
                                <TextField
                                    rules={{ required: true }}
                                    name="name"
                                    label="Menu Name"
                                />
                                <SingleItemDropdown
                                    rules={{ required: true }}
                                    name="type"
                                    label="Menu Type"
                                    choices={menuTypes}
                                />
                            </FieldsRow>
                            <FieldsRow>
                                <FileInput
                                    rules={{ required: false }}
                                    name="image"
                                    label="Menu Image"
                                    icon={<AttachFileIcon />}
                                />
                            </FieldsRow>
                        </FieldsColumn>
                    </Grid>
                    <Grid xs={3}>
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
                                    width: "11rem",
                                    objectFit: "cover",
                                    borderRadius: "4px",
                                }}
                                alt="PreviewImage"
                                src={imgUrl ? imgUrl : ImagePlaceHolder}
                            />
                            <span>Menu Image Preview</span>
                        </div>
                    </Grid>
                </Grid>

                <HeadingTwo>Menu Details</HeadingTwo>
                <MenuSectionFieldsArray />
                <SubmitFormGroup
                    submitErrorText={`${
                        isCreate ? "Creation" : "Update"
                    } of menu is unsuccessful, please check your input`}
                    onSubmit={async (data) => {
                        try {
                            const res = isCreate
                                ? await createMenu(data)
                                : await updateMenu(data, data.id);
                            navigate("/my-menus", {
                                state: { success: res },
                            });
                        } catch (e) {
                            queueError(e, enqueueSnackbar);
                        }
                    }}
                />
            </FormProvider>
        </Fragment>
    );
};

export default CommonMenuForm;
