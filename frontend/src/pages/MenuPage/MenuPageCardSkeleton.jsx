const MenuPageCardSkeleton = () => {
    return (
        <div className="relative bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col h-[258px] sm:h-[374px] md:h-[390px]">
            {/* Shimmer Layer */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer z-10" />

            {/* Simulated Image (matches aspect-[4/3]) */}
            <div className="w-full h-32 sm:h-48 md:h-52 bg-gray-300 shrink-0" />

            {/* Simulated Content */}
            <div className="flex-1 p-4 flex flex-col justify-between space-y-3 relative z-0">
                <div>
                    {/* Simulate 2-line title */}
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-1" />
                    <div className="h-4 bg-gray-300 rounded w-2/3 mb-2" />

                    {/* Simulate 2-line description */}
                    <div className="h-3.5 bg-gray-300 rounded w-full mb-1" />
                    <div className="h-3.5 bg-gray-300 rounded w-5/6" />
                </div>
                <div className="h-5 bg-gray-300 rounded w-1/3 mt-3" />{" "}
                {/* Price/Action */}
            </div>
        </div>
    );
};

export default MenuPageCardSkeleton;
