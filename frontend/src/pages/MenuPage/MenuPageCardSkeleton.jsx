const MenuCategoryBannerSkeleton = () => {
    return (
        <div className="relative bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col h-full">
            {/* Shimmer Layer */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer z-10" />

            {/* Simulated Image (matches aspect-[4/3]) */}
            <div className="aspect-[4/3] w-full bg-gray-300" />

            {/* Simulated Content */}
            <div className="flex-1 p-4 flex flex-col justify-between space-y-3 relative z-0">
                <div>
                    <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" />{" "}
                    {/* Title */}
                    <div className="h-4 bg-gray-300 rounded w-full mb-1" />
                    <div className="h-4 bg-gray-300 rounded w-5/6" />
                </div>
                <div className="h-5 bg-gray-300 rounded w-1/3 mt-3" />{" "}
                {/* Price/Action */}
            </div>
        </div>
    );
};

export default MenuCategoryBannerSkeleton;
