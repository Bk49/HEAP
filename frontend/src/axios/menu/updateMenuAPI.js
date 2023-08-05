import Cookies from "js-cookie";
import { protectedInstance as instance } from "../instance";
import handleImageUpload from "../../functions/uploadImage";

const updateMenu = async (data, menuId) => {
    try {
        const { image, ...other } = data;
        const imgUrl = await handleImageUpload(
            image,
            `menu/${other.name}/menu_image${Date.now()}`
        );

        const result = await instance.put(
            `/user/updateMenu/${menuId}`,
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
                "Update menu unsuccessful due to network error!\nPlease check your internet connection!";
        } else {
            const { error, message } = e.response.data;
            msg = error + "\n" + message;
        }

        throw msg;
    }
};

export default updateMenu;
