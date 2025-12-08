import axios from "axios";

export default {

    sendPostItemRequest(item) {
        const userId = Number(sessionStorage.getItem("userId"))
        const dto = {
            userId: userId,
            itemName: item.itemName,
            itemDate: item.itemDate,
            model: item.model,
            comment: item.comment,
            imageData: item.imageData
        };
       return axios.post("/item", dto)
    },

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