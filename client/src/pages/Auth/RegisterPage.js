import { useState, useEffect, } from "react";

import { Link, useNavigate, } from "react-router-dom";

import { useDispatch, useSelector, } from "react-redux";

import toast from "react-hot-toast";

import AuthLayout from "../../components/Auth/AuthLayout";

import AuthInput from "../../components/Auth/AuthInput";

import PasswordInput from "../../components/Auth/PasswordInput";

import { registerUser, } from "../../features/auth/authSlice";


const RegisterPage = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {
        loading,
        error,
        isAuthenticated,
    } = useSelector(
        (state) => state.auth
    );


    const [formData, setFormData] = useState({

        name: "",

        email: "",

        password: "",

    });


    const [formErrors, setFormErrors] = useState({});


    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value,

        });

    };


    const validateForm = () => {

        const errors = {};

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!formData.name) {

            errors.name = "Name is required";

        }

        if (!formData.email) {

            errors.email = "Email is required";

        }
        else if (
            !emailRegex.test(formData.email)
        ) {

            errors.email = "Invalid email";

        }

        if (!formData.password) {

            errors.password = "Password is required";

        }
        else if (
            formData.password.length < 6
        ) {

            errors.password = "Minimum 6 characters";

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


        const result = await dispatch(registerUser(formData));


        if (
            registerUser.fulfilled.match(
                result
            )
        ) {

            toast.success(
                "Registration successful"
            );

            navigate("/");

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
            title="Create Account"

            subtitle="Register to continue"
        >

            <form onSubmit={handleSubmit}>

                <AuthInput
                    label="Full Name"

                    placeholder="Enter name"

                    value={formData.name}

                    onChange={handleChange}

                    error={formErrors.name}

                    name="name"
                />


                <AuthInput
                    label="Email"

                    type="email"

                    placeholder="Enter email"

                    value={formData.email}

                    onChange={handleChange}

                    error={formErrors.email}

                    name="email"
                />


                <PasswordInput
                    label="Password"

                    placeholder="Enter password"

                    value={formData.password}

                    onChange={handleChange}

                    error={formErrors.password}

                    name="password"
                />


                <button
                    type="submit"

                    className="btn btn-dark w-100 mt-2"

                    disabled={loading}
                >

                    {
                        loading
                            ? "Please wait..."
                            : "Register"
                    }

                </button>

            </form>


            <p className="text-center mt-3">

                Already have account?

                <Link
                    to="/login"
                    className="ms-2"
                >

                    Login

                </Link>

            </p>

        </AuthLayout>
    );
};

export default RegisterPage;