import { useEffect } from "react";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import {
    getDashboardStats,
} from "../../../features/dashboard/dashboardSlice";

import StatCard from "../../../components/Admin/StatCard";
import RecentOrdersTable from "../../../components/Admin/RecentOrdersTable";

const Dashboard = () => {

    const dispatch = useDispatch();

    const {
        stats,
        loading,

    } = useSelector(
        (state) => state.dashboard
    );

    useEffect(() => {
        dispatch(getDashboardStats());
    }, [dispatch]);

    if (loading) {
        return <h4>Loading...</h4>;
    }

    return (
        <div>

            <h2 className="mb-4">
                Dashboard
            </h2>

            <div className="row g-3">

                <div className="col-md-3">
                    <StatCard
                        title="Total Revenue"
                        value={`₹${stats?.totalRevenue || 0}`}
                    />
                </div>

                <div className="col-md-3">
                    <StatCard
                        title="Total Orders"
                        value={stats?.totalOrders || 0}
                    />
                </div>

                <div className="col-md-3">
                    <StatCard
                        title="Total Users"
                        value={stats?.totalUsers || 0}
                    />
                </div>

                <div className="col-md-3">
                    <StatCard
                        title="Total Products"
                        value={stats?.totalProducts || 0}
                    />
                </div>
            </div>

            {/* Recent Orders */}
            <RecentOrdersTable
                orders={stats?.recentOrders || []}
            />


        </div>
    );
};

export default Dashboard;