// import axios from "axios";
//
// export default {
//
//     sendPostUserRequest(user) {
//         return axios.post('/user', user)
//     },
//
// }

import apiClient from "./apiClient";

export default {
    sendPostUserRequest(user) {
        return apiClient.post("/user", user);
    },
};