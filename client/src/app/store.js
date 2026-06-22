import { configureStore, } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import orderReducer from "../features/order/orderSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import productReducer from "../features/Admin/productSlice";
import categoryReducer from "../features/Admin/categorySlice";
import adminOrderReducer from "../features/Admin/orderSlice";

export const store = configureStore({

  reducer: {

    auth: authReducer,

    cart: cartReducer,

    order: orderReducer,

    dashboard: dashboardReducer,

    products: productReducer,

    categories: categoryReducer,

    adminOrders: adminOrderReducer,

  },
});