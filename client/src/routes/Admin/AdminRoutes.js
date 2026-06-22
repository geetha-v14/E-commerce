import { Routes, Route } from "react-router-dom";

import AdminLayout from "../../layouts/Admin/AdminLayout";

import Dashboard from "../../pages/Admin/Dashboard/Dashboard";
import ProtectedAdminRoute from "./ProtectedAdminRoute";
import ProductList from "../../pages/Admin/Products/ProductList";
import CreateProduct from "../../pages/Admin/Products/CreateProduct";
import EditProduct from "../../pages/Admin/Products/EditProduct";
import CategoryList from "../../pages/Admin/Categories/CategoryList";
import CreateCategory from "../../pages/Admin/Categories/CreateCategory";
import EditCategory from "../../pages/Admin/Categories/EditCategory";
import OrderList from "../../pages/Admin/Orders/OrderList";
import OrderDetails from "../../pages/Admin/Orders/OrderDetails";

const AdminRoutes = () => {
    return (
        <Routes>
            <Route element={<ProtectedAdminRoute />}>

                <Route path="/" element={<AdminLayout />}>

                    <Route index element={<Dashboard />} />
                    <Route path="products" element={<ProductList />} />
                    <Route path="products/create" element={<CreateProduct />} />
                    <Route path="products/:id" element={<EditProduct />} />
                    <Route path="categories" element={<CategoryList />} />
                    <Route path="categories/create" element={<CreateCategory />} />
                    <Route path="categories/:id" element={<EditCategory />} />
                    <Route path="orders" element={<OrderList />} />
                    <Route path="orders/:orderId" element={<OrderDetails />} />

                </Route>

            </Route>
        </Routes>
    );
};

export default AdminRoutes;