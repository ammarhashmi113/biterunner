import { useEffect, useState } from "react";
import api from "../../utils/axiosConfig";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import {
    ClipboardList,
    Hash,
    Phone,
    Utensils,
    Wallet,
    Clock,
} from "lucide-react";

import MyOrdersCardSkeleton from "./MyOrdersCardSkeleton";

const statusLabels = {
    pending: "Pending",
    accepted: "Accepted",
    preparing: "Preparing",
    "out-for-delivery": "Out for Delivery",
    delivered: "Delivered",
    cancelled: "Cancelled",
};

const statusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    accepted: "bg-blue-100 text-blue-700",
    preparing: "bg-purple-100 text-purple-700",
    "out-for-delivery": "bg-orange-100 text-orange-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
};

const MyOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await api.get("/orders/my");
                setOrders(res.data.reverse()); // latest first
            } catch (err) {
                toast.error("Failed to fetch your orders.");
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const getOrderPrice = (order) =>
        order.items.reduce((sum, i) => sum + i.quantity * i.menuItem.price, 0);

    if (loading)
        return (
            <div className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                    <ClipboardList size={28} />
                    My Orders
                </h1>
                <div className="space-y-6">
                    {[...Array(3)].map((_, i) => (
                        <MyOrdersCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        );

    if (orders.length === 0)
        return (
            <div className="text-center py-10 text-gray-600">
                You haven't placed any orders yet.
            </div>
        );

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                <ClipboardList size={28} />
                My Orders
            </h1>

            <div className="space-y-6">
                {orders.map((order) => (
                    <Link
                        key={order._id}
                        to={`/orders/${order._id}`}
                        className="block border border-gray-200 rounded-xl shadow-md bg-white hover:shadow-lg transition"
                    >
                        <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-6">
                            {/* Left Section */}
                            <div className="flex-1 space-y-2">
                                <p className="text-xs text-gray-400 flex items-center gap-1">
                                    <Hash size={14} />
                                    Order ID:{" "}
                                    <span className="font-mono">
                                        {order._id.slice(-6).toUpperCase()}
                                    </span>
                                </p>
                                <p className="text-sm text-gray-700 flex items-center gap-2">
                                    <Phone size={14} />
                                    {order.phoneNumber}
                                </p>

                                <div className="bg-gray-50 p-3 mt-3 rounded-lg border border-gray-100">
                                    <p className="text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1">
                                        <Utensils size={14} />
                                        Items:
                                    </p>
                                    <div className="flex flex-wrap gap-2 text-sm text-gray-700">
                                        {order.items.map((i) => (
                                            <span
                                                key={i.menuItem._id}
                                                className="bg-gray-100 px-2 py-1 rounded-md"
                                            >
                                                {i.menuItem.name} × {i.quantity}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <p className="mt-3 text-sm font-bold text-gray-900 flex items-center gap-1">
                                    <Wallet
                                        size={16}
                                        className="text-green-600"
                                    />
                                    Total:{" "}
                                    <span className="text-green-600">
                                        Rs.{" "}
                                        {getOrderPrice(order).toLocaleString()}
                                    </span>
                                </p>
                            </div>

                            {/* Right Section */}
                            <div className="flex flex-col items-start md:items-end gap-3">
                                <span
                                    className={`text-xs font-medium px-3 py-1 rounded-full ${
                                        statusColors[order.status]
                                    }`}
                                >
                                    {statusLabels[order.status]}
                                </span>
                                <p className="text-xs text-gray-500 flex items-center gap-1">
                                    <Clock size={14} />
                                    {new Date(order.createdAt).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default MyOrdersPage;
