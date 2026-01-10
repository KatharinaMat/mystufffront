import axios from "axios";

export default {
    login(username, password,website) {
        return axios.post("/api/auth/login", {
            username,
            password,
            website
        });
    }
}
