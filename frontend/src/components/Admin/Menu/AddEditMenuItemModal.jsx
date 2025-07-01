import { useEffect } from "react";
import { X, PlusCircle, Pencil } from "lucide-react";
import AddEditMenuItemForm from "./AddEditMenuItemForm";

const AddEditMenuItemModal = ({ isOpen, onClose, initialData, onSubmit }) => {
    useEffect(() => {
        // Calculate scrollbar width
        const scrollBarWidth =
            window.innerWidth - document.documentElement.clientWidth;

        // Apply styles to prevent shift
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = `${scrollBarWidth}px`;

        return () => {
            document.body.style.overflow = "";
            document.body.style.paddingRight = "";
        };
    }, []);

    if (!isOpen) return null;

    const isEditing = !!initialData;

    return (
        <div
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4"
            onClick={onClose} // close modal on background click
        >
            <div
                className="bg-white rounded-xl shadow-xl max-w-lg w-full mx-auto relative overflow-hidden"
                onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
            >
                {/* Close Button */}
                <button
                    className="absolute top-3 right-4 text-gray-500 hover:text-black cursor-pointer"
                    onClick={onClose}
                    aria-label="Close Modal"
                >
                    <X size={20} />
                </button>

                {/* Header */}
                <div className="px-6 pt-6 pb-2 flex items-center gap-2">
                    {isEditing ? (
                        <Pencil className="text-blue-600" size={20} />
                    ) : (
                        <PlusCircle className="text-green-600" size={20} />
                    )}
                    <h2 className="text-lg font-semibold text-gray-800">
                        {isEditing ? "Edit Menu Item" : "Add New Menu Item"}
                    </h2>
                </div>

                {/* Form */}
                <div className="px-6 py-4 w-full max-h-[80vh] overflow-y-auto">
                    <AddEditMenuItemForm
                        initialData={initialData}
                        onClose={onClose}
                        onSubmit={onSubmit}
                    />
                </div>
            </div>
        </div>
    );
};

export default AddEditMenuItemModal;
