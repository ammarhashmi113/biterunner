// components/MenuPage/MenuCategorySection.jsx
import MenuCategorySectionMenuCard from "./MenuCategorySectionMenuCard";

const MenuCategorySection = ({
    id,
    title,
    imageUrl,
    items,
    onSelect,
    isAdmin,
}) => {
    return (
        <section id={id} className="mb-12 scroll-mt-28">
            <div className="relative w-full aspect-[16/5] sm:h-64 mb-6 rounded-sm overflow-hidden shadow">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover brightness-60"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/40 to-transparent z-10" />
                <h2 className="absolute inset-0 flex items-center justify-center text-3xl sm:text-4xl font-bold text-white text-center font-serif drop-shadow-md z-20">
                    {title}
                </h2>
            </div>

            {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"> */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {items.map((item) => (
                    <MenuCategorySectionMenuCard
                        key={item._id}
                        item={item}
                        onClick={() => onSelect(item)} // <== pass full item
                        isAdmin={isAdmin}
                    />
                ))}
            </div>
        </section>
    );
};

export default MenuCategorySection;
