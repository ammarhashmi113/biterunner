const MyOrdersCardSkeleton = () => (
    <div className="border border-gray-200 rounded-xl shadow-md bg-white p-[20.5px] animate-pulse">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Left Section */}
            <div className="flex-1 space-y-3.5">
                <div className="h-3 w-1/3 bg-gray-200 rounded" />
                <div className="h-4 w-1/2 bg-gray-200 rounded" />
                <div className="bg-gray-100 ps-[12px] pt-[12px] pb-[15px] rounded-lg border border-gray-100 space-y-2 gap-3">
                    <div className="h-3 w-1/4 bg-gray-200 rounded" />
                    <div className="flex flex-wrap gap-2">
                        {[...Array(3)].map((_, idx) => (
                            <div
                                key={idx}
                                className="h-6.5 w-20 bg-gray-200 rounded-md"
                            />
                        ))}
                    </div>
                </div>
                <div className="h-4 w-1/3 bg-gray-200 rounded" />
            </div>

            {/* Right Section */}
            <div className="flex flex-col items-start md:items-end gap-3">
                <div className="h-5 w-20 bg-gray-200 rounded-full" />
                <div className="h-3.5 w-35 bg-gray-200 rounded" />
            </div>
        </div>
    </div>
);

export default MyOrdersCardSkeleton;
