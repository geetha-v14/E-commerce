import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const AuthLayout = ({
  title,
  subtitle,
  children,
}) => {

  return (

    <div className="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center ">

      <div
        className="card border-0 shadow p-4"
        style={{
          width: "100%",
          maxWidth: "450px",
         
        }}
      >

        {/* LOGO */}
        <div className="text-center mb-4">

          <Link
            to="/"
            className="text-decoration-none"
          >

            <img
              src={logo}
              alt="logo"
              className="header-logo"
            />



          </Link>

          <h4 className="fw-bold mt-3">

            {title}

          </h4>

          <p className="text-muted">

            {subtitle}

          </p>

        </div>

        {children}

      </div>

    </div>
  );
};

export default AuthLayout;