// components/RequireUser/RequireUser.jsx
import { useEffect } from "react";
import { useUser } from "../../contexts/userContext";
import { Navigate } from "react-router-dom";

const RequireUser = ({ children }) => {
    const { user, userLoading } = useUser();

    if (userLoading) return null;

    if (!user) return <Navigate to="/login" />;

    if (user.role !== "user") return <Navigate to="/menu" />;

    return children;
};

export default RequireUser;
