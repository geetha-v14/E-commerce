import React from "react";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import {
    addToCart,
    decreaseQuantity,
} from "../../features/cart/cartSlice";

import "./CartButton.css";

const CartButton = ({
    product,
}) => {

    const dispatch = useDispatch();

    const cartItems = useSelector(
        (state) => state.cart.cartItems
    );

    const existingProduct =
        cartItems.find(
            (item) =>
                item._id === product._id
        );

    const quantity =
        existingProduct?.quantity || 0;

    return (

        <div className="cart-btn-wrapper">

            {quantity === 0 ? (

                <button
                    className="add-cart-main-btn"
                    onClick={() =>
                        dispatch(addToCart(product))
                    }
                >

                    Add To Cart

                </button>

            ) : (

                <div className="quantity-bar">

                    <button
                        onClick={() =>
                            dispatch(
                                decreaseQuantity(
                                    product._id
                                )
                            )
                        }
                    >

                        -

                    </button>

                    <span>{quantity}</span>


                    <button
                        onClick={() =>
                            dispatch(addToCart(product))
                        }
                    >

                        +

                    </button>

                </div>

            )}

        </div>

    );

};

export default CartButton;