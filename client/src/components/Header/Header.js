import React from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";

import logo from "../../assets/logo.png";

import {
  logoutUser,
} from "../../features/auth/authSlice";

import SearchBar from "./SearchBar";

import "./Header.css";

const Header = () => {

  const dispatch =
    useDispatch();

  const navigate =
    useNavigate();

  const {
    user,
    isAuthenticated,
  } = useSelector(
    (state) => state.auth
  );

  const cartItems =
    useSelector(
      (state) =>
        state.cart?.cartItems
    ) || [];

  const totalCartItems = cartItems?.length || 0 ;


  const handleLogout =
    () => {

      dispatch(logoutUser());

      navigate("/login");

    };

  return (

    <header className="header-wrapper sticky-top bg-primary shadow-sm">

      <div className="container-fluid custom-container py-3 px-3">

        <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap">

          {/* LOGO */}

          <Link to="/">

            <img
              src={logo}
              alt="logo"
              className="header-logo"
            />

          </Link>

          {/* SEARCH */}

          <SearchBar />

          {/* RIGHT */}

          <div className="d-flex align-items-center gap-4">

            {/* LOGIN */}

            {isAuthenticated ? (

              <div className="dropdown">

                <button
                  className="btn text-white border-0 d-flex flex-column align-items-center p-0"
                  data-bs-toggle="dropdown"
                >

                  <FaUser size={20} />

                  <small>
                    {user?.name}
                  </small>

                </button>

                <ul className="dropdown-menu dropdown-menu-end">

                  <li>

                    <Link
                      to="/profile"
                      className="dropdown-item"
                    >
                      Profile
                    </Link>

                  </li>

                  <li>

                    <Link
                      to="/orders"
                      className="dropdown-item"
                    >
                      Orders
                    </Link>

                  </li>

                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li>

                    <button
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>

                  </li>

                </ul>

              </div>

            ) : (

              <Link
                to="/login"
                className="text-decoration-none text-white d-flex flex-column align-items-center"
              >

                <FaUser size={20} />

                <small>
                  Login
                </small>

              </Link>

            )}

            {/* CART */}

            <Link
              to="/cart"
              className="text-decoration-none text-white d-flex flex-column align-items-center position-relative"
            >

              <div className="position-relative">

                <FaShoppingCart size={22} />

                <span className="cart-badge badge rounded-pill bg-danger">

                  {totalCartItems}

                </span>

              </div>

              <small>
                Cart
              </small>

            </Link>

          </div>

        </div>

      </div>

    </header>

  );

};

export default Header;