import axios from "axios";

const generalConfig = {
    baseURL: "http://localhost:8080/",
    timeout: 1000,
};

const publicInstance = axios.create(...generalConfig);

const protectedInstance = axios.create({
    ...generalConfig,
    headers: {
        "Authorization":"token here"
    }
});

export { publicInstance, protectedInstance };
