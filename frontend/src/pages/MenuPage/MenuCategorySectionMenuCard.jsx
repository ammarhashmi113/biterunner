// components/MenuCard.jsx

import { Plus } from "lucide-react";

const MenuCategorySectionMenuCard = ({ item, onClick, isAdmin }) => {
    return (
        <div
            onClick={onClick}
            className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden flex flex-col transition-opacity duration-500 opacity-0 animate-fadeIn h-[258px] sm:h-[374px] md:h-[390px]"
        >
            <div className="w-full h-32 sm:h-48 md:h-52 overflow-hidden shrink-0">
                <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
            </div>

            <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-1 line-clamp-1 sm:line-clamp-1">
                        {item.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                        {item.description}
                    </p>
                </div>

                <div className="mt-4 flex justify-between items-center text-sm min-w-0">
                    <span className="font-bold text-white bg-green-700 rounded-full px-2 py-1 whitespace-nowrap text-xs sm:text-sm">
                        Rs. {item.price}
                    </span>

                    {isAdmin ? (
                        <span className="text-white bg-red-500 rounded-full px-2 py-1 text-xs sm:text-sm whitespace-nowrap">
                            Admin
                        </span>
                    ) : (
                        <span
                            title="View details"
                            className="text-white bg-red-600 rounded-full p-1 sm:px-2 sm:py-1 flex items-center gap-1 text-sm"
                        >
                            <Plus className="w-4 h-4" />
                            <span className="hidden sm:inline">Details</span>
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MenuCategorySectionMenuCard;
