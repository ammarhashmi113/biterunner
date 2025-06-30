// components/RestrictAdmin/RestrictAdmin.jsx
import { useEffect } from "react";
import { useUser } from "../../contexts/userContext";
import { Navigate } from "react-router-dom";

const RestrictAdmin = ({ children }) => {
    const { user, userLoading } = useUser();

    if (userLoading) return null;

    if (user?.role === "admin") return <Navigate to="/menu" />;

    return children;
};

export default RestrictAdmin;
