import Cookies from "js-cookie";
import { protectedInstance as instance } from "../instance";

const deleteRecipe = async (id) => {
    try {
        const result = await instance.delete(`/user/deleteRecipe/${id}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
        });
        return result.data.response;
    } catch (e) {
        let msg = "";
        if (!e.response) {
            msg =
                "Delete recipe unsuccessful due to network error!\nPlease check your internet connection!";
        } else {
            const { error, message } = e.response.data;
            msg = error + "\n" + message;
        }

        throw msg;
    }
};

export default deleteRecipe;
