import { Fragment } from "react";
import FieldsColumn from "../common/form/FieldsColumn";
import HeadingTwo from "../common/heading/HeadingTwo";
import FieldsRow from "../common/form/FieldsRow";
import TextField from "../common/form/TextField";
import SingleItemDropdown from "../common/form/SingleItemDropdown";
import { FormProvider, useForm } from "react-hook-form";
import MenuSectionFieldsArray from "./datarow/MenuSectionFieldsArray";
import SubmitFormGroup from "../common/form/SubmitFormGroup";
import { menuTypes } from "../../constants/dropdown-choices";

const CommonMenuForm = ({ isCreate = false }) => {
    const formMethods = useForm();

    return (
        <Fragment>
            <FormProvider {...formMethods}>
                <HeadingTwo>Menu Information</HeadingTwo>
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
                </FieldsColumn>
                <HeadingTwo>Menu Details</HeadingTwo>
                <MenuSectionFieldsArray />
                <SubmitFormGroup
                    submitErrorText={`${
                        isCreate ? "Creation" : "Update"
                    } of menu is unsuccessful, please check your input`}
                />
            </FormProvider>
        </Fragment>
    );
};

export default CommonMenuForm;
