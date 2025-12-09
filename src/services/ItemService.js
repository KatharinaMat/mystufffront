import axios from "axios";

export default {

    sendPostItemRequest(userId, item) {
        return axios.post('/item', item, {
            params: {
                userId: userId
            }
        })
    },

    sendGetItemsRequest(userId) {
        return axios.get('/items', {
            params: {
                userId: userId
            }
        })
    },

    sendGetItemRequest(itemId) {
        return axios.get('/item', {
            params: {
                itemId: itemId
            }
        })
    }
}