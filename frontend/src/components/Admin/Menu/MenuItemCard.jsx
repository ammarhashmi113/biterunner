import { useState } from "react";
import api from "../../../utils/axiosConfig";
import { toast } from "react-hot-toast";
import { Pencil, Trash2 } from "lucide-react";

import ConfirmationModal from "../../Common/ConfirmationModal";

const MenuItemCard = ({ item, onEdit, onDeleteSuccess }) => {
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await api.delete(`/menu/${item._id}`);
            onDeleteSuccess(); // Re-fetch items from parent
            toast.success("Menu item deleted successfully");
        } catch (err) {
            setError("Failed to delete item.", err);
            toast.error("Failed to delete menu item.");
        } finally {
            setDeleting(false);
        }
    };

    return (
        <>
            <div className="bg-white rounded-xl shadow p-4 flex flex-col justify-between">
                {item.imageUrl && (
                    <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-40 object-cover rounded-md mb-3"
                    />
                )}

                <div className="flex-1">
                    <h2 className="text-lg font-bold mb-1">{item.name}</h2>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-3">
                        {item.description}
                    </p>
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <div className="flex gap-2 mt-3">
                    <button
                        onClick={onEdit}
                        className="flex-1 flex items-center justify-center gap-1 bg-blue-600 text-white py-1 px-1 rounded-xl hover:bg-blue-700 cursor-pointer"
                    >
                        <Pencil size={16} />
                        Edit
                    </button>

                    <button
                        onClick={() => setShowDeleteModal(true)}
                        disabled={deleting}
                        className="flex-1 flex items-center justify-center gap-1 bg-red-600 text-white py-1 px-1 rounded-xl hover:bg-red-700 disabled:opacity-50 cursor-pointer"
                    >
                        <Trash2 size={16} />
                        {deleting ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>

            <ConfirmationModal
                show={showDeleteModal}
                message={`Confirm deleting menu item: ${item.name}`}
                onCancel={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
            />
        </>
    );
};

export default MenuItemCard;
