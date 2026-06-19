import { Routes, Route, } from "react-router-dom";
import ProtectedRoute from "../routes/ProtectedRoutes";
import HomePage from "../pages/Home/HomePage";
import RegisterPage from "../pages/Auth/RegisterPage";
import LoginPage from "../pages/Auth/LoginPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import AllCategoriesPage from "../pages/category/AllCategoriesPage";
import CategoryProductsPage from "../pages/category/CategoryProductsPage";
import ProductDetailsPage from "../pages/Product/ProductDetailsPage";
import CartPage from "../pages/Cart/CartPage";
import CheckoutPage from "../pages/Checkout/CheckoutPage";



const AppRoutes = () => {

    return (

        <Routes>

            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<ProfilePage />} />
                
            </Route>
<Route path="/cart" element={<CartPage/>} />
<Route path="/checkout" element={<CheckoutPage/>} />
            <Route path="/category" element={<AllCategoriesPage />} />
            <Route path="/products" element={<CategoryProductsPage />}/>
            <Route path="/category/:categorySlug" element={<CategoryProductsPage />} />
            <Route path="/category/:categorySlug/:subcategorySlug" element={<CategoryProductsPage />} />
            <Route path="/product/:slug" element={<ProductDetailsPage/>} />
          

        </Routes>
    );
};

export default AppRoutes;