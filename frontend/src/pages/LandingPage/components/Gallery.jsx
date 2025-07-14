// src/pages/LandingPage/components/Gallery.jsx
import { useEffect, useState } from "react";
import api from "../../../utils/axiosConfig"; // Axios instance

const Gallery = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const res = await api.get("/menu");
                setItems(res.data.slice(0, 6));
            } catch (err) {
                console.error("Error fetching menu items:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchMenuItems();
    }, []);

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                {/* Heading */}
                <div className="text-center mb-14">
                    <p className="text-red-500 text-base font-semibold uppercase tracking-[0.25em] mb-3">
                        Latest Items
                    </p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                        Fresh From Our Kitchen
                    </h2>
                </div>

                {/* Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {loading ? (
                        Array.from({ length: 6 }).map((_, i) => (
                            <div
                                key={i}
                                className="animate-pulse bg-gray-100 rounded-2xl h-72 w-full"
                            ></div>
                        ))
                    ) : error ? (
                        <div className="col-span-full text-center text-red-600">
                            Failed to load menu items.
                        </div>
                    ) : items.length === 0 ? (
                        <div className="col-span-full text-center text-gray-600">
                            No menu items available.
                        </div>
                    ) : (
                        items.map((item) => (
                            <div
                                key={item._id}
                                className="relative overflow-hidden rounded-2xl group shadow-md hover:shadow-xl transition-all duration-300"
                            >
                                <img
                                    src={
                                        item.imageUrl ||
                                        "/images/placeholder.jpg"
                                    }
                                    alt={item.name}
                                    className="w-full h-72 object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />

                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                                    <p className="text-white text-lg">
                                        <span className="font-semibold">
                                            Name:
                                        </span>{" "}
                                        {item.name}
                                    </p>
                                    <p className="text-white text-lg">
                                        <span className="font-semibold">
                                            Price:
                                        </span>{" "}
                                        Rs. {item.price}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* View Full Menu Button */}
                {!loading && !error && items.length > 0 && (
                    <div className="text-center mt-10">
                        <a
                            href="/menu"
                            className="inline-block text-base font-medium text-white bg-red-500 px-6 py-3 rounded-full border border-red-600 hover:bg-transparent hover:text-red-600 transition-all duration-300"
                        >
                            View Full Menu
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Gallery;
