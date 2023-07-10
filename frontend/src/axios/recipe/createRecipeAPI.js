import Cookies from "js-cookie";
import { protectedInstance as instance } from "../instance";

const createRecipe = async (data) => {
    const processData = {...data, image: ""}
    try {
        const result = await instance.post(`/user/createRecipe`, processData, {
            headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        });
        return result.data;
    } catch (e) {
        let msg = "";
        console.log(e);
        if (!e.response) {
            msg =
                "Create recipe unsuccessful due to network error!\nPlease check your internet connection!";
        } else {
            const { error, message } = e.response.data;
            msg = error + "\n" + message;
        }

        throw msg;
    }
};

export default createRecipe;
