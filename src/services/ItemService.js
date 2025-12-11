// import axios from "axios";
//
// export default {
//
//     sendPostItemRequest(userId, item) {
//         return axios.post('/item', item, {
//             params: {
//                 userId: userId
//             }
//         })
//     },
//
//     sendGetItemsRequest(userId) {
//         return axios.get('/items', {
//             params: {
//                 userId: userId
//             }
//         })
//     },
//
//     sendGetItemRequest(itemId) {
//         return axios.get('/item', {
//             params: {
//                 itemId: itemId
//             }
//         })
//     },
//     sendPutItemRequest(itemId, item) {
//         return axios.put('/item', item, {
//             params: {
//                 itemId: itemId
//             }
//         })
//     },
//
//     sendDeleteItem(itemId) {
//         return axios.delete('/item', {
//             params: {
//                 itemId: itemId
//             }
//         })
//     },
//
//     sendDeleteItemImageRequest(itemId, imageId) {
//         return axios.delete(`/${itemId}/images/${imageId}`);
//     },
//
// }

import apiClient from "../apiClient";

export default {

    sendPostItemRequest(userId, item) {
        return apiClient.post("/item", item, {
            params: { userId },
        });
    },

    sendGetItemsRequest(userId) {
        return apiClient.get("/items", {
            params: { userId },
        });
    },

    sendGetItemRequest(itemId) {
        return apiClient.get("/item", {
            params: { itemId },
        });
    },

    sendPutItemRequest(itemId, item) {
        return apiClient.put("/item", item, {
            params: { itemId },
        });
    },

    sendDeleteItem(itemId) {
        return apiClient.delete("/item", {
            params: { itemId },
        });
    },

    sendDeleteItemImageRequest(itemId, imageId) {
        return apiClient.delete(`/${itemId}/images/${imageId}`);
    },

};