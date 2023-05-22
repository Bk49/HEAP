import RegistrationIllustration from "../../assets/illustrations/user/registration-illustration-1.jpg";
import Paper from "@mui/material/Paper";
import AppLogo from "../../assets/logo/app-logo-blue.png";
import PersonIcon from "@mui/icons-material/Person";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import HeadingOne from "../../components/common/heading/HeadingOne";
import TextField from "../../components/common/form/TextField";
import BigButton from "../../components/common/button/BigButton";

const RegistrationOne = () => {
    return (
        <div
            style={{
                height: "85vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    width: "86vw",
                    height: "90vh",
                    display: "flex",
                    flexDirection: "row",
                    borderRadius: "20px",
                }}
            >
                <img
                    src={RegistrationIllustration}
                    alt="Registration Illustration"
                    style={{
                        height: "100%",
                        borderRadius: "20px 0 0 20px",
                        aspectRatio: "1",
                    }}
                />
                <div
                    style={{
                        margin: "1.5%",
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "1rem",
                    }}
                >
                    <HeadingOne>Registration</HeadingOne>
                    <img
                        style={{ width: "9rem", height: "9rem" }}
                        src={AppLogo}
                        alt="App Logo"
                    />
                    <div style={{
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "0.5rem",
                    }}>
                        <TextField label="Email" icon={<PersonIcon />} />
                        <TextField
                            label="Password"
                            type="password"
                            icon={<VpnKeyIcon />}
                        />
                        <TextField
                            label="Confirm Password"
                            type="password"
                            icon={<VpnKeyIcon />}
                        />
                    </div>
                    <BigButton>Next: Business Details</BigButton>
                    <Divider sx={{ width: "20rem" }} />
                    <div
                        style={{
                            height: "100%",
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Typography fontSize="0.8rem" fontWeight={600}>
                            Already A Member?
                        </Typography>
                        <BigButton isPrimary={false}>Login</BigButton>
                    </div>
                </div>
            </Paper>
        </div>
    );
};

export default RegistrationOne;
