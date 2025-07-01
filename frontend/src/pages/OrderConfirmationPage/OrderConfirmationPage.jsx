import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../utils/axiosConfig";
import { useCart } from "../../contexts/CartContext";

import {
    CheckCircle,
    ReceiptText,
    Wallet,
    ChefHat,
    RefreshCcw,
    ClipboardList,
    Loader2,
} from "lucide-react";

const OrderConfirmationPage = () => {
    const { id } = useParams();
    const { addMultipleToCart } = useCart();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await api.get(`/orders/${id}`);
                setOrder(res.data);
            } catch (err) {
                toast.error("Failed to fetch order details.");
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [id]);

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

    if (!order)
        return (
            <div className="text-center py-10 text-red-600 font-semibold">
                Order not found.
            </div>
        );

    const subtotal = order.items.reduce(
        (sum, item) => sum + item.menuItem.price * item.quantity,
        0
    );
    const tax = subtotal * 0.1;
    const deliveryFee = 100;
    const total = subtotal + tax + deliveryFee;

    const handleReorder = () => {
        if (!order) return;

        const reorderedItems = order.items.map((i) => ({
            _id: i.menuItem._id,
            name: i.menuItem.name,
            price: i.menuItem.price,
            imageUrl: i.menuItem.imageUrl,
            quantity: i.quantity,
        }));

        addMultipleToCart(reorderedItems);
        toast.success("Order added to cart.");
        navigate("/cart");
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            {/* Success Header */}
            <div className="flex flex-col items-center text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <CheckCircle size={32} className="text-green-600" />
                </div>
                <h1 className="text-2xl font-bold text-green-700 mb-1">
                    Thank you! Your order has been placed.
                </h1>
                <p className="text-gray-600">
                    Order ID:{" "}
                    <span className="font-mono font-semibold text-gray-800">
                        {order._id.slice(-6).toUpperCase()}
                    </span>
                </p>
            </div>

            {/* Order Summary */}
            <div className="bg-white shadow-md rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                    <ReceiptText size={20} />
                    Order Summary
                </h2>

                <div className="divide-y divide-gray-100">
                    {order.items.map((item) => (
                        <div
                            key={item.menuItem._id}
                            className="py-4 grid grid-cols-2 md:grid-cols-3 items-center"
                        >
                            <div className="col-span-2">
                                <p className="font-medium text-gray-800">
                                    {item.menuItem.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Qty: {item.quantity}
                                </p>
                            </div>
                            <div className="text-right text-gray-700 font-semibold">
                                Rs.{" "}
                                {(
                                    item.menuItem.price * item.quantity
                                ).toLocaleString()}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 border-t pt-4 text-sm space-y-1 text-gray-600">
                    <div className="flex justify-between">
                        <span className="flex items-center gap-1">
                            <Wallet size={14} />
                            Subtotal:
                        </span>
                        <span>Rs. {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Tax (10%):</span>
                        <span>Rs. {tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Delivery Fee:</span>
                        <span>Rs. {deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-base text-gray-800 pt-2 border-t">
                        <span>Total:</span>
                        <span>Rs. {total.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link
                    to="/menu"
                    className="px-4 py-2 border border-orange-600 text-orange-600 rounded-4xl hover:bg-orange-50 transition text-center flex items-center gap-2"
                >
                    <ChefHat size={16} />
                    Continue Shopping
                </Link>
                <button
                    onClick={handleReorder}
                    className="px-4 py-2 bg-red-500 text-white rounded-4xl hover:bg-orange-700 transition text-center flex items-center gap-2 cursor-pointer"
                >
                    <RefreshCcw size={16} />
                    Order Again
                </button>
                <Link
                    to="/my-orders"
                    className="px-4 py-2 bg-gray-600 text-white rounded-4xl hover:bg-gray-700 transition text-center flex items-center gap-2"
                >
                    <ClipboardList size={16} />
                    View Past Orders
                </Link>
            </div>
        </div>
    );
};

export default OrderConfirmationPage;
