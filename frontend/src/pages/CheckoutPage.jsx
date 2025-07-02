import { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/userContext";
import axios from "../utils/axiosConfig";
import toast from "react-hot-toast";

import {
    CreditCard,
    ReceiptText,
    Wallet,
    Phone,
    MapPin,
    Loader2,
    CheckCircle,
} from "lucide-react";

const CheckoutPage = () => {
    const { cartItems, clearCart } = useCart();
    const { user } = useUser();
    const navigate = useNavigate();

    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState(user?.phoneNumber || "");
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    useEffect(() => {
        if (user?.phoneNumber) setPhone(user.phoneNumber);
    }, [user]);

    const placeOrder = async () => {
        if (!address.trim() || !phone.trim()) {
            toast.error("Please enter both phone number and delivery address.");
            return;
        }

        const payload = {
            items: cartItems.map((item) => ({
                menuItem: item._id,
                quantity: item.quantity,
            })),
            deliveryAddress: address.trim(),
            phoneNumber: phone.trim(),
        };

        try {
            setIsPlacingOrder(true);
            const res = await axios.post("/orders", payload);
            toast.success("Order placed successfully!");
            clearCart();
            navigate(`/orders/${res.data._id}`);
        } catch (err) {
            console.error(err);
            toast.error("Failed to place order. Please try again.");
        } finally {
            setIsPlacingOrder(false);
        }
    };

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * (item.quantity || 1),
        0
    );

    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <CreditCard size={28} className="text-green-600 mt-1" />
                Checkout
            </h1>

            {/* Order Summary */}
            <div className="p-4 shadow-sm bg-gray-50 rounded-t-lg">
                <h2 className="text-lg font-semibold mb-2 text-gray-700 flex items-center gap-2">
                    <ReceiptText size={20} />
                    Order Summary
                </h2>

                <ul className="text-sm text-gray-600 space-y-1">
                    {cartItems.map((item) => (
                        <li key={item._id} className="flex justify-between">
                            <span>
                                {item.name} × {item.quantity}
                            </span>
                            <span>Rs. {item.price * item.quantity}</span>
                        </li>
                    ))}
                </ul>

                <div className="mt-3 border-t pt-3 flex justify-between font-bold text-gray-800">
                    <span className="flex items-center gap-1">
                        <Wallet size={18} />
                        Total
                    </span>
                    <span>Rs. {totalPrice}</span>
                </div>
            </div>

            {/* Checkout Form */}
            <div className="space-y-5 bg-white p-6 shadow rounded-b-lg">
                {/* Phone */}
                <div>
                    <label className="block font-medium mb-1 text-gray-700 flex items-center gap-2">
                        <Phone size={16} />
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring focus:ring-green-500"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 03001234567"
                    />
                </div>

                {/* Address */}
                <div>
                    <label className="block font-medium mb-1 text-gray-700 flex items-center gap-2">
                        <MapPin size={16} />
                        Delivery Address
                    </label>
                    <textarea
                        rows="3"
                        className="w-full border border-gray-300 px-4 py-2 rounded-xl resize-none focus:outline-none focus:ring focus:ring-green-500"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="e.g. House #123, Street #4, G-10/1 Islamabad"
                    ></textarea>
                </div>

                {/* Place Order Button */}
                <button
                    onClick={placeOrder}
                    disabled={isPlacingOrder}
                    className={`w-full py-3 font-semibold rounded-4xl transition duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                        isPlacingOrder
                            ? "bg-red-400 text-white cursor-not-allowed"
                            : "bg-red-500 text-white hover:bg-red-600"
                    }`}
                >
                    {isPlacingOrder ? (
                        <>
                            <Loader2 size={20} className="animate-spin" />
                            Placing Order...
                        </>
                    ) : (
                        <>
                            <CheckCircle size={20} />
                            Place Order
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default CheckoutPage;
