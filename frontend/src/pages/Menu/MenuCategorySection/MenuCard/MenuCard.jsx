// components/MenuCard.jsx

const MenuCard = ({ item, onClick, isAdmin }) => {
    return (
        <div
            onClick={onClick}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden"
        >
            <img
                src={item.imageUrl}
                alt={item.name}
                className="h-36 sm:h-40 md:h-44 w-full object-cover"
            />
            <div className="p-3 sm:p-4">
                <h3 className="text-base sm:text-lg font-semibold line-clamp-1">
                    {item.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                    {item.description}
                </p>
                <div className="mt-4 flex justify-between items-center text-xs sm:text-sm">
                    <span className="font-bold text-white bg-green-800 rounded px-1.5 py-0.5 text-xs sm:text-sm">
                        Rs. {item.price}
                    </span>
                    {isAdmin ? (
                        <span className="text-white bg-red-500 rounded px-1.5 py-0.5 text-xs sm:text-sm">
                            Admin
                        </span>
                    ) : (
                        <span className="text-white bg-red-600 rounded px-1.5 py-0.5 text-xs sm:text-sm">
                            Add to cart
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MenuCard;
