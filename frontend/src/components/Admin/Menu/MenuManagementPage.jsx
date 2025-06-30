import { useEffect, useState } from "react";
import api from "../../../utils/axiosConfig";
import MenuItemCard from "./MenuItemCard";
import MenuItemForm from "./MenuItemForm";

const MenuManagementPage = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editItem, setEditItem] = useState(null);

    const fetchMenuItems = async () => {
        setLoading(true);
        try {
            const res = await api.get("/menu");
            setMenuItems(res.data);
        } catch (err) {
            setError("Failed to load menu items.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const handleFormClose = () => {
        setShowForm(false);
        setEditItem(null);
    };

    const handleItemAddedOrUpdated = (newItem) => {
        // Update if editing, else add to top
        setMenuItems((prev) => {
            const exists = prev.find((item) => item._id === newItem._id);
            return exists
                ? prev.map((item) =>
                      item._id === newItem._id ? newItem : item
                  )
                : [newItem, ...prev];
        });
        handleFormClose();
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Menu Management</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    + Add New Item
                </button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : menuItems.length === 0 ? (
                <p>No menu items found.</p>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {menuItems.map((item) => (
                        <MenuItemCard
                            key={item._id}
                            item={item}
                            onEdit={() => {
                                setEditItem(item);
                                setShowForm(true);
                            }}
                            onDeleteSuccess={fetchMenuItems}
                        />
                    ))}
                </div>
            )}

            {showForm && (
                <MenuItemForm
                    initialData={editItem}
                    onClose={handleFormClose}
                    onSuccess={handleItemAddedOrUpdated}
                />
            )}
        </div>
    );
};

export default MenuManagementPage;
