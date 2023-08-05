import Cookies from "js-cookie";
import { protectedInstance as instance } from "../instance";

const getUser = async () => {
    try {
        const result = await instance.get(`/user/findUser`, {
            headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        });

        return result.data;
    } catch (e) {
        let msg = "";
        if (!e.response) {
            msg =
                "Get user unsuccessful due to network error!\nPlease check your internet connection!";
        } else {
            const { error, message } = e.response.data;
            msg = error + "\n" + message;
        }

        throw msg;
    }
};

export default getUser;
