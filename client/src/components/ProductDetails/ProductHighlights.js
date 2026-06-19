import React from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { RiLoopLeftFill } from "react-icons/ri";
import { RiSecurePaymentLine } from "react-icons/ri";
import { FaSackDollar } from "react-icons/fa6";





const ProductHighlights = () => {

  return (

    <div className="product-highlights">

      <div className="highlight-item">

        <div className="highlight-icon">
         <TbTruckDelivery />

        </div>

        <div>

          <h5>
            Free Delivery Available
          </h5>

          <p>
            Delivered in 1-6 days
          </p>

        </div>

      </div>

      <div className="highlight-item">

        <div className="highlight-icon">
         <RiLoopLeftFill />

        </div>

        <div>

          <h5>
            5-Day Returns
          </h5>

          <p>
            Easy return & exchange
          </p>

        </div>

      </div>

      <div className="highlight-item">

        <div className="highlight-icon">
          <RiSecurePaymentLine />

        </div>

        <div>

          <h5>
            Secure Payment
          </h5>

          <p>
            100% secure transactions
          </p>

        </div>

      </div>

      <div className="highlight-item">

        <div className="highlight-icon">
          <FaSackDollar />

        </div>

        <div>

          <h5>
            Cash on Delivery
          </h5>

          <p>
            Available for this product
          </p>

        </div>

      </div>

    </div>

  );

};

export default ProductHighlights;