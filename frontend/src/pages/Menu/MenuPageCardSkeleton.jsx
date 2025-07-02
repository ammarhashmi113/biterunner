const SkeletonMenuCard = () => {
    return (
        <div className="relative bg-white rounded-xl shadow-md overflow-hidden min-h-[320px] w-full">
            {/* Shimmer Layer */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer z-10" />

            {/* Simulated Image */}
            <div className="h-48 w-full bg-gray-300" />

            {/* Simulated Content */}
            <div className="p-4 space-y-3 relative z-0">
                <div className="h-6 bg-gray-300 rounded w-3/4" /> {/* Title */}
                <div className="h-4 bg-gray-300 rounded w-full" />
                <div className="h-4 bg-gray-300 rounded w-5/6" />
                <div className="h-5 bg-gray-300 rounded w-1/3 mt-2" />{" "}
                {/* Price */}
            </div>
        </div>
    );
};

export default SkeletonMenuCard;
