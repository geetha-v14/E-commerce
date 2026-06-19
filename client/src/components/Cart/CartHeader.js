import React from "react";

const CartHeader = ({
  cartItems,
}) => {

  return (

    <div className="cart-header">

      <h2>
        Cart
      </h2>

      <h4>
        ({cartItems.length})
      </h4>

    </div>

  );

};

export default CartHeader;