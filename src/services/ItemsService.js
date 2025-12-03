import axios from "axios";

export default {
    sendGetItemsListRequest(userId) {
        return axios.get("/items",{
            params: {
                userId: userId
            }
        })
    }
}