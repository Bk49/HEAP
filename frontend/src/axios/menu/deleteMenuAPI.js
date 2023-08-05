import Cookies from "js-cookie";
import { protectedInstance as instance } from "../instance";

const deleteMenu = async (menuId) => {
    try {
        const result = await instance.delete(`/user/deleteMenu/${menuId}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
        });
        return result.data.response;
    } catch (e) {
        let msg = "";
        if (!e.response) {
            msg =
                "Delete menu unsuccessful due to network error!\nPlease check your internet connection!";
        } else {
            const { error, message } = e.response.data;
            msg = error + "\n" + message;
        }

        throw msg;
    }
};

export default deleteMenu;
