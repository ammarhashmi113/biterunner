import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [initialized, setInitialized] = useState(false);

    // Load from localStorage
    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
        setInitialized(true);
    }, []);

    // Save to localStorage only after initialization
    useEffect(() => {
        if (initialized) {
            localStorage.setItem("cart", JSON.stringify(cartItems));
        }
    }, [cartItems, initialized]);

    const addToCart = (item) => {
        setCartItems((prev) => {
            const exists = prev.find((x) => x._id === item._id);
            if (exists) {
                toast("Item already in cart", { icon: "🛒" });
                return prev;
            }
            toast.success("Item added to cart!");
            return [...prev, item];
        });
    };

    const removeFromCart = (id) => {
        setCartItems((prev) => {
            const newCart = prev.filter((x) => x._id !== id);
            toast("Item removed from cart", { icon: "❌" });
            return newCart;
        });
    };

    const clearCart = () => {
        setCartItems([]);
        toast("Cart cleared", { icon: "🧹" });
    };

    const updateQuantity = (_id, newQuantity) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item._id === _id ? { ...item, quantity: newQuantity } : item
            )
        );
        toast("Quantity updated", { icon: "🔄" });
    };

    const addMultipleToCart = (items) => {
        setCartItems((prev) => {
            const newItems = [...prev];
            let addedCount = 0;
            for (const item of items) {
                const exists = newItems.find((x) => x._id === item._id);
                if (!exists) {
                    newItems.push(item);
                    addedCount++;
                }
            }
            if (addedCount > 0) {
                toast.success(`${addedCount} item(s) added to cart`);
            } else {
                toast("Items were already in cart", { icon: "ℹ️" });
            }
            return newItems;
        });
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                clearCart,
                updateQuantity,
                addMultipleToCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
