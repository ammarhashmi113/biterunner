import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../contexts/userContext";

import { Loader2 } from "lucide-react";

const RequireAdmin = ({ children }) => {
    const { user, userLoading } = useUser();

    if (userLoading)
        return (
            <div className="mx-auto w-fit mt-35">
                <Loader2
                    size={18}
                    className="animate-spin mx-auto w-fit text-blue-500"
                />
                <p>Checking Permissions</p>
            </div>
        );

    if (!user) return <Navigate to="/login" />;
    if (user.role !== "admin") return <Navigate to="/menu" />;

    return children;
};

export default RequireAdmin;
