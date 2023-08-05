import Cookies from "js-cookie";
import { protectedInstance as instance } from "../instance";

const getAllBusiness = async ({
    sortBy = "default",
    order: direction = "descending",
}) => {
    try {
        const result = await instance.get(
            `/user/findAllBGP?sortBy=${sortBy}&direction=${direction}`,
            {
                headers: { Authorization: `Bearer ${Cookies.get("token")}` },
            }
        );

        return result.data;
    } catch (e) {
        let msg = "";
        if (!e.response) {
            msg =
                "Retrieving business growth plans unsuccessful due to network error!\nPlease check your internet connection!";
        } else {
            const { error, message } = e.response.data;
            msg = error + "\n" + message;
        }

        throw msg;
    }
};

export default getAllBusiness;
