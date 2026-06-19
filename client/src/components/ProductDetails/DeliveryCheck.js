import React from "react";
import { IoLocationOutline } from "react-icons/io5";


const DeliveryCheck = () => {

  return (

    <div className="delivery-check-card">

      <div className="delivery-title">

        <IoLocationOutline  className="text-muted mx-1" /> Check Delivery

      </div>

      <div className="delivery-input-wrapper">

        <input
          type="text"
          placeholder="Enter 6-digit pincode"
          className="delivery-input"
        />


      </div>

    </div>

  );

};

export default DeliveryCheck;