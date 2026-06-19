import React from "react";

const AddressForm = ({
  formData,
  handleChange,
}) => {

  return (

    <div className="checkout-card">

      <h3>
        Delivery Address
      </h3>

      <div className="checkout-form">

        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
        />

        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
        />

        <textarea
          rows="4"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Full Address"
        />

        <div className="form-row">

          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
          />

          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            placeholder="Pincode"
          />

        </div>

        <div className="form-row">

          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="State"
          />

          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Country"
          />

        </div>

      </div>

    </div>

  );

};

export default AddressForm;