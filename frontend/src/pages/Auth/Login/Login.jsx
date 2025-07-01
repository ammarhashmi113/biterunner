import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../../utils/axiosConfig";
import { useUser } from "../../../contexts/userContext";
import { toast } from "react-hot-toast";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react"; // icons

const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useUser();

    const [form, setForm] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await api.post("/auth/login", form);
            localStorage.setItem("token", res.data.token);
            const me = await api.get("/auth/me");
            setUser(me.data.user);

            toast.success(`Welcome back, ${me.data.user.username}`);
            navigate("/menu");
        } catch (err) {
            toast.error(err.response?.data?.error || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                    <Mail
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                        size={18}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border pl-10 pr-3 py-2 rounded"
                        required
                    />
                </div>

                <div className="relative">
                    <Lock
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                        size={18}
                    />
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full border pl-10 pr-10 py-2 rounded"
                        required
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600"
                        tabIndex={-1}
                    >
                        {showPassword ? (
                            <Eye size={18} />
                        ) : (
                            <EyeOff size={18} />
                        )}
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex justify-center items-center gap-2 bg-red-500 text-white py-2 rounded transition cursor-pointer
        ${loading ? "opacity-60 cursor-not-allowed" : "hover:bg-red-600"}`}
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin" size={18} />
                            Logging in
                        </>
                    ) : (
                        "Login"
                    )}
                </button>
            </form>
            <p className="text-sm text-center mt-4 text-gray-500">
                Don’t have an account?{" "}
                <Link to="/register" className="text-blue-600 hover:underline">
                    Register
                </Link>
            </p>
        </div>
    );
};

export default Login;
