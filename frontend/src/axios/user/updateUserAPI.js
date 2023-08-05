import Cookies from "js-cookie";
import { protectedInstance as instance } from "../instance";

const updateUser = async (data) => {
    try {
        const result = await instance.put(`/user/update`, data, {
            headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        });
        return result.data.response;
    } catch (e) {
        let msg = "";
        if (!e.response) {
            msg =
                "Update user unsuccessful due to network error!\nPlease check your internet connection!";
        } else {
            const { error, message } = e.response.data;
            msg = error + "\n" + message;
        }

        throw msg;
    }
};

export default updateUser;
