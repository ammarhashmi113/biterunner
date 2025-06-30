import { Link } from "react-router-dom";
import { LayoutDashboard, UtensilsCrossed, ClipboardList } from "lucide-react";

const AdminDashboard = () => {
    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-2">
                <LayoutDashboard size={28} />
                Admin Dashboard
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {/* Menu Management */}
                <Link
                    to="/admin/menu-management"
                    className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                >
                    <div className="p-3 rounded-full bg-green-100 text-green-700">
                        <UtensilsCrossed size={24} />
                    </div>
                    <span className="text-lg font-medium text-gray-700">
                        Manage Menu
                    </span>
                </Link>

                {/* Order Management */}
                <Link
                    to="/admin/order-management"
                    className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                >
                    <div className="p-3 rounded-full bg-blue-100 text-blue-700">
                        <ClipboardList size={24} />
                    </div>
                    <span className="text-lg font-medium text-gray-700">
                        Manage Orders
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default AdminDashboard;
