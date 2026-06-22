import {
    Navigate,
    Outlet,
    useLocation,
} from "react-router-dom";

import { useSelector } from "react-redux";

const ProtectedAdminRoute = () => {
    const location = useLocation();

    const {
        isAuthenticated,
        user,
        authInitialized,
    } = useSelector(
        (state) => state.auth
    );


    if (!authInitialized) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                state={{
                    from: location,
                }}
                replace
            />
        );
    }

    if (user?.role !== "admin") {
        return (
            <Navigate
                to="/"
                replace
            />
        );
    }

    return <Outlet />;
};

export default ProtectedAdminRoute;