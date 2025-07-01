import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/axiosConfig";
import toast from "react-hot-toast";

import {
    UserCircle,
    BadgeCheck,
    Mail,
    Phone,
    Pencil,
    Save,
    XCircle,
    KeyRound,
    Loader2,
} from "lucide-react";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({ username: "", phoneNumber: "" });
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get("/auth/me");
                setUser(res.data.user);
                setFormData({
                    username: res.data.user.username,
                    phoneNumber: res.data.user.phoneNumber || "",
                });
            } catch (err) {
                toast.error("Failed to load profile.");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleUpdate = async () => {
        try {
            const res = await api.patch("/auth/me", formData);
            setUser(res.data.user);
            toast.success("Profile updated!");
            setEditing(false);
        } catch (err) {
            const msg = err.response?.data?.message || "Update failed.";
            toast.error(msg);
        }
    };

    if (loading)
        return (
            <div className="text-center py-10 mx-auto w-fit mt-35">
                <Loader2
                    size={18}
                    className="animate-spin mx-auto w-fit text-blue-500"
                />
                <p>Loading Details</p>
            </div>
        );
    if (!user)
        return (
            <div className="text-center py-10 text-red-500">
                User not found.
            </div>
        );

    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                <UserCircle size={28} />
                My Profile
            </h1>

            <div className="bg-white shadow rounded-xl p-6 space-y-4">
                {/* Username */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-1">
                        <BadgeCheck size={14} />
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        disabled={!editing}
                        className={`w-full mt-1 p-2 rounded-md ${
                            editing
                                ? "border"
                                : "bg-gray-100 cursor-not-allowed"
                        }`}
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-1">
                        <Mail size={14} />
                        Email
                    </label>
                    <input
                        type="email"
                        value={user.email}
                        disabled
                        className="w-full mt-1 p-2 rounded-md bg-gray-100 cursor-not-allowed bg-gray-100"
                    />
                </div>

                {/* Phone Number */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-1">
                        <Phone size={14} />
                        Phone Number
                    </label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        disabled={!editing}
                        placeholder="03XXXXXXXXX"
                        className={`w-full mt-1 p-2 rounded-md  ${
                            editing
                                ? "border"
                                : "bg-gray-100 cursor-not-allowed"
                        }`}
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center pt-4 mt-4">
                    {!editing ? (
                        <>
                            <button
                                onClick={() => setEditing(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-4xl hover:bg-blue-700 cursor-pointer"
                            >
                                <Pencil size={16} />
                                Edit Profile
                            </button>
                            <button
                                onClick={() => navigate("/change-password")}
                                className="flex items-center gap-1 text-sm text-blue-600 hover:underline cursor-pointer"
                            >
                                <KeyRound size={16} />
                                Change Password
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handleUpdate}
                                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-4xl hover:bg-green-700 cursor-pointer"
                            >
                                <Save size={16} />
                                Save Changes
                            </button>
                            <button
                                onClick={() => {
                                    setEditing(false);
                                    setFormData({
                                        username: user.username,
                                        phoneNumber: user.phoneNumber || "",
                                    });
                                }}
                                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-4xl hover:bg-gray-100 cursor-pointer"
                            >
                                <XCircle size={16} />
                                Cancel
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
