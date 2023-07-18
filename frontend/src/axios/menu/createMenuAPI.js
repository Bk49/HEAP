import Cookies from "js-cookie";
import { protectedInstance as instance } from "../instance";

const createMenu = async (data) => {
    try {

        const result = await instance.post(
            `/user/createMenu`,
            {
                headers: { Authorization: `Bearer ${Cookies.get("token")}` },
                // headers: {
                //     Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ3ZXNseS5jaGF1LjIwMjJAc2Npcy5zbXUuZWR1LnNnIiwiaWF0IjoxNjg5Njc2Njc1LCJleHAiOjE2ODk3NjMwNzV9.CumZq1ro3gKYDf4LlmTfndQAFWsYogtzKrE0HSevPgs"}`,
                // },
            }
        );
        return result.data.response;
    } catch (e) {
        let msg = "";
        if (!e.response) {
            msg =
                "Create menu unsuccessful due to network error!\nPlease check your internet connection!";
        } else {
            const { error, message } = e.response.data;
            msg = error + "\n" + message;
        }

        throw msg;
    }
};

export default createMenu;
