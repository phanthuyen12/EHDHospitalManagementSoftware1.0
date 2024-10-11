import React, { useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface PrivateRouteProps {
    children: ReactNode;  // Expecting React children elements to render
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('usertoken');
        if (!token) {
            navigate('/login');  // Redirect to login if no token
        }
    }, [navigate]);

    return <>{children}</>;  // Render the protected component if the token exists
};

export default PrivateRoute;
