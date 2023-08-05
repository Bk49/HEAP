import Cookies from "js-cookie";
import { protectedInstance as instance } from "../instance";

const deleteMenu = async (menuId) => {
    try {
        const result = await instance.delete(`/user/deleteMenu/${menuId}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
                // Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ3ZXNseS5jaGF1LjIwMjJAc2Npcy5zbXUuZWR1LnNnIiwiaWF0IjoxNjg5MDU1NzM0LCJleHAiOjE2ODkxNDIxMzR9.ClN--RPNaPaUdonEGwRUsLm1dx1Xw-1atn5c4b1cjqw"}`,
            },
        });
        return result.data.response;
    } catch (e) {
        let msg = "";
        if (!e.response) {
            msg =
                "Delete menu unsuccessful due to network error!\nPlease check your internet connection!";
        } else {
            const { error, message } = e.response.data;
            msg = error + "\n" + message;
        }

        throw msg;
    }
};

export default deleteMenu;
