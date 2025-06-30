import { useEffect, useRef, useState } from "react";
import api from "../../../utils/axiosConfig";
import { useCart } from "../../../contexts/CartContext";

const MenuModal = ({ menuId, onClose, isAdmin }) => {
    const [item, setItem] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    const { addToCart } = useCart();
    const modalRef = useRef(null); // Reference to the modal box

    // Fetch item data
    useEffect(() => {
        const fetchItem = async () => {
            try {
                setLoading(true);
                const res = await api.get(`/menu/${menuId}`);
                setItem(res.data);
            } catch (err) {
                console.error("Failed to load item", err);
            } finally {
                setLoading(false);
            }
        };

        if (menuId) {
            fetchItem();
        }
    }, [menuId]);

    // Handle outside clicks
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    if (!menuId || !item) return null;

    const handleAddToCart = () => {
        addToCart({ ...item, quantity });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
            <div
                ref={modalRef}
                className="rounded-xl shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto relative"
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-3xl font-bold"
                    aria-label="Close modal"
                >
                    ×
                </button>

                {loading ? (
                    <div className="p-6 text-center text-gray-500 font-medium">
                        Loading...
                    </div>
                ) : (
                    <>
                        <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-56 object-cover rounded-t-xl"
                        />

                        <div className="p-5 bg-white">
                            <h2 className="text-2xl font-semibold mb-2">
                                {item.name}
                            </h2>
                            <p className="text-gray-600 mb-4">
                                {item.description}
                            </p>

                            <div className="flex justify-between items-center mb-4">
                                <span className="text-xl font-bold text-green-600">
                                    Rs. {item.price}
                                </span>
                                <div className="flex items-center">
                                    {!isAdmin && (
                                        <>
                                            <button
                                                onClick={() =>
                                                    setQuantity((q) =>
                                                        Math.max(1, q - 1)
                                                    )
                                                }
                                                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                            >
                                                -
                                            </button>
                                            <span className="min-w-[24px] text-center">
                                                {quantity}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    setQuantity((q) => q + 1)
                                                }
                                                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                            >
                                                +
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>

                            {!isAdmin && (
                                <button
                                    onClick={handleAddToCart}
                                    className="w-full py-2 bg-red-500 text-white font-medium rounded hover:bg-red-700 transition rounded-xl"
                                >
                                    Add to Cart
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default MenuModal;
