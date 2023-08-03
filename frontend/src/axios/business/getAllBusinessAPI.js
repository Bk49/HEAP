import Cookies from "js-cookie";
import { protectedInstance as instance } from "../instance";

const getAllBusiness = async ({ sortBy, direction = "descending" }) => {
    try {
        const result = await instance.get(
            `/user/findAllBGP?sortBy=${sortBy}&direction=${direction}`,
            {
                headers: { Authorization: `Bearer ${Cookies.get("token")}` },
                // headers: {
                //     Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlcmljbmd5b25nd2VpQGdtYWlsLmNvbSIsImlhdCI6MTY4OTA0MDQyMSwiZXhwIjoxNjg5MTI2ODIxfQ.dq4Xgx8AColJm86n4vJPOvzhVQs221XxoaHvbW74q1w"}`,
                // },
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
