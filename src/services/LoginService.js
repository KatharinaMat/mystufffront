import axios from "axios";

export default {

    sendGetLoginRequest(username, password) {
        return axios.get("/login", {
            params: {
                username: username,
                password: password
            }
        })
    },


}