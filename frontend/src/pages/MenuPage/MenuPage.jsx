// // components/MenuPage.jsx
import { useEffect, useState, useContext } from "react";
import { Utensils } from "lucide-react";

import api from "../../utils/axiosConfig";
import { UserContext } from "../../contexts/userContext";
import { usePageTitle } from "../../utils/usePageTitle";

import MenuCategoriesNavbar from "../../components/MenuCategoriesNavbar";
import SkeletonCategoryBanner from "./MenuCategoryBannerSkeleton";
import SkeletonMenuCard from "./MenuPageCardSkeleton";
import MenuModal from "./MenuModal";
import MenuCategorySection from "./MenuCategorySection";

const MenuPage = () => {
    usePageTitle("Menu");

    const { user } = useContext(UserContext);
    const [menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null); // <== now store item directly

    // 0. Fetching data when component mounts
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

    // 1. Group categories and prep empty items arrays
    const groupedItems = categories.reduce((acc, category) => {
        acc[category._id] = {
            name: category.name,
            imageUrl: category.imageUrl,
            items: [],
        };
        return acc;
    }, {});

    // 2. Populate those groups with actual menu items
    menuItems.forEach((item) => {
        if (groupedItems[item.category]) {
            groupedItems[item.category].items.push(item);
        }
    });

    // 3. Now filter only the categories that have items
    const visibleCategories = categories.filter(
        (cat) => groupedItems[cat._id]?.items.length > 0
    );

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <div className="flex flex-col items-center mb-8">
                <Utensils className="w-10 h-10 text-orange-500 mb-2" />
                <h1 className="text-5xl text-red-500 font-serif font-bold tracking-tight text-center">
                    Bite Into <br className="sm:hidden" /> Flavor
                </h1>
                <p className="text-center text-gray-500 text-lg mt-1 font-serif">
                    Explore our chef-crafted dishes
                </p>
            </div>

            {/*bg-white w-full fixed top-0 left-0 z-50*/}
            {!loading && categories.length > 0 && (
                <div className="sticky top-16 z-40 bg-white shadow-md w-full">
                    <MenuCategoriesNavbar categories={visibleCategories} />
                </div>
            )}

            {loading ? (
                <>
                    <SkeletonCategoryBanner />
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                        {Array(8)
                            .fill(0)
                            .map((_, idx) => (
                                <SkeletonMenuCard key={idx} />
                            ))}
                    </div>
                </>
            ) : (
                Object.entries(groupedItems).map(([categoryId, group]) => {
                    if (group.items.length === 0) return null;

                    return (
                        <MenuCategorySection
                            key={categoryId}
                            id={`category-${categoryId}`}
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
