import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://mystuff-backend.onrender.com",  // your Render backend
    // optional:
    // withCredentials: false,
});

export default apiClient;