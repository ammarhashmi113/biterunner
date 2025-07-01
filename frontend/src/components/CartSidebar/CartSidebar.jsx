// components/CartSidebar.jsx
import { useCart } from "../../contexts/CartContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { TrashIcon } from "@heroicons/react/24/outline"; // For Icons
import {
    BrushCleaning,
    ShoppingBag,
    ShoppingCart,
    X,
    Plus,
    Minus,
    Wallet,
    ReceiptText,
    ClipboardList,
    ArrowRightCircle,
} from "lucide-react";

import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";

const CartSidebar = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();

    const [showModal, setShowModal] = useState(false);

    // Calculate totals
    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const tax = subtotal * 0.1; // 10% tax example
    const deliveryFee = cartItems.length > 0 ? 100 : 0; // flat delivery fee if any items

    // Close sidebar on Escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            window.addEventListener("keydown", handleEsc);
        }
        return () => window.removeEventListener("keydown", handleEsc);
    }, [isOpen, onClose]);

    const handleConfirmClearCart = () => {
        clearCart();
        setShowModal(false);
    };

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
                    isOpen
                        ? "opacity-50 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                }`}
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Sidebar */}
            <aside
                className={`fixed top-0 right-0 h-full max-w-full w-[90vw] sm:w-96 bg-white shadow-lg transform transition-transform duration-300 flex flex-col ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="cart-title"
            >
                <header className="flex justify-between items-center p-4 border-b">
                    <h2
                        id="cart-title"
                        className="text-xl font-bold flex items-center gap-2"
                    >
                        <ShoppingCart size={20} className="text-green-600" />
                        Your Cart ({cartItems.length})
                    </h2>

                    <button
                        onClick={onClose}
                        aria-label="Close cart"
                        className="text-2xl font-bold text-gray-600 hover:text-gray-800 cursor-pointer"
                    >
                        <X />
                    </button>
                </header>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {cartItems.length === 0 ? (
                        <div className="text-center text-gray-500 mt-12 flex flex-col items-center gap-2">
                            <ShoppingBag size={32} className="text-gray-400" />
                            <p>Your cart is empty.</p>
                        </div>
                    ) : (
                        cartItems.map((item, index) => (
                            <div
                                key={item._id}
                                className={`flex items-center space-x-4 ${
                                    index !== 0 ? "mt-4" : ""
                                }`}
                            >
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className="w-16 h-16 rounded object-cover"
                                />
                                <div className="flex-1">
                                    <h5 className="font-semibold">
                                        {item.name}
                                    </h5>
                                    <p className="text-green-600 font-bold">
                                        Rs. {item.price} × {item.quantity} = Rs.{" "}
                                        {item.price * item.quantity}
                                    </p>

                                    <div className="flex justify-between items-center mt-2">
                                        {/* Quantity buttons */}
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() =>
                                                    updateQuantity(
                                                        item._id,
                                                        Math.max(
                                                            1,
                                                            item.quantity - 1
                                                        )
                                                    )
                                                }
                                                className="p-1 bg-gray-200 rounded hover:bg-gray-300 rounded-4xl cursor-pointer"
                                                aria-label={`Decrease quantity of ${item.name}`}
                                            >
                                                <Minus size={16} />
                                            </button>

                                            <span className="min-w-[10px] text-center">
                                                {item.quantity}
                                            </span>

                                            <button
                                                onClick={() =>
                                                    updateQuantity(
                                                        item._id,
                                                        item.quantity + 1
                                                    )
                                                }
                                                className="p-1 bg-gray-200 rounded hover:bg-gray-300 rounded-4xl cursor-pointer"
                                                aria-label={`Increase quantity of ${item.name}`}
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                        {/* Trash icon to the far right */}
                                        <button
                                            onClick={() =>
                                                removeFromCart(item._id)
                                            }
                                            className="p-2 rounded bg-red-100 text-red-700 hover:bg-red-200 transition cursor-pointer"
                                            aria-label={`Remove ${item.name} from cart`}
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer with totals and checkout */}
                <footer className="p-4 border-t bg-gray-50">
                    <div className="space-y-2 text-right">
                        <div className="flex items-center gap-2 text-sm text-gray-600 font-semibold mb-1">
                            <ReceiptText size={18} />
                            Order Summary
                        </div>
                        <div>
                            <span className="font-semibold">Subtotal:</span> Rs.{" "}
                            {subtotal.toFixed(2)}
                        </div>
                        <div>
                            <span className="font-semibold">Tax (10%):</span>{" "}
                            Rs. {tax.toFixed(2)}
                        </div>
                        <div>
                            <span className="font-semibold">Delivery Fee:</span>{" "}
                            Rs. {deliveryFee.toFixed(2)}
                        </div>

                        <div className="text-lg font-bold flex items-center justify-end gap-2">
                            <Wallet size={18} />
                            Total: Rs.{" "}
                            {(subtotal + tax + deliveryFee).toFixed(2)}
                        </div>
                    </div>

                    {!(cartItems.length === 0) && (
                        <div className="flex justify-end mt-2 mb-2">
                            {/* Clear Cart */}
                            <button
                                disabled={cartItems.length === 0}
                                className="flex items-center gap-2 px-2 py-1.5 text-sm text-red-600 bg-red-100 rounded-4xl hover:bg-red-200 transition cursor-pointer"
                                onClick={() => setShowModal(true)}
                            >
                                <BrushCleaning size={16} />
                                Clear Cart
                            </button>
                        </div>
                    )}

                    {/* View Cart */}
                    <button
                        onClick={() => {
                            onClose();
                            navigate("/cart");
                        }}
                        className="w-full mt-8 mb-2 py-2 border border-orange-600 text-orange-600 rounded-4xl hover:bg-orange-50 transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                        <ClipboardList size={18} />
                        View Full Cart
                    </button>

                    {/* Checkout */}
                    <button
                        disabled={cartItems.length === 0}
                        className={`w-full py-2 rounded-4xl text-white font-semibold transition flex items-center justify-center gap-2 cursor-pointer ${
                            cartItems.length === 0
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-red-500 hover:bg-orange-700"
                        }`}
                        onClick={() => {
                            onClose();
                            navigate("/checkout");
                        }}
                    >
                        <ArrowRightCircle size={18} />
                        Checkout
                    </button>
                </footer>
            </aside>
            {/* Confirmation Modal */}
            <ConfirmationModal
                show={showModal}
                message="Are you sure you want to clear your entire cart?"
                onCancel={() => setShowModal(false)}
                onConfirm={handleConfirmClearCart}
            />
        </>
    );
};

export default CartSidebar;
