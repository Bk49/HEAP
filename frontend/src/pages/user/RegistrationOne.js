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
import { useForm, FormProvider } from "react-hook-form";
import { useSnackbar } from "notistack";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { enqueueError, queueError } from "../../functions/formHandling";

const RegistrationOne = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const formMethods = useForm();
    const [update, setUpdate] = useState(0);
    const {
        handleSubmit,
        setError,
        formState: { errors },
    } = formMethods;
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (location && location.state) {
            const { error } = location.state;
            if (error && error === "No state") {
                console.log("Hello, here is the error => ", error);
                queueError(
                    "You have yet to fill your email and password for registration!",
                    enqueueSnackbar
                );
            }
        }
    }, [location, enqueueSnackbar]);

    useEffect(() => {
        enqueueError(
            "Registration unsuccessful, please check your input",
            errors,
            enqueueSnackbar
        );
    }, [enqueueSnackbar, errors, update]);

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <FormProvider {...formMethods}>
                <Paper
                    elevation={4}
                    sx={{
                        width: "86vw",
                        height: "100vh",
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
                        <div
                            style={{
                                height: "100%",
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "0.5rem",
                            }}
                        >
                            <TextField
                                rules={{
                                    required: true,
                                    pattern:
                                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                }}
                                name="email"
                                label="Email"
                                icon={<PersonIcon />}
                            />
                            <TextField
                                rules={{ required: true, minLength: 8 }}
                                name="password"
                                label="Password"
                                type="password"
                                icon={<VpnKeyIcon />}
                            />
                            <TextField
                                rules={{ required: true, minLength: 8 }}
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                icon={<VpnKeyIcon />}
                            />
                        </div>
                        <BigButton
                            onClick={() => {
                                handleSubmit((data) => {
                                    const { password, confirmPassword, email } =
                                        data;
                                    if (password !== confirmPassword) {
                                        return setError("confirmPassword", {
                                            type: "400",
                                            message:
                                                "Confirm password does not match Password",
                                        });
                                    }
                                    navigate("/register-2", {
                                        state: {
                                            password: password,
                                            email: email,
                                        },
                                    });
                                })();
                                setUpdate((prev) => prev + 1);
                            }}
                        >
                            Next: Business Details
                        </BigButton>
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
                            <BigButton
                                onClick={() => navigate("/login")}
                                isPrimary={false}
                            >
                                Login
                            </BigButton>
                        </div>
                    </div>
                </Paper>
            </FormProvider>
        </div>
    );
};

export default RegistrationOne;
