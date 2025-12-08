import axios from "axios";

export default {

    sendPostUserRequest(user) {
        return axios.post('/user', user)
    },

}