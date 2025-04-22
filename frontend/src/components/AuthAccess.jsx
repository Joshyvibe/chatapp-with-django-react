import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../auth";

function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuthentication();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated === null) return; // Wait for authentication check to complete

        if (!isAuthenticated) {
            // Redirect to login if the user is not authenticated
            navigate('/login');
        } else if (isAuthenticated && (window.location.pathname === '/login' || window.location.pathname === '/register')) {
            // Redirect to chats if the user is authenticated but on login/register page
            navigate('/chats');
        }
    }, [isAuthenticated, navigate]);

    if (isAuthenticated === null) {
        // Show loading indicator while authentication status is being checked
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        // Do not render children if user is unauthenticated
        return null;
    }

    // Render children if authenticated
    return children;
}

export default ProtectedRoute;