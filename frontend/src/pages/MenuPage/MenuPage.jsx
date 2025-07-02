// // components/MenuPage.jsx
import { useEffect, useState, useContext } from "react";
import api from "../../utils/axiosConfig";
import { Utensils } from "lucide-react";

import MenuModal from "./MenuModal";
import SkeletonMenuCard from "./MenuPageCardSkeleton";
import MenuCategorySection from "./MenuCategorySection";
import { UserContext } from "../../contexts/userContext";

const MenuPage = () => {
    const { user } = useContext(UserContext);
    const [menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null); // <== now store item directly

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [menuRes, categoryRes] = await Promise.all([
                    api.get("/menu"),
                    api.get("/menu/categories"),
                ]);
                setMenuItems(menuRes.data);
                setCategories(categoryRes.data);
            } catch (err) {
                console.error("Failed to fetch data", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const groupedItems = categories.reduce((acc, category) => {
        acc[category._id] = {
            name: category.name,
            imageUrl: category.imageUrl,
            items: [],
        };
        return acc;
    }, {});

    menuItems.forEach((item) => {
        if (groupedItems[item.category]) {
            groupedItems[item.category].items.push(item);
        }
    });

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <div className="flex flex-col items-center mb-8">
                <Utensils className="w-10 h-10 text-orange-500 mb-2" />
                <h1 className="text-5xl text-red-500 font-serif font-bold tracking-tight text-center">
                    Bite Into Flavor
                </h1>
                <p className="text-center text-gray-500 text-lg mt-1 font-serif">
                    Explore our chef-crafted dishes
                </p>
            </div>

            {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {Array(8)
                        .fill(0)
                        .map((_, idx) => (
                            <SkeletonMenuCard key={idx} />
                        ))}
                </div>
            ) : (
                Object.entries(groupedItems).map(([categoryId, group]) => {
                    if (group.items.length === 0) return null;

                    return (
                        <MenuCategorySection
                            key={categoryId}
                            title={group.name}
                            imageUrl={group.imageUrl}
                            items={group.items}
                            onSelect={setSelectedItem} // <== Pass full item here
                            isAdmin={user?.role === "admin"}
                        />
                    );
                })
            )}

            {selectedItem && (
                <MenuModal
                    item={selectedItem} // <== Pass the item, not the ID
                    onClose={() => setSelectedItem(null)}
                    isAdmin={user?.role === "admin"}
                />
            )}
        </div>
    );
};

export default MenuPage;
