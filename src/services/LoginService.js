// import axios from "axios";
//
// export default {
//
//     sendGetLoginRequest(username, password) {
//         return axios.get("/login", {
//             params: {
//                 username: username,
//                 password: password
//             }
//         })
//     },
//
//
// }

import apiClient from "../apiClient";

export default {
    sendGetLoginRequest(username, password) {
        return apiClient.get("/login", {
            params: {
                username,
                password
            }
        });
    },
};