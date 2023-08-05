import Cookies from "js-cookie";
import { protectedInstance as instance } from "../instance";

const getAllRecipes = async () => {
    try {
        const result = await instance.get(`/user/findAllRecipe`, {
            headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        });

        return result.data;
    } catch (e) {
        let msg = "";
        if (!e.response) {
            msg =
                "Retrieving recipes unsuccessful due to network error!\nPlease check your internet connection!";
        } else {
            const { error, message } = e.response.data;
            msg = error + "\n" + message;
        }

        throw msg;
    }
};

export default getAllRecipes;
