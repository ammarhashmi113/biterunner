import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Collapse } from "react-collapse";
import { toast } from "react-hot-toast";
import api from "../../utils/axiosConfig";

import {
    LayoutGrid,
    PlusCircle,
    ImageOff,
    ChevronDown,
    ChevronRight,
    Pencil,
    Trash2,
    PlusSquare,
    Loader2,
} from "lucide-react";

import AddCategoryModal from "../../components/Admin/AddCategoryModal";
import EditCategoryModal from "../../components/Admin/EditCategoryModal";
import AddEditMenuItemModal from "../../components/Admin/Menu/AddEditMenuItemModal";
import MenuItemCard from "../../components/Admin/Menu/MenuItemCard";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";

const AdminMenuManagerPage = () => {
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [groupedData, setGroupedData] = useState([]);

    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [showItemModal, setShowItemModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedCategoryForItem, setSelectedCategoryForItem] =
        useState(null);

    const [openCategoryId, setOpenCategoryId] = useState(null);

    const toggleCategory = (id) => {
        setOpenCategoryId((prev) => (prev === id ? null : id));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [catRes, itemRes] = await Promise.all([
                api.get("/menu/categories"),
                api.get("/menu"),
            ]);

            const catMap = catRes.data.reduce((acc, cat) => {
                acc[cat._id] = { ...cat, items: [] };
                return acc;
            }, {});

            itemRes.data.forEach((item) => {
                if (catMap[item.category]) {
                    catMap[item.category].items.push(item);
                }
            });

            setCategories(catRes.data);
            setMenuItems(itemRes.data);
            setGroupedData(Object.values(catMap));
        } catch (err) {
            console.error("Error fetching menu data", err);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryDelete = (cat) => {
        if (cat.items.length === 0) {
            setCategoryToDelete(cat);
            setShowDeleteModal(true);
        } else {
            toast.error("Category not empty. Remove items first.");
        }
    };

    const confirmCategoryDelete = async () => {
        if (!categoryToDelete) return;

        try {
            await api.delete(`/menu/categories/${categoryToDelete._id}`);
            await fetchData();
            toast.success("Successfully removed category from menu.");
        } catch (err) {
            alert(err.response?.data?.error || "Failed to remove category.");
        } finally {
            setShowDeleteModal(false);
            setCategoryToDelete(null);
        }
    };

    const handleItemEdit = (item) => {
        setSelectedItem(item);
        setShowItemModal(true);
    };

    const handleItemAdd = (category) => {
        setSelectedCategoryForItem(category);
        setSelectedItem(null);
        setShowItemModal(true);
    };

    const handleItemSubmit = async (data) => {
        try {
            if (selectedItem) {
                await api.put(`/menu/${selectedItem._id}`, data);
            } else {
                await api.post("/menu", {
                    ...data,
                    category: selectedCategoryForItem._id,
                });
            }
            setShowItemModal(false);
            await fetchData();
        } catch (err) {
            alert("Failed to save menu item.");
            console.error(err);
        }
    };

    if (loading)
        return (
            <div className="mx-auto w-fit mt-35">
                <Loader2
                    size={18}
                    className="animate-spin mx-auto w-fit text-blue-500"
                />
                <p>Loading Menu</p>
            </div>
        );

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h1 className="text-3xl font-bold flex items-center gap-2 text-gray-800">
                    <LayoutGrid className="text-orange-600" size={28} />
                    Menu Management
                </h1>

                <Link
                    onClick={() => setShowAddCategoryModal(true)}
                    className="flex items-center gap-2 px-4 py-2 text-green-700 hover:text-white border border-green-700 hover:bg-green-700 rounded-4xl transition"
                >
                    <PlusCircle size={18} />
                    Add Category
                </Link>
            </div>

            {groupedData.map((cat) => (
                <div
                    key={cat._id}
                    className="mb-6 border border-gray-200 rounded-xl shadow-md bg-white transition-shadow hover:shadow-lg overflow-hidden cursor-pointer"
                >
                    {/* Toggle Header */}
                    <div onClick={() => toggleCategory(cat._id)}>
                        {/* Image */}
                        {cat.imageUrl ? (
                            <div className="relative w-full h-50 rounded-t-xl overflow-hidden shadow">
                                <img
                                    src={cat.imageUrl}
                                    alt={cat.name}
                                    className="w-full h-full object-cover brightness-60"
                                />
                                <h2 className="absolute inset-0 flex items-center justify-center text-3xl sm:text-4xl font-bold text-white text-center">
                                    {cat.name}
                                </h2>
                            </div>
                        ) : (
                            <div className="w-full h-48 bg-gray-100 flex flex-col items-center justify-center gap-2 text-gray-400 rounded-md text-sm">
                                <ImageOff size={32} />
                                No Image
                            </div>
                        )}
                        <div className="flex justify-between items-center bg-gray-100 p-4 cursor-pointer">
                            <div>
                                <h2 className="text-lg font-bold">
                                    {cat.name}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    Sort Order: {cat.sortOrder ?? "N/A"}
                                </p>
                            </div>
                            <span>
                                {openCategoryId === cat._id ? (
                                    <ChevronDown className="w-5 h-5" />
                                ) : (
                                    <ChevronRight className="w-5 h-5" />
                                )}
                            </span>
                        </div>
                    </div>

                    {/* Collapsible Content */}
                    <Collapse isOpened={openCategoryId === cat._id}>
                        <div className="p-4 space-y-4">
                            {/* Action Links */}
                            <div className="flex justify-between sm:justify-between items-center">
                                <div className="flex gap-3">
                                    <Link
                                        onClick={() => setEditingCategory(cat)}
                                        className="flex items-center gap-1 px-3 py-1 text-sm text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-700 rounded-4xl transition"
                                    >
                                        <Pencil size={14} />
                                        Edit
                                    </Link>

                                    <Link
                                        onClick={() =>
                                            handleCategoryDelete(cat)
                                        }
                                        className="flex items-center gap-1 px-3 py-1 text-sm text-red-700 hover:text-white border border-red-700 hover:bg-red-700 rounded-4xl transition"
                                    >
                                        <Trash2 size={14} />
                                        Delete
                                    </Link>
                                </div>

                                <Link
                                    onClick={() => handleItemAdd(cat)}
                                    className="flex items-center gap-1 px-3 py-1 text-sm text-green-700 hover:text-white border border-green-700 hover:bg-green-700 rounded-4xl transition"
                                >
                                    <PlusSquare size={14} />
                                    New Item
                                </Link>
                            </div>

                            {/* Menu Items */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                                {cat.items.length > 0 ? (
                                    cat.items.map((item) => (
                                        <MenuItemCard
                                            key={item._id}
                                            item={item}
                                            onEdit={() => handleItemEdit(item)}
                                            onDeleteSuccess={fetchData}
                                        />
                                    ))
                                ) : (
                                    <p className="text-gray-500 italic col-span-full">
                                        No items in this category.
                                    </p>
                                )}
                            </div>
                        </div>
                    </Collapse>
                </div>
            ))}

            {/* Modals */}
            {showAddCategoryModal && (
                <AddCategoryModal
                    onClose={() => setShowAddCategoryModal(false)}
                    onCategoryAdded={fetchData}
                />
            )}

            {editingCategory && (
                <EditCategoryModal
                    category={editingCategory}
                    onClose={() => setEditingCategory(null)}
                    onCategoryUpdated={fetchData}
                />
            )}

            {showItemModal && (
                <AddEditMenuItemModal
                    isOpen={showItemModal}
                    onClose={() => setShowItemModal(false)}
                    initialData={selectedItem}
                    onSubmit={handleItemSubmit}
                />
            )}

            <ConfirmationModal
                show={showDeleteModal}
                message={`Are you sure you want to delete category "${categoryToDelete?.name}"?`}
                onCancel={() => setShowDeleteModal(false)}
                onConfirm={confirmCategoryDelete}
            />
        </div>
    );
};

export default AdminMenuManagerPage;
