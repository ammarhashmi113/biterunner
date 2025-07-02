import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../../utils/axiosConfig";
import { useUser } from "../../../contexts/userContext";
import { toast } from "react-hot-toast";
import { Eye, EyeOff, Mail, Lock, User, Phone, Loader2 } from "lucide-react"; // icons

const Register = () => {
    const navigate = useNavigate();
    const { setUser } = useUser();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (form.password !== form.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const { confirmPassword, ...formData } = form;
            const res = await api.post("/auth/register", formData);
            localStorage.setItem("token", res.data.token);
            const me = await api.get("/auth/me");
            setUser(me.data.user);
            toast.success(`Welcome, ${me.data.user.username}`);
            navigate("/menu");
        } catch (err) {
            toast.error(err.response?.data?.error || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Register</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Username */}
                <div className="relative">
                    <User
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                        size={18}
                    />
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={handleChange}
                        className="w-full border pl-10 pr-3 py-2 rounded"
                        required
                    />
                </div>

                {/* Email */}
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

                {/* Password */}
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
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600"
                        tabIndex={-1}
                    >
                        <span className="cursor-pointer">
                            {showPassword ? (
                                <Eye size={18} />
                            ) : (
                                <EyeOff size={18} />
                            )}
                        </span>
                    </button>
                </div>

                {/* Confirm Password */}
                <div className="relative">
                    <Lock
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                        size={18}
                    />
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        className="w-full border pl-10 pr-10 py-2 rounded"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600"
                        tabIndex={-1}
                    >
                        <span className="cursor-pointer">
                            {showConfirmPassword ? (
                                <Eye size={18} />
                            ) : (
                                <EyeOff size={18} />
                            )}
                        </span>
                    </button>
                </div>

                {/* Phone Number */}
                <div className="relative">
                    <Phone
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                        size={18}
                    />
                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone Number (e.g. 03XXXXXXXXX)"
                        value={form.phoneNumber}
                        onChange={handleChange}
                        pattern="^03[0-9]{9}$"
                        className="w-full border pl-10 pr-3 py-2 rounded"
                        required
                    />
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
                            Registering
                        </>
                    ) : (
                        "Register"
                    )}
                </button>
            </form>
            <p className="text-sm text-center mt-4 text-gray-500">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:underline">
                    Login
                </Link>
            </p>
        </div>
    );
};

export default Register;
