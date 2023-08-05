import Cookies from "js-cookie";
import { protectedInstance as instance } from "../instance";
import handleImageUpload from "../../functions/uploadImage";

const updateRecipe = async (data, id) => {
    const { image, ...other } = data;
    const imgUrl = await handleImageUpload(
        image,
        `recipe/${other.name}/recipe_image${Date.now()}`
    );
    try {
        const result = await instance.put(
            `/user/updateRecipe/${id}`,
            { ...other, image: imgUrl },
            {
                headers: { Authorization: `Bearer ${Cookies.get("token")}` },
            }
        );
        return result.data.response;
    } catch (e) {
        let msg = "";
        if (!e.response) {
            msg =
                "Update recipe unsuccessful due to network error!\nPlease check your internet connection!";
        } else {
            const { error, message } = e.response.data;
            msg = error + "\n" + message;
        }

        throw msg;
    }
};

export default updateRecipe;
