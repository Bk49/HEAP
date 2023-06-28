import { authInstance as instance } from "../instance";

const register = async (data) => {
    try {
        const result = await instance.post(`/register`, data);
        return result.data.token;
    } catch (e) {
        let msg = "";
        if (!e.response) {
            msg =
                "Registration unsuccessful due to network error!\nPlease check your internet connection!";
        } else {
            msg = "An unknown error has occured";
        }

        throw msg;
    }
};

export default register;
