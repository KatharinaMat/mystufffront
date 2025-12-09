import axios from "axios";

export default {

    sendGetQrCodeRequest(itemId) {
        return axios.get('/qr-code', {
            params: {
                itemId: itemId
            }
        })
    },

}