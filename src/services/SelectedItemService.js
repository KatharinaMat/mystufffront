import axios from "axios";

export default {
    sendGetItemRequest(itemId) {
        return axios.get("/item", {
            params: {
                itemId: itemId
            }
        })
    }
}