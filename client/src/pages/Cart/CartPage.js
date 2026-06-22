import React from "react";

import {
    useSelector,
} from "react-redux";

import UserLayout from "../../layouts/User/UserLayout";

import CartHeader from "../../components/Cart/CartHeader";

import CartItemCard from "../../components/Cart/CartItemCard";

import OrderSummary from "../../components/Order/OrderSummary";

import EmptyCart from "../../components/Cart/EmptyCart";

import "./CartPage.css";

const CartPage = () => {

    const { cartItems } =
        useSelector(
            (state) => state.cart
        );

    /* =========================
        SUBTOTAL
    ========================= */

    const subtotal =
        cartItems.reduce(
            (acc, item) =>
                acc +
                item.salePrice *
                item.quantity,
            0
        );
    const shipping = subtotal > 999 ? 0 : 99;

    const total = subtotal + shipping;

    return (

        <UserLayout>

            <div className="cart-page container">

                <div className="cart-layout">

                    {/* ======================
              LEFT
          ====================== */}

                    <div className="cart-left">

                        <CartHeader
                            cartItems={cartItems}
                        />

                        {cartItems.length ===
                            0 ? (

                            <EmptyCart />

                        ) : (

                            cartItems.map(
                                (item) => (

                                    <CartItemCard
                                        key={item._id}
                                        item={item}
                                    />

                                )
                            )

                        )}

                    </div>


                    <div className="cart-right">

                        <OrderSummary
                            cartItems={cartItems}
                            subtotal={subtotal}
                            shipping={shipping}
                            total={total}
                            buttonText="Proceed To Checkout"
                            buttonLink="/checkout"
                        />
                    </div>

                </div>

            </div>

        </UserLayout>

    );

};

export default CartPage;