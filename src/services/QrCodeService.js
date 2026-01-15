// import axios from "axios";
//
// export default {
//
//     sendGetQrCodeRequest(itemId) {
//         return axios.get('/qr-code', {
//             params: {
//                 itemId: itemId
//             }
//         })
//     },
// }

import apiClient from "./apiClient";

export default {
    sendGetQrCodeRequest(itemId) {
        return apiClient.get("/qr-code", {
            params: {
                itemId,
            },
        });
    },
};