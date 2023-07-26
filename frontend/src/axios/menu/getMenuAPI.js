import Cookies from "js-cookie";
import { protectedInstance as instance } from "../instance";

const getMenu = async ({ params: { id } }) => {
    try {
        const result = await instance.get(`/user/findMenu/${id}`, {
            headers: { Authorization: `Bearer ${Cookies.get("token")}` },
            // headers: {
            //     Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlcmljbmd5b25nd2VpMkBnbWFpbC5jb20iLCJpYXQiOjE2ODk5Mjg2NjAsImV4cCI6MTY5MDAxNTA2MH0.LKRKFJgf10iAWp4kdqO_VI-_xunsID94DQuTUn_AggU"}`,
            // },
        });
        return result.data;
    } catch (e) {
        let msg = "";
        console.log(e);
        if (!e.response) {
            msg =
                "Get menu unsuccessful due to network error!\nPlease check your internet connection!";
        } else {
            const { error, message } = e.response.data;
            msg = error + "\n" + message;
        }

        throw msg;
    }
};

export default getMenu;
