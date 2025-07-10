// components/MenuPage/MenuCategoryBannerSkeleton.jsx

const MenuCategoryBannerSkeleton = () => {
    return (
        <div className="relative w-full aspect-[16/5] sm:h-64 mb-6 rounded-sm overflow-hidden shadow bg-gray-300 transition-opacity duration-500 opacity-0 animate-fadeIn">
            {/* Shimmer layer */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer z-10" />

            {/* Simulated Title */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="h-1/4 sm:h-1/6 w-1/3 sm:w-1/4 bg-gray-200 rounded-xl" />
            </div>
        </div>
    );
};

export default MenuCategoryBannerSkeleton;
