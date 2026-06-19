import React, { useState } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import MainLayout from "../../layouts/MainLayout/MainLayout";

import {
  saveShippingAddress,
  savePaymentMethod,
} from "../../features/order/orderSlice";

import AddressForm from "../../components/Checkout/AddressForm";

import PaymentMethod from "../../components/Checkout/PaymentMethod";

import OrderSummary from "../../components/Order/OrderSummary";

import "./CheckoutPage.css";

const CheckoutPage = () => {

  const dispatch = useDispatch();

  const { cartItems } = useSelector(
    (state) => state.cart
  );

  /* =========================
      STATES
  ========================= */

  const [selectedPayment, setSelectedPayment] =
    useState("cod");

  const [formData, setFormData] =
    useState({
      fullName: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  const subtotal = cartItems.reduce(
    (acc, item) =>
      acc +
      (item.salePrice || item.price) *
        item.quantity,
    0
  );

  const shipping =
    subtotal > 999 ? 0 : 99;

  const total = subtotal + shipping;


  const handlePlaceOrder = () => {

    dispatch(
      saveShippingAddress(formData)
    );

    dispatch(
      savePaymentMethod(
        selectedPayment
      )
    );

    console.log("Proceed");

  };

  return (

    <MainLayout>

      <div className="checkout-page container">

        <h2 className="checkout-title">

          Checkout

        </h2>

        <div className="checkout-layout">


          <div className="checkout-left">

            <AddressForm
              formData={formData}
              handleChange={
                handleChange
              }
            />

            <PaymentMethod
              selectedPayment={
                selectedPayment
              }
              setSelectedPayment={
                setSelectedPayment
              }
            />

          </div>

          <div className="checkout-right">

            <OrderSummary
              cartItems={cartItems}
              subtotal={subtotal}
              shipping={shipping}
              total={total}
              buttonText="Place Order"
              handlePlaceOrder={
                handlePlaceOrder
              }
            />

          </div>

        </div>

      </div>

    </MainLayout>

  );

};

export default CheckoutPage;