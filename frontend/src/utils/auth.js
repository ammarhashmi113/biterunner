// utils/auth.js
import api from "./axiosConfig";

export const loginUser = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    return res.data.token;
};

export const registerUser = async (userData) => {
    const res = await api.post("/auth/register", userData);
    localStorage.setItem("token", res.data.token);
    return res.data.token;
};

export const fetchCurrentUser = async () => {
    const res = await api.get("/auth/me");
    return res.data.user;
};

export const logoutUser = () => {
    localStorage.removeItem("token");
};
