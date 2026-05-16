import {React , useState}from "react";

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
  FaMapMarkerAlt,
  FaUser,
  FaHeart,
  FaSearch
} from "react-icons/fa";

import logo
  from "../../assets/logo.png";

import {
  logoutUser,
} from "../../features/auth/authSlice";


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

   const [keyword,
      setKeyword]
        = useState("");
  
  
    const handleSearch =
      (e) => {
  
        e.preventDefault();
  
        if (
          keyword.trim()
        ) {
  
          navigate(
            `/products?search=${keyword}`
          );
  
        }
  
    };


  const cartItems =
    useSelector(
      (state) =>
        state.cart?.cartItems
    ) || [];

  const handleLogout =
    () => {

      dispatch(logoutUser());

      navigate("/login");

    };


  return (

    <header
      className="bg-white border-bottom position-sticky top-0"
      style={{
        zIndex: 1000,
        
      }}
    >

      <div className="container-fluid px-lg-5 px-3 py-3">

        <div className="row align-items-center justify-content-between gy-3">

          {/* LOGO */}
          <div className="col-lg-2 col-md-3 col-12">

            <Link to="/">

              <img
                src={logo}
                alt="MegaMart"

                style={{
                  width: "170px",
                  objectFit: "contain",
                }}
              />

            </Link>

          </div>


          {/* LOCATION */}
          <div className="col-lg-2 col-md-5 col-12">

            <div className="d-flex align-items-start gap-2">

              <FaMapMarkerAlt
                className="mt-1 text-secondary"
                size={18}
              />

              <div>

                <span
                  className="text-muted fw-semibold"
                  style={{
                    fontSize: "14px",
                  }}
                >

                  Delivery to

                </span>

                <p
                  className="mb-0 fw-medium"
                  style={{
                    fontSize: "14px",
                  }}
                >

                  Add delivery location

                </p>

              </div>

            </div>

          </div>


  <div className="col-lg-2 col-md-3 col-12 " 
  style={{width:"100%" , maxWidth:"400px"}}>

        <form
          onSubmit={handleSearch}
        >

          <div className="input-group">

             <button
              className="btn btn-dark px-4"
            >

              <FaSearch />

            </button>

            <input
              type="text"

              placeholder="Search products..."

              className="form-control form-control-lg"

              value={keyword}

              onChange={(e) =>
                setKeyword(
                  e.target.value
                )
              }
            />

           

          </div>

        </form>

      </div>

          {/* RIGHT SECTION */}
          <div className="col-lg-4 col-md-4 col-12">

            <div className="d-flex justify-content-md-end align-items-center gap-3 flex-wrap">

              {/* WISHLIST */}
              <Link
                to="/wishlist"

                className="text-dark text-decoration-none position-relative"
              >

                <FaHeart size={20} />

              </Link>


              {/* CART */}
              <Link
                to="/cart"

                className="btn btn-primary position-relative d-flex align-items-center"
              >

                <FaShoppingCart
                  className="me-2"
                  size={18}
                />

                Cart

                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                >

                  {cartItems.length}

                </span>

              </Link>


              {/* AUTH */}
              {
                isAuthenticated ? (

                  <div className="dropdown">

                    <button
                      className="btn btn-outline-dark dropdown-toggle"

                      data-bs-toggle="dropdown"
                    >

                      <FaUser className="me-2" />

                      {
                        user?.name
                      }

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

                          My Orders

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

                    className="btn btn-outline-primary"
                  >

                    Login

                  </Link>

                )
              }

            </div>

          </div>

        </div>

      </div>

    </header>
  );
};

export default Header;