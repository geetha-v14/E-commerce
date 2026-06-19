import React from "react";

const PaymentMethod = ({
  selectedPayment,
  setSelectedPayment,
}) => {

  return (

    <div className="checkout-card">

      <h3>
        Payment Method
      </h3>

      <div className="payment-options">

        <label className="payment-option">

          <input
            type="radio"
            checked={
              selectedPayment === "cod"
            }
            onChange={() =>
              setSelectedPayment(
                "cod"
              )
            }
          />

          <span>
            Cash On Delivery
          </span>

        </label>

        <label className="payment-option">

          <input
            type="radio"
            checked={
              selectedPayment ===
              "razorpay"
            }
            onChange={() =>
              setSelectedPayment(
                "razorpay"
              )
            }
          />

          <span>
            Razorpay
          </span>

        </label>

      </div>

    </div>

  );

};

export default PaymentMethod;