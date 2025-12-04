import axios from "axios";

export default {

    sendGetItemsRequest(userId) {
        return axios.get("/items",{
            params: {
                userId: userId
            }
        })
    },

    sendGetItemRequest(itemId) {
        return axios.get("/item", {
            params: {
                itemId: itemId
            }
        })
    }
}