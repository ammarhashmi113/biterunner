import { useEffect, useState } from "react";
import api from "../../../utils/axiosConfig";
import { toast } from "react-hot-toast";

import {
    Utensils,
    FileText,
    Banknote,
    FolderOpen,
    ChevronDown,
    Loader2,
    PlusCircle,
    Pencil,
    XCircle,
} from "lucide-react";

import ImageUploader from "../../ImageUploader/ImageUploader";

const MenuItemForm = ({ initialData = {}, onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        imageUrl: "",
        category: "",
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || "",
                description: initialData.description || "",
                price: initialData.price || "",
                imageUrl: initialData.imageUrl || "",
                category: initialData.category || "",
            });
        }
    }, [initialData]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await api.get("/menu/categories");
                setCategories(res.data);
            } catch (err) {
                setError("Failed to load categories.");
            }
        };

        fetchCategories();
    }, []);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

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

            await onSubmit({
                ...formData,
                price: Number(formData.price),
                imageUrl,
            });

            toast.success(
                `Menu item ${
                    initialData?._id ? "updated" : "added"
                } successfully.`
            );
        } catch (err) {
            setError(err?.response?.data?.error || "Something went wrong.");
            toast.error("Failed to save menu item.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Name */}
            <span className="text-sm text-gray-500 px-0.5">Name</span>
            <div className="relative">
                <Utensils
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                />
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Item name"
                    className="w-full bg-gray-100 rounded-xl px-10 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                    required
                    minLength={2}
                />
            </div>

            {/* Description */}
            <span className="text-sm text-gray-500 px-0.5">Description</span>
            <div className="relative">
                <FileText
                    className="absolute left-3 top-3 text-gray-400"
                    size={18}
                />
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="w-full bg-gray-100 rounded-xl px-10 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                    rows={3}
                    required
                />
            </div>

            {/* Price */}
            <span className="text-sm text-gray-500 px-0.5">Price</span>
            <div className="relative">
                <Banknote
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                />
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Price (PKR)"
                    className="w-full bg-gray-100 rounded-xl px-10 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                    required
                />
            </div>

            {/* Category */}
            <span className="text-sm text-gray-500 px-0.5">Category</span>
            <div className="relative">
                <FolderOpen
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                />
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-gray-100 rounded-xl px-10 py-2 focus:outline-none focus:ring-1 focus:ring-green-500 appearance-none cursor-pointer"
                    required
                >
                    <option value="" disabled>
                        Select a category
                    </option>
                    {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
                <ChevronDown
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={18}
                />
            </div>

            {/* Image Uploader */}
            <ImageUploader
                defaultImage={formData.imageUrl}
                onFileSelect={(file) => setSelectedFile(file)}
            />

            {/* Buttons */}
            <div className="mt-3 flex justify-end gap-3">
                <button
                    type="button"
                    onClick={onClose}
                    className="flex items-center gap-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-4xl hover:bg-gray-300 cursor-pointer"
                >
                    <XCircle size={18} />
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading || (!formData.imageUrl && !selectedFile)}
                    className={`flex items-center gap-1 px-4 py-2 text-white rounded-4xl cursor-pointer ${
                        loading
                            ? "bg-green-400 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700"
                    }`}
                >
                    {loading ? (
                        <>
                            <Loader2 size={18} className="animate-spin" />
                            Saving
                        </>
                    ) : initialData?._id ? (
                        <>
                            <Pencil size={18} />
                            Update
                        </>
                    ) : (
                        <>
                            <PlusCircle size={18} />
                            Add
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default MenuItemForm;
