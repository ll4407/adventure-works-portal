import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    const account = useSelector((state) => state.account.account);

    // If the user is not logged in, redirect to the login page
    if (!account) {
        // Replaces the current entry in the history stack with the new route.
        // user cannot go back to the previous page using back button.
        return <Navigate to="/" replace={true}/>;
    }
    // If logged in, render the requested route
    return children;
};

export default ProtectedRoute;