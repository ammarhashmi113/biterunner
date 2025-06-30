const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: "daauoxkvd",
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const deleteImageByUrl = async (url) => {
    if (!url) return;
    try {
        const parts = url.split("/");
        const fileName = parts[parts.length - 1];
        const publicId = "menu-images/" + fileName.split(".")[0];
        await cloudinary.uploader.destroy(publicId);
    } catch (err) {
        console.error("Cloudinary deletion failed:", err.message);
    }
};

module.exports = { cloudinary, deleteImageByUrl };
