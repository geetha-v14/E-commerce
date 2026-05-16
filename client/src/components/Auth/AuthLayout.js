import { Link } from "react-router-dom";

const AuthLayout = ({
  title,
  subtitle,
  children,
}) => {

  return (

    <div className="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center">

      <div
        className="card shadow border-0 p-4"
        style={{
          width: "100%",
          maxWidth: "450px",
          borderRadius: "20px",
        }}
      >

        {/* LOGO */}
        <div className="text-center mb-4">

          <Link
            to="/"
            className="text-decoration-none"
          >

            <h2 className="fw-bold text-dark">

              MegaMart

            </h2>

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