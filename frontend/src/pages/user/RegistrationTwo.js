import HeadingOne from "../../components/common/heading/HeadingOne";
import RegisterIllustration from "../../assets/illustrations/user/registration-illustration-2.jpg";
import { Fragment, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import TextField from "../../components/common/form/TextField";
import HeadingTwo from "../../components/common/heading/HeadingTwo";
import { businessType, cuisineType } from "../../constants/dropdown-choices";
import Checkbox from "../../components/common/form/Checkbox";
import FieldsColumn from "../../components/common/form/FieldsColumn";
import TextArea from "../../components/common/form/TextArea";
import SingleItemDropdown from "../../components/common/form/SingleItemDropdown";
import SubmitFormGroup from "../../components/common/form/SubmitFormGroup";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import MultiItemDropdown from "../../components/common/form/MultiItemDropdown";

const RegistrationTwo = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const formMethods = useForm();
    const { setValue } = formMethods;

    useEffect(() => {
        if (!location.state) {
            return navigate("register", { state: { error: "No state" } });
        }
        const { email, password } = location.state;
        console.log(email, password);
        setValue("email", email);
        setValue("password", password);
    }, [location.state, setValue, navigate]);

    return (
        <Fragment>
            <HeadingOne divider={true}>Register: Business Details</HeadingOne>
            <FormProvider {...formMethods}>
                <Grid container spacing={2}>
                    <Grid xs={6}>
                        <HeadingTwo>Basic Details</HeadingTwo>
                        <FieldsColumn>
                            <TextField
                                rules={{ required: true }}
                                name="businessName"
                                label="Name of F&B Business"
                                size="large"
                            />
                            <TextArea
                                rules={{ required: true }}
                                name="storeAddress"
                                label="Store Address"
                            />
                            <TextField
                                rules={{ required: true }}
                                name="postalCode"
                                label="Postal Code"
                                type="number"
                                size="large"
                            />
                        </FieldsColumn>
                        <HeadingTwo>Cuisine Choices</HeadingTwo>
                        <FieldsColumn>
                            <SingleItemDropdown
                                name="businessType"
                                rules={{ required: true }}
                                label="Type of F&B Business"
                                size="large"
                                choices={businessType}
                            />
                            <MultiItemDropdown
                                name="cusineType"
                                rules={{ required: true }}
                                label="Type of Cuisine"
                                size="large"
                                choices={cuisineType}
                            />
                            <Checkbox name="isFusion" label="Fusion Cuisine?" />
                        </FieldsColumn>
                    </Grid>
                    <Grid xs={6}>
                        <img
                            style={{ width: "100%" }}
                            src={RegisterIllustration}
                            alt="Register Illustration"
                        />
                    </Grid>
                </Grid>
                <SubmitFormGroup
                    submitErrorText="Registration unsuccessful, please check your input"
                    onSubmit={(data) => console.log(data)}
                    submitText="Register Now"
                />
            </FormProvider>
        </Fragment>
    );
};

export default RegistrationTwo;
