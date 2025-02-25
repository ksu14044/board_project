import axios from "axios";
import { GiToken } from "react-icons/gi";

export const api = axios.create({
    baseURL: "http://localhost:8080",
});

api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("AccessToken")}`; 
    return config;
});

export const setTokenLocalStorage = (name, token) => {
    if(!!token) {
        localStorage.setItem(name, token);
    } else {
        localStorage.removeItem(name);
    }
}