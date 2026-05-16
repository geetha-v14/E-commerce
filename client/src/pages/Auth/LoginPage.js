import { useState, useEffect, } from "react";

import { Link, useNavigate, useLocation, } from "react-router-dom";

import { useDispatch, useSelector, } from "react-redux";

import toast from "react-hot-toast";

import AuthLayout from "../../components/Auth/AuthLayout";

import AuthInput from "../../components/Auth/AuthInput";

import PasswordInput from "../../components/Auth/PasswordInput";

import { loginUser, } from "../../features/auth/authSlice";


const LoginPage = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();


  const from = location.state?.from?.pathname || "/";


  const {
    loading,
    error,
    isAuthenticated,
  } = useSelector(
    (state) => state.auth
  );


  const [formData, setFormData] = useState({

    email: "",

    password: "",

  });


  const [formErrors, setFormErrors] = useState({});


  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };


  const validateForm = () => {

    const errors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!formData.email) {

      errors.email = "Email is required";

    }
    else if (
      !emailRegex.test(
        formData.email
      )
    ) {

      errors.email =
        "Invalid email";

    }


    if (!formData.password) {

      errors.password =
        "Password is required";

    }

    return errors;

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    const errors = validateForm();

    setFormErrors(errors);

    if (
      Object.keys(errors)
        .length > 0
    ) {
      return;
    }


    const result = await dispatch(loginUser(formData));


    if (loginUser.fulfilled.match(result)
    ) {

      toast.success("Login successful");

      navigate(from, { replace: true, });

    }

  };


  useEffect(() => {

    if (error) {

      toast.error(error);

    }

  }, [error]);


  useEffect(() => {

    if (isAuthenticated) {

      navigate("/");

    }

  }, [
    isAuthenticated,
    navigate,
  ]);


  return (

    <AuthLayout

      title="Welcome Back"

      subtitle="Login to continue"
    >

      <form
        onSubmit={handleSubmit}
      >

        <AuthInput
          label="Email"

          type="email"

          name="email"

          placeholder="Enter email"

          value={formData.email}

          onChange={handleChange}

          error={formErrors.email}
        />


        <PasswordInput
          label="Password"

          name="password"

          placeholder="Enter password"

          value={formData.password}

          onChange={handleChange}

          error={formErrors.password}
        />


        <div className="text-end mb-3">

          <Link
            to="/forgot-password"
            className="text-decoration-none small"
          >

            Forgot Password?

          </Link>

        </div>


        <button
          type="submit"

          className="btn btn-dark w-100"

          disabled={loading}
        >

          {
            loading
              ? "Please wait..."
              : "Login"
          }

        </button>

      </form>


      <p className="text-center mt-3">

        Don't have account?

        <Link
          to="/register"
          className="ms-2"
        >

          Register

        </Link>

      </p>

    </AuthLayout>
  );
};

export default LoginPage;