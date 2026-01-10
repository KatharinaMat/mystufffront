import axios from "axios";

export default {
    verifyQr(username, email, qrToken, website = "") {
        return axios.post("/api/support/verify-qr", {
            username,
            email,
            qrToken,
            website
        });
    },

    createSupportRequest(supportToken, message, website = "") {
        return axios.post("/api/support/request", {
            supportToken,
            message,
            website
        });
    }
};
