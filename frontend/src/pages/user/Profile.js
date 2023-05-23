import { Fragment } from "react";
import HeadingOne from "../../components/common/heading/HeadingOne";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import HeadingTwo from "../../components/common/heading/HeadingTwo";
import ProfileIllustration from "../../assets/illustrations/user/profile-illustration.jpg";
import FieldsColumn from "../../components/common/form/FieldsColumn";
import TextField from "../../components/common/form/TextField";
import PersonIcon from "@mui/icons-material/Person";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import SubmitFormGroup from "../../components/common/form/SubmitFormGroup";
import FieldsRow from "../../components/common/form/FieldsRow";
import TextArea from "../../components/common/form/TextArea";
import SingleItemDropdown from "../../components/common/form/SingleItemDropdown";
import { businessType, cuisineType } from "../../constants/dropdown-choices";
import Checkbox from "../../components/common/form/Checkbox";

const Profile = () => {
    return (
        <Fragment>
            <HeadingOne divider={true}>My Profile</HeadingOne>
            <Grid container spacing={2}>
                <Grid xs={6}>
                    <HeadingTwo>User Profile</HeadingTwo>
                    <FieldsColumn>
                        <TextField icon={<PersonIcon />} label="Email" />
                        <FieldsRow>
                            <TextField
                                icon={<VpnKeyIcon />}
                                label="Password"
                                type="password"
                            />
                            <TextField
                                icon={<VpnKeyIcon />}
                                label="Confirm Password"
                                type="password"
                            />
                        </FieldsRow>
                    </FieldsColumn>

                    <HeadingTwo>Business Details</HeadingTwo>
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
                        src={ProfileIllustration}
                        alt="Profile Illustration"
                    />
                </Grid>
            </Grid>
            <SubmitFormGroup submitText="Update Profile" />
        </Fragment>
    );
};

export default Profile;
