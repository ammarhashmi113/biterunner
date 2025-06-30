// components/MenuCard.jsx

// const MenuCard = ({ item, onClick, isAdmin }) => {
//     return (
//         <div
//             onClick={onClick}
//             className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer overflow-hidden min-h-[320px]"
//         >
//             <img
//                 src={item.imageUrl}
//                 alt={item.name}
//                 className="h-48 w-full object-cover"
//             />
//             <div className="p-4">
//                 <h3 className="text-xl font-semibold">{item.name}</h3>
//                 <p className="text-gray-600">
//                     {item.description.slice(0, 50)}...
//                 </p>
//                 <div className="mt-5 flex justify-between items-center">
//                     <span className="text-sm font-bold text-white bg-green-800 rounded pl-2 pr-2">
//                         Rs. {item.price}
//                     </span>
//                     {isAdmin && (
//                         <span className="text-xs text-white bg-blue-600 px-2 py-1 rounded">
//                             Admin
//                         </span>
//                     )}
//                     {!isAdmin && (
//                         <span className="text-xs text-white bg-red-600 px-2 py-1 rounded">
//                             Add to cart
//                         </span>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

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
