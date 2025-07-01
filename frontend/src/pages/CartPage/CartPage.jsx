import { useState } from "react";
import { useCart } from "../../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";

import {
    ShoppingCart,
    Plus,
    Minus,
    Trash2,
    ReceiptText,
    Wallet,
    ArrowRightCircle,
    ShoppingBag,
    BrushCleaning,
} from "lucide-react";

const CartPage = () => {
    const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const tax = subtotal * 0.1;
    const deliveryFee = cartItems.length > 0 ? 100 : 0;
    const total = subtotal + tax + deliveryFee;

    const handleConfirmClearCart = () => {
        clearCart();
        setShowModal(false);
    };

    if (cartItems.length === 0) {
        return (
            <div className="max-w-xl mx-auto px-4 py-16 text-center text-gray-600">
                <h2 className="text-2xl font-bold mb-4">
                    Your cart is empty 🛒
                </h2>
                <p className="mb-6">
                    Browse our menu and add delicious items to your cart!
                </p>
                <button
                    onClick={() => navigate("/menu")}
                    className="px-5 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition"
                >
                    See Menu
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            {/* Header */}
            <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <ShoppingCart size={24} className="text-green-600" />
                Your Cart
            </h1>

            {/* Cart Items */}
            {cartItems.map((item) => (
                <div
                    key={item._id}
                    className="flex items-center space-x-4 py-4 border-b"
                >
                    <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-16 h-16 rounded object-cover"
                    />
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">
                            {item.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                            Rs. {item.price.toLocaleString()} × {item.quantity}
                        </p>

                        <div className="flex items-center mt-2 gap-2">
                            <button
                                onClick={() =>
                                    updateQuantity(
                                        item._id,
                                        Math.max(1, item.quantity - 1)
                                    )
                                }
                                className="p-1 bg-gray-200 rounded hover:bg-gray-300 rounded-4xl cursor-pointer"
                            >
                                <Minus size={16} />
                            </button>
                            <span className="min-w-[10px] text-center">
                                {item.quantity}
                            </span>
                            <button
                                onClick={() =>
                                    updateQuantity(item._id, item.quantity + 1)
                                }
                                className="p-1 bg-gray-200 rounded hover:bg-gray-300 rounded-4xl cursor-pointer"
                            >
                                <Plus size={16} />
                            </button>
                            <button
                                onClick={() => removeFromCart(item._id)}
                                className="ml-4 flex items-center gap-1 text-red-600 hover:underline text-sm cursor-pointer"
                            >
                                <Trash2 size={16} />
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            {/* Charges Section */}
            <div className="text-lg font-bold text-center mt-10 flex items-center justify-center gap-2 text-gray-700">
                <ReceiptText size={20} />
                Charges
            </div>
            <div className="text-right pt-6 border-t space-y-1 text-sm text-gray-700">
                <div>Subtotal: Rs. {subtotal.toFixed(2)}</div>
                <div>Tax (10%): Rs. {tax.toFixed(2)}</div>
                <div>Delivery Fee: Rs. {deliveryFee.toFixed(2)}</div>
                <div className="text-lg font-bold text-gray-900 pt-2 border-t flex items-center justify-end gap-2">
                    <Wallet size={18} />
                    Total: Rs. {total.toLocaleString()}
                </div>
            </div>

            {/* Action Buttons */}
            {/* Clear Cart */}
            <div className="flex justify-end mt-2 mb-2">
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 px-2 py-1.5 text-sm text-red-600 bg-red-100 rounded-4xl hover:bg-red-200 transition cursor-pointer"
                >
                    <BrushCleaning size={16} />
                    Clear Cart
                </button>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                    onClick={() => navigate("/checkout")}
                    className="flex-1 bg-red-500 text-white py-2 rounded-4xl hover:bg-orange-700 transition flex items-center justify-center gap-2 cursor-pointer   "
                >
                    <ArrowRightCircle size={18} />
                    Proceed to Checkout
                </button>
                <button
                    onClick={() => navigate("/menu")}
                    className="flex-1 border border-orange-600 text-orange-600 py-2 rounded-4xl hover:bg-orange-50 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                    <ShoppingBag size={18} />
                    Continue Shopping
                </button>
            </div>

            {/* Confirmation Modal */}
            <ConfirmationModal
                show={showModal}
                message="Are you sure you want to clear your entire cart?"
                onCancel={() => setShowModal(false)}
                onConfirm={handleConfirmClearCart}
            />
        </div>
    );
};

export default CartPage;
