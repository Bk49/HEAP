import axios from "axios";
import Cookies from "js-cookie";

const authInstance = axios.create({
    baseURL: "http://localhost:8080/api/v1/auth",
    timeout: 10000,
    withCredentials: true,
});

const protectedInstance = axios.create({
    baseURL: "http://localhost:8080/api/v1/",
    timeout: 10000,
    withCredentials: true,
    headers: {
        Authorization: Cookies.set("token"),
    },
});

export { authInstance, protectedInstance};
