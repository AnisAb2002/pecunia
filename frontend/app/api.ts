import axios from "axios";

const api = axios.create({
    baseURL : process.env.local.NEXT_PUBLIC_API_URL + "api/"
})

export default api;
