// components/ProtectedRoute.jsx
import { useUser } from "../../contexts/userContext";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const ProtectedRoute = ({ children, requiredRole, forbidRole }) => {
    const { user, userLoading } = useUser();

    if (userLoading)
        return (
            <div className="mx-auto w-fit mt-35 text-center py-10">
                <Loader2
                    size={18}
                    className="animate-spin mx-auto text-blue-500"
                />
                <p>Loading...</p>
            </div>
        );

    if (!user) return <Navigate to="/login" />;

    if (requiredRole && user.role !== requiredRole)
        return <Navigate to="/menu" />;

    if (forbidRole && user.role === forbidRole) return <Navigate to="/menu" />;

    return children;
};

export default ProtectedRoute;
