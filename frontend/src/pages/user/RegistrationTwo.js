import HeadingOne from "../../components/common/heading/HeadingOne";
import RegisterIllustration from "../../assets/illustrations/user/registration-illustration-2.jpg";
import { Fragment } from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import TextField from "../../components/common/form/TextField";
import MUITextField from "@mui/material/TextField";
import HeadingTwo from "../../components/common/heading/HeadingTwo";
import Select from "@mui/material/Select";
import { businessType, cuisineType } from "../../constants/dropdown-choices";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Checkbox from "../../components/common/form/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import FieldsColumn from "../../components/common/form/FieldsColumn";
import TextArea from "../../components/common/form/TextArea";
import SingleItemDropdown from "../../components/common/form/SingleItemDropdown";
import SubmitFormGroup from "../../components/common/form/SubmitFormGroup";
import SmallButton from "../../components/common/button/SmallButton";

const RegistrationTwo = () => {
    return (
        <Fragment>
            <HeadingOne divider={true}>Register: Business Details</HeadingOne>
            <Grid container spacing={2}>
                <Grid xs={6}>
                    <HeadingTwo>Basic Details</HeadingTwo>
                    <FieldsColumn>
                        <TextField label="Name of F&B Business" size="large" />
                        <TextArea label="Store Address" />
                        <TextField label="Postal Code" size="large" />
                    </FieldsColumn>
                    <HeadingTwo>Cuisine Choices</HeadingTwo>
                    <FieldsColumn>
                        <SingleItemDropdown
                            label="Type of F&B Business"
                            size="large"
                            choices={businessType}
                        />
                        {/* <FormControl variant="filled" sx={{ width: "40rem" }}>
                        <InputLabel>Type of Cuisine</InputLabel>
                        <Select multiple>
                            {cuisineType.map(({ text, value }) => (
                                <MenuItem key={text} value={value}>
                                    {text}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl> */}
                        <Checkbox label="Fusion Cuisine?" />
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
            <SubmitFormGroup submitText="Register Now"/>
        </Fragment>
    );
};

export default RegistrationTwo;
