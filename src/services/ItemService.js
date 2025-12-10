import axios from "axios";
import NavigationService from "@/services/NavigationService";

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
    },
    sendPutItemRequest(itemId, item) {
        return axios.put('/item', item,  {
            params: {
                itemId: itemId
            }
        })
    },

    sendDeleteItem(itemId) {
        return axios.delete('/item', {
            params: {
                itemId: itemId
            }
        })
    },

    sendDeleteItemImageRequest(itemId, imageId) {
        return axios.delete(`/${itemId}/images/${imageId}`);
    },

}