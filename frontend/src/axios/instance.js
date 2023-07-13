import axios from "axios";
import Cookies from "js-cookie";

const serverLocation =
    process.env.NODE_ENV === "development"
        ? "http://localhost:8080"
        : "https://heap-springboot-app.onrender.com";

const authInstance = axios.create({
    baseURL: `${serverLocation}/api/v1/auth`,
    timeout: 10000,
    withCredentials: true,
});

const protectedInstance = axios.create({
    baseURL: `${serverLocation}/api/v1/`,
    timeout: 10000,
    withCredentials: true,
    headers: {
        Authorization: Cookies.set("token"),
    },
});

export { authInstance, protectedInstance };
