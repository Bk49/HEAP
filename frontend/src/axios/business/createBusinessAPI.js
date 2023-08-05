import Cookies from "js-cookie";
import { protectedInstance as instance } from "../instance";
import handleBusinessField from "../../functions/handleBusinessField";

const createBusiness = async (data) => {
    try {
        const payload = await handleBusinessField(data);
        const result = await instance.post(`/user/createBGP`, payload, {
            headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        });
        return result.data.response;
    } catch (e) {
        let msg = "";
        if (!e.response) {
            msg =
                "Create business growth plan unsuccessful due to network error!\nPlease check your internet connection!";
        } else {
            const { error, message } = e.response.data;
            msg = error + "\n" + message;
        }

        throw msg;
    }
};

export default createBusiness;
