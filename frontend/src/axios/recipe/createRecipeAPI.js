import Cookies from "js-cookie";
import { protectedInstance as instance } from "../instance";
import handleImageUpload from "../../functions/uploadImage";

const createRecipe = async (data) => {
    try {
        const { image, ...other } = data;
        const { Location } = await handleImageUpload(
            image,
            `recipe/${other.name}/recipe_image${Date.now()}`
        );

        const result = await instance.post(
            `/user/createRecipe`,
            { ...other, image: Location },
            {
                headers: { Authorization: `Bearer ${Cookies.get("token")}` },
                // headers: {
                //     Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlcmljbmd5b25nd2VpQGdtYWlsLmNvbSIsImlhdCI6MTY4OTA0MDQyMSwiZXhwIjoxNjg5MTI2ODIxfQ.dq4Xgx8AColJm86n4vJPOvzhVQs221XxoaHvbW74q1w"}`,
                // },
            }
        );
        return result.data.response;
    } catch (e) {
        let msg = "";
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
