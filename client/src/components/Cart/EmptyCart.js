import React from "react";

import {
  Link,
} from "react-router-dom";

const EmptyCart = () => {

  return (

    <div className="empty-cart">

      <h3>
        Your cart is empty
      </h3>

      <Link to="/">

        Continue Shopping

      </Link>

    </div>

  );

};

export default EmptyCart;