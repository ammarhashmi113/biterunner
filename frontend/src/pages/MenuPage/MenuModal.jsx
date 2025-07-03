import { useEffect, useRef, useState } from "react";
import { useCart } from "../../contexts/CartContext";
import { Minus, Plus, X } from "lucide-react";

const MenuModal = ({ item, onClose, isAdmin }) => {
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    if (!item) return null;

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
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-3xl font-bold cursor-pointer"
                >
                    <X />
                </button>

                <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-56 object-cover rounded-t-xl"
                />
                <div className="p-5 bg-white">
                    <h2 className="text-2xl font-semibold mb-2">{item.name}</h2>
                    <p className="text-gray-600 mb-4">{item.description}</p>

                    <div className="flex justify-between items-center mb-4">
                        <span className="text-xl font-bold text-green-600">
                            Rs. {item.price}
                        </span>

                        {!isAdmin && (
                            <div className="flex items-center">
                                <button
                                    onClick={() =>
                                        setQuantity((q) => Math.max(1, q - 1))
                                    }
                                    className="px-1 py-1 bg-gray-200 rounded-4xl hover:bg-gray-300 cursor-pointer"
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="min-w-[24px] text-center">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity((q) => q + 1)}
                                    className="px-1 py-1 bg-gray-200 rounded-4xl hover:bg-gray-300 cursor-pointer"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                        )}
                    </div>

                    {!isAdmin && (
                        <button
                            onClick={handleAddToCart}
                            className="w-full py-2 bg-red-500 text-white font-medium rounded hover:bg-red-700 transition rounded-xl cursor-pointer"
                        >
                            Add to Cart
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MenuModal;
