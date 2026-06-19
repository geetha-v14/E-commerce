import React from "react";

import {
    Link,
} from "react-router-dom";

const OrderSummary = ({
    cartItems = [],
    subtotal = 0,
    shipping = 0,
    total = 0,
    buttonText,
    buttonLink,
    handlePlaceOrder,
}) => {

    return (

        <div className="summary-card">


            <h3>
                Order Summary
            </h3>


            {/* <div className="summary-products">

                {cartItems.map((item) => (

                    <div
                        key={item._id}
                        className="summary-product-item"
                    >

                        <img
                            src={
                                item.images?.[0]?.url
                            }
                            alt={item.title}
                        />

                        <div className="summary-product-info">

                            <h5>
                                {item.title}
                            </h5>

                            <p>
                                Qty:
                                {" "}
                                {item.quantity}
                            </p>

                        </div>

                        <h6>
                            ₹
                            {(item.salePrice ||
                                item.price) *
                                item.quantity}
                        </h6>

                    </div>

                ))}

            </div> */}


            <div className="summary-row">

                <span>
                    Subtotal
                </span>

                <span>
                    ₹{subtotal}
                </span>

            </div>

            <div className="summary-row">

                <span>
                    Shipping
                </span>

                <span>

                    {shipping === 0
                        ? "Free"
                        : `₹${shipping}`}

                </span>

            </div>

            <hr />

            <div className="summary-total">

                <span>
                    Total
                </span>

                <span>
                    ₹{total}
                </span>

            </div>


            {handlePlaceOrder ? (

                <button
                    className="checkout-btn"
                    onClick={
                       handlePlaceOrder
                    }
                >

                    {buttonText}

                </button>

            ) : (

                <Link to={buttonLink}>

                    <button className="checkout-btn">

                        {buttonText}

                    </button>

                </Link>

            )}

        </div>

    );

};

export default OrderSummary;