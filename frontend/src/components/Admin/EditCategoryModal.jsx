import { useState } from "react";
import api from "../../utils/axiosConfig";
import { toast } from "react-hot-toast";
import { Tag, ListOrdered, X, Save, Loader2 } from "lucide-react";

import ImageUploader from "../Common/ImageUploader";

const EditCategoryModal = ({ category, onClose, onCategoryUpdated }) => {
    const [formData, setFormData] = useState({
        name: category.name || "",
        imageUrl: category.imageUrl || "",
        sortOrder: category.sortOrder || 0,
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

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

        try {
            let imageUrl = formData.imageUrl;

            if (selectedFile) {
                const imageForm = new FormData();
                imageForm.append("file", selectedFile);
                imageForm.append("upload_preset", "biterunner_unsigned");
                imageForm.append("folder", "menu-images");

                const res = await fetch(
                    `https://api.cloudinary.com/v1_1/daauoxkvd/image/upload`,
                    {
                        method: "POST",
                        body: imageForm,
                    }
                );

                const data = await res.json();
                imageUrl = data.secure_url;
            }

            const { data } = await api.put(`/menu/categories/${category._id}`, {
                ...formData,
                sortOrder: Number(formData.sortOrder),
                imageUrl,
            });

            onCategoryUpdated(data);
            onClose();
            toast.success("Successfully updated menu category.");
        } catch (err) {
            setError(err.response?.data?.error || "Failed to update category.");
            toast.error("Failed to update category.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-auto p-6 relative">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Save className="text-green-600" size={22} />
                    Edit Category
                </h2>

                {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <span className="text-sm text-gray-500 px-0.5">Name</span>
                    <div className="relative">
                        <input
                            type="text"
                            name="name"
                            placeholder="Category Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-gray-100 rounded-xl px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                        <Tag
                            className="absolute top-2.5 left-3 text-gray-400"
                            size={18}
                        />
                    </div>
                    <span className="text-sm text-gray-500 px-0.5">
                        Sort Order
                    </span>
                    <div className="relative">
                        <input
                            type="number"
                            name="sortOrder"
                            placeholder="Sort Order"
                            value={formData.sortOrder}
                            onChange={handleChange}
                            className="w-full bg-gray-100 rounded-xl px-3 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                        <ListOrdered
                            className="absolute top-2.5 left-3 text-gray-400"
                            size={18}
                        />
                    </div>

                    <ImageUploader
                        defaultImage={formData.imageUrl}
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
                                    <Save size={16} />
                                    Update
                                </>
                            )}
                        </button>
                    </div>
                </form>

                {/* Top-right close button */}
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

export default EditCategoryModal;
