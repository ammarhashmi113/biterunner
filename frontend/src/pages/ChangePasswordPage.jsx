import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
    ShieldCheck,
    Lock,
    KeyRound,
    Repeat,
    Save,
    Loader2,
} from "lucide-react";

import api from "../utils/axiosConfig";
import { usePageTitle } from "../utils/usePageTitle";

const ChangePasswordPage = () => {
    usePageTitle("Change Password");

    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { oldPassword, newPassword, confirmPassword } = formData;

        if (!oldPassword || !newPassword || !confirmPassword) {
            return toast.error("Please fill in all fields.");
        }

        if (newPassword !== confirmPassword) {
            return toast.error("New passwords do not match.");
        }

        try {
            setLoading(true);
            await api.post("/auth/change-password", {
                oldPassword,
                newPassword,
            });
            toast.success("Password changed successfully.");
            navigate("/profile");
        } catch (err) {
            toast.error(
                err.response?.data?.error || "Failed to change password."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto px-4 py-10">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                <ShieldCheck size={26} />
                Change Password
            </h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow p-6 rounded-xl space-y-4"
            >
                {/* Old Password */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-1">
                        <Lock size={14} />
                        Old Password
                    </label>
                    <input
                        type="password"
                        name="oldPassword"
                        value={formData.oldPassword}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded-md"
                        required
                    />
                </div>

                {/* New Password */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-1">
                        <KeyRound size={14} />
                        New Password
                    </label>
                    <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded-md"
                        required
                    />
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-1">
                        <Repeat size={14} />
                        Confirm New Password
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border rounded-md"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 flex justify-center items-center gap-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <Loader2 size={16} className="animate-spin" />
                    ) : (
                        <Save size={16} />
                    )}
                    {loading ? "Updating..." : "Change Password"}
                </button>
            </form>
        </div>
    );
};

export default ChangePasswordPage;
