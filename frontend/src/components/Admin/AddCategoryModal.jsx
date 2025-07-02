import { useState } from "react";
import api from "../../utils/axiosConfig";
import { toast } from "react-hot-toast";
import { Tag, ListOrdered, X, PlusCircle, Loader2 } from "lucide-react";

import ImageUploader from "../Common/ImageUploader";

const AddCategoryModal = ({ onClose, onCategoryAdded }) => {
    const [formData, setFormData] = useState({
        name: "",
        imageUrl: "",
        sortOrder: "",
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (selectedFile) {
            const imageFormData = new FormData();
            imageFormData.append("file", selectedFile);
            imageFormData.append("upload_preset", "biterunner_unsigned");
            imageFormData.append("folder", "menu-images");

            const res = await fetch(
                `https://api.cloudinary.com/v1_1/daauoxkvd/image/upload`,
                {
                    method: "POST",
                    body: imageFormData,
                }
            );

            const data = await res.json();
            formData.imageUrl = data.secure_url;
        }

        try {
            const res = await api.post("/menu/categories", {
                ...formData,
                sortOrder: Number(formData.sortOrder),
            });
            onCategoryAdded(res.data);
            onClose();
            toast.success("New category added to menu.");
        } catch (err) {
            console.error(err);
            setError(
                err.response?.data?.error ||
                    "Something went wrong while adding category."
            );
            toast.error("Something went wrong while adding category.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-auto p-6 relative">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <PlusCircle className="text-green-600" size={22} />
                    Add New Category
                </h2>

                {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <input
                            type="text"
                            name="name"
                            placeholder="Category Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-100 rounded-xl px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <Tag
                            className="absolute top-2.5 left-3 text-gray-400"
                            size={18}
                        />
                    </div>

                    <div className="relative">
                        <input
                            type="number"
                            name="sortOrder"
                            placeholder="Sort Order (e.g., 1)"
                            value={formData.sortOrder}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-100 rounded-xl px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <ListOrdered
                            className="absolute top-2.5 left-3 text-gray-400"
                            size={18}
                        />
                    </div>

                    <ImageUploader
                        onFileSelect={(file) => setSelectedFile(file)}
                    />

                    <div className="flex justify-end space-x-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 flex items-center gap-1 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-4xl cursor-pointer"
                        >
                            <X size={16} />
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={
                                loading || (!formData.imageUrl && !selectedFile)
                            }
                            className={`px-4 py-2 flex items-center gap-1 text-white rounded-4xl cursor-pointer ${
                                loading
                                    ? "bg-green-400 cursor-not-allowed"
                                    : "bg-green-600 hover:bg-green-700"
                            }`}
                        >
                            {loading ? (
                                <>
                                    <Loader2
                                        size={18}
                                        className="animate-spin"
                                    />
                                    Saving
                                </>
                            ) : (
                                <>
                                    <PlusCircle size={16} />
                                    Add
                                </>
                            )}
                        </button>
                    </div>
                </form>

                {/* Close (X) button top right */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
                    aria-label="Close modal"
                >
                    <X size={20} />
                </button>
            </div>
        </div>
    );
};

export default AddCategoryModal;
