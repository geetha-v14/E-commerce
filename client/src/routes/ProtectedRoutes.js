import {
    Navigate,
    Outlet,
    useLocation,
} from "react-router-dom";

import { useSelector, } from "react-redux";


const ProtectedRoute = () => {

    const location = useLocation();

    const { isAuthenticated, } = useSelector((state) => state.auth);


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

    return <Outlet />;
};

export default ProtectedRoute;