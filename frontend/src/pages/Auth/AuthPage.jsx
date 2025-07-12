import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import api from "../../utils/axiosConfig";
import { useUser } from "../../contexts/userContext";
import { usePageTitle } from "../../utils/usePageTitle";

import AuthForm from "./AuthForm";

const AuthPage = ({ modeType }) => {
    usePageTitle(modeType === "login" ? "Login" : "Register");

    const navigate = useNavigate();
    const { setUser } = useUser();

    const [formMode, setFormMode] = useState(modeType); // 'login' or 'register'
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
    });

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const toggleMode = () => {
        const newMode = formMode === "login" ? "register" : "login";
        setFormMode(newMode);
        navigate(`/${newMode}`, { replace: true }); // updates URL
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (
                formMode === "register" &&
                form.password !== form.confirmPassword
            ) {
                toast.error("Passwords do not match");
                setLoading(false);
                return;
            }

            const payload =
                formMode === "login"
                    ? { email: form.email, password: form.password }
                    : {
                          username: form.username,
                          email: form.email,
                          password: form.password,
                          phoneNumber: form.phoneNumber,
                      };

            const endpoint =
                formMode === "login" ? "/auth/login" : "/auth/register";

            const res = await api.post(endpoint, payload);
            localStorage.setItem("token", res.data.token);

            const me = await api.get("/auth/me");
            setUser(me.data.user);

            toast.success(
                formMode === "login"
                    ? `Welcome back, ${me.data.user.username}`
                    : `Welcome, ${me.data.user.username}`
            );

            navigate("/menu");
        } catch (err) {
            toast.error(err.response?.data?.error || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    // Update form mode when the route changes between /login and /register
    useEffect(() => {
        setFormMode(modeType);
    }, [modeType]);

    return (
        <AuthForm
            mode={formMode}
            form={form}
            onChange={handleChange}
            onSubmit={handleSubmit}
            loading={loading}
            toggleMode={toggleMode}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showConfirmPassword={showConfirmPassword}
            setShowConfirmPassword={setShowConfirmPassword}
        />
    );
};

export default AuthPage;
