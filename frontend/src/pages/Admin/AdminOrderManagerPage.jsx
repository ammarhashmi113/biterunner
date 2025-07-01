import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "../../utils/axiosConfig";
import { Collapse } from "react-collapse";

import {
    Loader2,
    Truck,
    ChevronDown,
    ChevronRight,
    User2,
    Phone,
    Clock,
    Wallet,
    UtensilsCrossed,
} from "lucide-react";

const statusOptions = [
    "pending",
    "accepted",
    "preparing",
    "out-for-delivery",
    "delivered",
    "cancelled",
];

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

const AdminOrderManagerPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openGroups, setOpenGroups] = useState({});

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get("/orders");
                setOrders(res.data);
            } catch (err) {
                toast.error("Failed to fetch orders.");
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const res = await axios.put(`/orders/${orderId}/status`, {
                status: newStatus,
            });
            setOrders((prev) =>
                prev.map((order) =>
                    order._id === orderId
                        ? { ...order, status: res.data.status }
                        : order
                )
            );
            toast.success("Status updated.");
        } catch (err) {
            toast.error("Failed to update status.");
        }
    };

    const toggleGroup = (status) => {
        setOpenGroups((prev) => ({ ...prev, [status]: !prev[status] }));
    };

    const getOrderPrice = (order) => {
        return order.items.reduce(
            (sum, i) => sum + i.quantity * i.menuItem.price,
            0
        );
    };

    if (loading)
        return (
            <div className="mx-auto w-fit mt-35">
                <Loader2
                    size={18}
                    className="animate-spin mx-auto w-fit text-blue-500"
                />
                <p>Loading Orders</p>
            </div>
        );

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-2">
                <Truck className="text-orange-600" size={28} />
                Order Management
            </h1>

            {statusOptions.map((status) => {
                const filtered = orders.filter((o) => o.status === status);
                if (filtered.length === 0) return null;

                return (
                    <div
                        key={status}
                        className="mb-6 border border-gray-200 rounded-xl shadow-lg"
                    >
                        <button
                            onClick={() => toggleGroup(status)}
                            className="w-full text-left px-5 py-4 bg-gray-100 hover:bg-gray-200 flex justify-between items-center font-semibold rounded-t-xl cursor-pointer"
                        >
                            <span className="flex items-center gap-2">
                                {statusLabels[status]} ({filtered.length})
                            </span>
                            {openGroups[status] ? (
                                <ChevronDown className="w-5 h-5" />
                            ) : (
                                <ChevronRight className="w-5 h-5" />
                            )}
                        </button>

                        <Collapse isOpened={openGroups[status]}>
                            <div className="divide-y divide-gray-100 bg-white rounded-b-xl">
                                {filtered.map((order) => (
                                    <div
                                        key={order._id}
                                        className="p-5 border-b border-gray-300 last:border-b-0 flex flex-col md:flex-row md:items-center justify-between gap-6"
                                    >
                                        {/* Left Section */}
                                        <div className="flex-1 space-y-2">
                                            <p className="text-xs text-gray-400">
                                                Order ID:{" "}
                                                <span className="font-mono">
                                                    {order._id
                                                        .slice(-6)
                                                        .toUpperCase()}
                                                </span>
                                            </p>

                                            <p className="text-base font-semibold text-gray-800 flex items-center gap-2">
                                                <User2 size={16} />
                                                {order.customer?.username}
                                            </p>

                                            <p className="text-sm text-gray-600 flex items-center gap-2">
                                                <Phone size={14} />
                                                {order.phoneNumber}
                                            </p>

                                            <div className="bg-gray-50 p-3 mt-3 rounded-lg border border-gray-100">
                                                <p className="text-xs font-semibold text-gray-500 mb-1 flex items-center gap-1">
                                                    <UtensilsCrossed
                                                        size={14}
                                                    />
                                                    Items:
                                                </p>
                                                <div className="flex flex-wrap gap-2 text-sm text-gray-700">
                                                    {order.items.map((i) => (
                                                        <span
                                                            key={i.menuItem._id}
                                                            className="bg-gray-100 px-2 py-1 rounded-md"
                                                        >
                                                            {i.menuItem.name} ×{" "}
                                                            {i.quantity}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <p className="mt-3 text-sm font-bold text-gray-900 flex items-center gap-2">
                                                <Wallet size={16} />
                                                <span className="text-green-600">
                                                    Rs.{" "}
                                                    {getOrderPrice(
                                                        order
                                                    ).toLocaleString()}
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

                                            <select
                                                value={order.status}
                                                onChange={(e) =>
                                                    handleStatusChange(
                                                        order._id,
                                                        e.target.value
                                                    )
                                                }
                                                className="border border-gray-300 text-sm px-3 py-1.5 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-blue-400 cursor-pointer"
                                            >
                                                {statusOptions.map((s) => (
                                                    <option key={s} value={s}>
                                                        {statusLabels[s]}
                                                    </option>
                                                ))}
                                            </select>

                                            <p className="text-xs text-gray-500 flex items-center gap-1">
                                                <Clock size={14} />
                                                {new Date(
                                                    order.createdAt
                                                ).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Collapse>
                    </div>
                );
            })}
        </div>
    );
};

export default AdminOrderManagerPage;
