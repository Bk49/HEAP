import { authInstance as instance } from "../instance";

const login = async (data) => {
    try {
        const result = await instance.post(`/authenticate`, data);
        return result.data.token;
    } catch (e) {
        let msg = "";
        if (!e.response) {
            msg =
                "Login unsuccessful due to network error!\nPlease check your internet connection!";
        } else {
            msg = "An unknown error has occured";
        }

        throw msg;
    }
};

export default login;
