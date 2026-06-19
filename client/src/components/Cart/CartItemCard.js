import React from "react";

import {
  useDispatch,
} from "react-redux";

import {
  addToCart,
  decreaseQuantity,
  removeFromCart,
} from "../../features/cart/cartSlice";

const CartItemCard = ({
  item,
}) => {

  const dispatch =
    useDispatch();

  return (

    <div className="cart-item-card">

      <img
        src={
          item.images?.[0]?.url
        }
        alt={item.title}
      />

      <div className="cart-item-info">

        <h4>
          {item.title}
        </h4>

        <p>
          {item.brand}
        </p>

        <h5>
          ₹{item.salePrice}
        </h5>
        

        {/* QUANTITY */}

        <div className="cart-quantity-bar">

          <button
            onClick={() =>
              dispatch(
                decreaseQuantity(
                  item._id
                )
              )
            }
          >

            -

          </button>

          <span>
            {item.quantity}
          </span>

          <button
            onClick={() =>
              dispatch(
                addToCart(item)
              )
            }
          >

            +

          </button>

        </div>

      

      </div>

        {/* REMOVE */}

        <button
          className="remove-btn"
          onClick={() =>
            dispatch(
              removeFromCart(
                item._id
              )
            )
          }
        >

          Remove

        </button>

    </div>

  );

};

export default CartItemCard;