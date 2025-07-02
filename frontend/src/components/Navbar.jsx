import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/userContext";
import { useCart } from "../contexts/CartContext";
import CartSidebar from "./Common/CartSidebar";
import ConfirmationModal from "./Common/ConfirmationModal";
import { toast } from "react-hot-toast";
import {
    UserRound,
    ChevronDown,
    ShoppingCart,
    UserPlus,
    LogIn,
    LogOut,
    UserCircle,
    ClipboardList,
    Menu as MenuIcon,
    ChefHat,
    LayoutDashboard,
} from "lucide-react";

const Navbar = () => {
    const { user, setUser } = useUser();
    const { cartItems } = useCart();
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);
    const [isCartOpen, setCartOpen] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);

    const accountRef = useRef(null);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setShowLogoutConfirm(false);
        navigate("/menu");
        toast.success("Logged out successfully.");
    };

    const cartCount = cartItems.reduce(
        (total, item) => total + (item.quantity || 1),
        0
    );

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (accountRef.current && !accountRef.current.contains(e.target)) {
                setAccountDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="bg-white shadow sticky top-0 z-50">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Left: Logo + Main links */}
                    <div className="flex items-center gap-6">
                        <Link
                            to="/"
                            className="text-2xl font-bold text-red-500"
                        >
                            Bite<span className="text-gray-700">Runner</span>
                        </Link>
                        <div className="hidden md:flex gap-4 mt-1.5">
                            <Link
                                to="/menu"
                                className="flex items-center gap-2 px-3 py-2 hover:text-green-600"
                            >
                                <ChefHat size={20} />
                                Menu
                            </Link>
                            {user?.role === "admin" && (
                                <Link
                                    to="/admin"
                                    className="flex items-center gap-2 px-3 py-2 hover:text-green-600"
                                >
                                    <LayoutDashboard size={20} />
                                    Dashboard
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Right: Account + Cart */}
                    <div className="hidden md:flex items-center space-x-6 mt-2">
                        {/* Cart (visible if not admin) */}
                        {user?.role !== "admin" && (
                            <Link
                                onClick={() => setCartOpen(true)}
                                className="relative text-gray-700 hover:text-green-600"
                                aria-label="Cart"
                            >
                                <ShoppingCart size={20} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        )}

                        {/* Account dropdown */}
                        <div className="relative" ref={accountRef}>
                            <Link
                                className="flex items-center gap-1 text-gray-700 hover:text-green-600"
                                onClick={() =>
                                    setAccountDropdownOpen((prev) => !prev)
                                }
                            >
                                <UserRound size={20} />
                                <ChevronDown
                                    size={20}
                                    className={`transition-transform ${
                                        accountDropdownOpen ? "rotate-180" : ""
                                    }`}
                                />
                            </Link>
                            {accountDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white shadow rounded-xl z-50">
                                    {user ? (
                                        <>
                                            <Link
                                                to="/profile"
                                                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                                                onClick={() =>
                                                    setAccountDropdownOpen(
                                                        false
                                                    )
                                                }
                                            >
                                                <UserCircle size={20} />
                                                Profile
                                            </Link>
                                            {user?.role === "user" && (
                                                <Link
                                                    to="/my-orders"
                                                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                                                    onClick={() =>
                                                        setAccountDropdownOpen(
                                                            false
                                                        )
                                                    }
                                                >
                                                    <ClipboardList size={20} />
                                                    My Orders
                                                </Link>
                                            )}
                                            <Link
                                                className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100"
                                                onClick={() => {
                                                    setAccountDropdownOpen(
                                                        false
                                                    );
                                                    setShowLogoutConfirm(true);
                                                }}
                                            >
                                                <LogOut size={20} />
                                                Logout
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                to="/login"
                                                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                                                onClick={() =>
                                                    setAccountDropdownOpen(
                                                        false
                                                    )
                                                }
                                            >
                                                <LogIn size={20} />
                                                Login
                                            </Link>
                                            <Link
                                                to="/register"
                                                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                                                onClick={() =>
                                                    setAccountDropdownOpen(
                                                        false
                                                    )
                                                }
                                            >
                                                <UserCircle size={20} />
                                                Register
                                            </Link>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile Hamburger */}
                    <div className="md:hidden mt-3">
                        <button
                            onClick={() => setMenuOpen((prev) => !prev)}
                            className="text-gray-700 hover:text-green-600 cursor-pointer"
                        >
                            <MenuIcon size={24} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {menuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200">
                    <div className="px-4 pt-2 pb-3 space-y-1 text-gray-700">
                        <Link
                            to="/menu"
                            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
                            onClick={() => setMenuOpen(false)}
                        >
                            <ChefHat size={20} />
                            Menu
                        </Link>

                        {user?.role === "admin" && (
                            <Link
                                to="/admin"
                                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
                                onClick={() => setMenuOpen(false)}
                            >
                                <LayoutDashboard size={20} />
                                Dashboard
                            </Link>
                        )}

                        {user?.role === "user" && (
                            <>
                                <Link
                                    to="/profile"
                                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <UserCircle size={20} />
                                    Profile
                                </Link>
                                <Link
                                    to="/my-orders"
                                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <ClipboardList size={20} />
                                    My Orders
                                </Link>
                            </>
                        )}

                        {user?.role !== "admin" && (
                            <Link
                                onClick={() => {
                                    setCartOpen(true);
                                    setMenuOpen(false);
                                }}
                                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
                            >
                                <ShoppingCart size={20} />
                                Cart
                                {cartCount > 0 && (
                                    <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        )}

                        {user ? (
                            <>
                                <Link
                                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
                                    onClick={() => {
                                        setMenuOpen(false);
                                        setShowLogoutConfirm(true);
                                    }}
                                >
                                    <LogOut size={20} />
                                    Logout
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <LogIn size={20} />
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <UserPlus size={20} />
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Cart Sidebar */}
            {user?.role !== "admin" && (
                <CartSidebar
                    isOpen={isCartOpen}
                    onClose={() => setCartOpen(false)}
                />
            )}

            {/* Logout Modal */}
            {showLogoutConfirm && (
                <ConfirmationModal
                    show={showLogoutConfirm}
                    message="Are you sure you want to logout?"
                    onCancel={() => setShowLogoutConfirm(false)}
                    onConfirm={handleLogout}
                />
            )}
        </nav>
    );
};

export default Navbar;
