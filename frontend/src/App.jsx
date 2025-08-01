import {
    Navigate,
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import api from "./utils/axiosConfig"; // axiosConfig sets base url and adds an interceptor to add the JWT token to every request

// Bootstrap for styling
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Contexts
import { UserContext } from "./contexts/userContext";
import { CartProvider } from "./contexts/CartContext";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/Common/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
// import FirstVisitModal from "./components/FirstVisitModal";

// Pages
import LandingPage from "./pages/LandingPage/LandingPage";
import MenuPage from "./pages/MenuPage/MenuPage";
import AuthPage from "./pages/Auth/AuthPage";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminMenuManagerPage from "./pages/Admin/AdminMenuManagerPage";
import AdminOrderManagerPage from "./pages/Admin/AdminOrderManagerPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import MyOrdersPage from "./pages/MyOrdersPage/MyOrdersPage";
import ProfilePage from "./pages/ProfilePage";
import ChangePasswordPage from "./pages/ChangePasswordPage";

function App() {
    const [user, setUser] = useState(null);
    const [userLoading, setUserLoading] = useState(true);
    const fetchCurrentUser = async () => {
        try {
            const res = await api.get("/auth/me");
            setUser(res.data.user);
        } catch {
            localStorage.removeItem("token");
            setUser(null);
        } finally {
            setUserLoading(false);

            // // Force minimum loading duration for UX (TEST)
            // setTimeout(() => {
            //     setUserLoading(false);
            // }, 800); // 800ms delay
        }
    };
    // Auto-login on refresh
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetchCurrentUser();
        } else {
            setUserLoading(false); // No token? Not loading user
        }
    }, []);

    return (
        <Router>
            <UserContext.Provider value={{ user, setUser, userLoading }}>
                <CartProvider>
                    <Toaster position="top-center" reverseOrder={false} />
                    <ScrollToTop />
                    {/* Layout wrapper for sticky footer */}
                    <div className="flex flex-col min-h-screen">
                        <Navbar />

                        {/* I hit Render's API free usage limit and had to show backend API down notice modal for first-time visitors */}
                        {/* <FirstVisitModal /> */}

                        <main className="flex-1">
                            <Routes>
                                <Route path="/" element={<LandingPage />} />
                                <Route
                                    path="/login"
                                    element={
                                        user ? (
                                            <Navigate to="/menu" />
                                        ) : (
                                            <AuthPage modeType="login" />
                                        )
                                    }
                                />
                                <Route
                                    path="/register"
                                    element={
                                        user ? (
                                            <Navigate to="/menu" />
                                        ) : (
                                            <AuthPage modeType="register" />
                                        )
                                    }
                                />
                                <Route
                                    path="/change-password"
                                    element={
                                        <ProtectedRoute>
                                            <ChangePasswordPage />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/profile"
                                    element={
                                        <ProtectedRoute>
                                            <ProfilePage />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route path="/menu" element={<MenuPage />} />
                                <Route
                                    path="/cart"
                                    element={
                                        <ProtectedRoute forbidRole="admin">
                                            <CartPage />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/checkout"
                                    element={
                                        <ProtectedRoute requiredRole="user">
                                            <CheckoutPage />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/my-orders"
                                    element={
                                        <ProtectedRoute requiredRole="user">
                                            <MyOrdersPage />
                                        </ProtectedRoute>
                                    }
                                />

                                <Route
                                    path="/orders/:id"
                                    element={
                                        <ProtectedRoute requiredRole="user">
                                            <OrderConfirmationPage />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/admin/menu-management"
                                    element={
                                        <ProtectedRoute requiredRole="admin">
                                            <AdminMenuManagerPage />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/admin/order-management"
                                    element={
                                        <ProtectedRoute requiredRole="admin">
                                            <AdminOrderManagerPage />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/admin"
                                    element={
                                        <ProtectedRoute requiredRole="admin">
                                            <AdminDashboard />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="*"
                                    element={
                                        <div className="text-center py-10 text-red-600">
                                            404 - Page Not Found
                                        </div>
                                    }
                                />
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                </CartProvider>
            </UserContext.Provider>
        </Router>
    );
}

export default App;
