import React from "react";

import {
  Link,
} from "react-router-dom";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

import "./Footer.css";


const Footer = () => {

  return (

    <footer className="footer bg-dark text-light pt-5">

      <div className="container">

        <div className="row gy-4 justify-content-center">

          {/* ======================
              BRAND
          ====================== */}

          {/* <div className="col-lg-4 col-md-6">

            <Link to="/">

              <img
                src={logo}
                alt="logo"
                className="header-logo"
              />

            </Link>

            <p className="text-light-emphasis">

              Modern ecommerce platform
              for furniture, kitchenware,
              appliances and home
              essentials.

            </p>

           

          </div> */}

          {/* ======================
              SHOP
          ====================== */}

          <div className="col-lg-3 col-md-6">

            <h5 className="mb-3">

              Shop

            </h5>

            <div className="d-flex flex-column gap-2">

              <Link to="/">
                Kitchenware
              </Link>

              <Link to="/">
                Furniture
              </Link>

              <Link to="/">
                Home Appliances
              </Link>

              <Link to="/">
                Home Essentials
              </Link>

            </div>

          </div>

          {/* ======================
              SUPPORT
          ====================== */}

          <div className="col-lg-3 col-md-6">

            <h5 className="mb-3">

              Support

            </h5>

            <div className="d-flex flex-column gap-2">

              <Link to="/">
                Contact Us
              </Link>

              <Link to="/">
                FAQs
              </Link>

              <Link to="/">
                Shipping Policy
              </Link>

              <Link to="/">
                Return Policy
              </Link>

            </div>

          </div>

          {/* ======================
              CONTACT
          ====================== */}

          <div className="col-lg-3 col-md-6">

            <h5 className="mb-3">

              Contact

            </h5>

            <p className="mb-2">

               Chennai, India

            </p>

            <p className="mb-2">

               +91 9876543210

            </p>

            <p>

              ✉ support@megamart.com

            </p>
 <div className="d-flex gap-3 mt-4">

              <a
                href="/"
                className="social-icon"
              >

                <FaFacebookF />

              </a>

              <a
                href="/"
                className="social-icon"
              >

                <FaInstagram />

              </a>

              <a
                href="/"
                className="social-icon"
              >

                <FaTwitter />

              </a>

              <a
                href="/"
                className="social-icon"
              >

                <FaYoutube />

              </a>

            </div>
            

          </div>

        </div>

        {/* ======================
            BOTTOM
        ====================== */}

        <div className="footer-bottom text-center mt-5 py-3">

          <p className="mb-0 text-light-emphasis">

            © 2026 MegaMart.
            All Rights Reserved.

          </p>

          

        </div>

      </div>

    </footer>

  );

};

export default Footer;