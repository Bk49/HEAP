import { authInstance as instance } from "../instance";

const register = async (data) => {
    try {
        const result = await instance.post(`/register`, data);
        return result.data;
    } catch (e) {
        let msg = "";
        if (!e.response) {
            msg =
                "Registration unsuccessful due to network error!\nPlease check your internet connection!";
        } else {
            const { error, message } = e.response.data;
            msg = error + "\n" + message;
        }

        throw msg;
    }
};

export default register;
