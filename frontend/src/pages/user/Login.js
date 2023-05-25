import Paper from "@mui/material/Paper";
import LoginIllustration from "../../assets/illustrations/user/login-illustration.jpg";
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
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const formMethods = useForm();
    const {
        handleSubmit,
        formState: { errors },
    } = formMethods;
    const { enqueueSnackbar } = useSnackbar();

    return (
        <div
            style={{
                height: "85vh",
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
                        height: "90vh",
                        display: "flex",
                        flexDirection: "row",
                        borderRadius: "20px",
                    }}
                >
                    <img
                        src={LoginIllustration}
                        alt="Login Illustration"
                        style={{
                            height: "100%",
                            borderRadius: "20px 0 0 20px",
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
                        <HeadingOne>Login</HeadingOne>
                        <img
                            style={{ width: "9rem", height: "9rem" }}
                            src={AppLogo}
                            alt="App Logo"
                        />
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
                        <div style={{ height: "1rem" }} />
                        <BigButton
                            onClick={() => {
                                if (errors && Object.keys(errors).length > 0) {
                                    enqueueSnackbar(
                                        "Login unsuccessful, please check your input\n",
                                        {
                                            variant: "customError",
                                        }
                                    );
                                } else {
                                    handleSubmit((data) => {
                                        console.log(data);
                                    })();
                                }
                            }}
                        >
                            Login
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
                                Not A Member Yet?
                            </Typography>
                            <BigButton
                                onClick={() => navigate("/register")}
                                isPrimary={false}
                            >
                                Register
                            </BigButton>
                        </div>
                    </div>
                </Paper>
            </FormProvider>
        </div>
    );
};

export default Login;
