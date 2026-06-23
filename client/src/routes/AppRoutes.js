import { Routes, Route, } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "../routes/ProtectedRoutes";
import Spinner from "../components/Loader/Spinner";

// Lazy load all pages
const HomePage = lazy(() => import("../pages/Home/HomePage"));
const RegisterPage = lazy(() => import("../pages/Auth/RegisterPage"));
const LoginPage = lazy(() => import("../pages/Auth/LoginPage"));
const ProfilePage = lazy(() => import("../pages/Profile/ProfilePage"));
const AllCategoriesPage = lazy(() => import("../pages/category/AllCategoriesPage"));
const CategoryProductsPage = lazy(() => import("../pages/category/CategoryProductsPage"));
const ProductDetailsPage = lazy(() => import("../pages/Product/ProductDetailsPage"));
const CartPage = lazy(() => import("../pages/Cart/CartPage"));
const CheckoutPage = lazy(() => import("../pages/Checkout/CheckoutPage"));

const AdminRoutes = lazy(() => import("../routes/Admin/AdminRoutes"));



const AppRoutes = () => {

    return (

        <Routes>

            <Route path="/" element={<Suspense fallback={<Spinner />}><HomePage /></Suspense>} />
            <Route path="/register" element={<Suspense fallback={<Spinner />}><RegisterPage /></Suspense>} />
            <Route path="/login" element={<Suspense fallback={<Spinner />}><LoginPage /></Suspense>} />


            <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<Suspense fallback={<Spinner />}><ProfilePage /></Suspense>} />
                <Route path="/cart" element={<Suspense fallback={<Spinner />}><CartPage /></Suspense>} />
                <Route path="/checkout" element={<Suspense fallback={<Spinner />}><CheckoutPage /></Suspense>} />

            </Route>




            <Route path="/category" element={<Suspense fallback={<Spinner />}><AllCategoriesPage /></Suspense>} />
            <Route path="/products" element={<Suspense fallback={<Spinner />}><CategoryProductsPage /></Suspense>} />
            <Route path="/category/:categorySlug" element={<Suspense fallback={<Spinner />}><CategoryProductsPage /></Suspense>} />
            <Route path="/category/:categorySlug/:subcategorySlug" element={<Suspense fallback={<Spinner />}><CategoryProductsPage /></Suspense>} />
            <Route path="/product/:slug" element={<Suspense fallback={<Spinner />}><ProductDetailsPage /></Suspense>} />


            <Route path="/admin/*" element={<Suspense fallback={<Spinner />}><AdminRoutes /></Suspense>} />

        </Routes>
    );
};

export default AppRoutes;