// components/ImageUploader/ImageUploader.jsx
import { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import { toast } from "react-hot-toast";

const ImageUploader = ({ onFileSelect, defaultImage = null }) => {
    const [preview, setPreview] = useState(defaultImage);

    useEffect(() => {
        setPreview(defaultImage);
    }, [defaultImage]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate size
        if (file.size > 2 * 1024 * 1024) {
            toast.error("Please upload an image under 2MB.");
            return;
        }

        // Validate type
        if (!["image/jpeg", "image/png"].includes(file.type)) {
            toast.error("Only JPG or PNG images allowed.");
            return;
        }

        const localUrl = URL.createObjectURL(file);
        setPreview(localUrl);
        onFileSelect(file);
    };

    return (
        <div className="space-y-3">
            <label className="cursor-pointer">
                <div className="p-4 rounded-lg flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200">
                    <Upload className="w-5 h-5" />
                    <span>
                        {preview ? "Replace image" : "Click to select image"}
                    </span>
                </div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </label>

            <p className="text-sm text-gray-500 text-center">
                Max size: <span className="font-medium">2MB</span> | Allowed
                formats: <span className="font-medium">JPG, PNG</span>
            </p>

            {preview && (
                <div className="flex items-center justify-center">
                    <img
                        src={preview}
                        alt="Selected preview"
                        className="h-40 object-cover rounded-xl border border-gray-300 mt-2"
                    />
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
