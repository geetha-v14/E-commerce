import { useState } from "react";

const PasswordInput = ({

    label,

    name,

    placeholder,

    value,

    onChange,

    error,

}) => {

    const [showPassword, setShowPassword] = useState(false);

    return (

        <div className="mb-3">

            <label className="form-label">

                {label}

            </label>

            <div className="input-group">

                <input
                    type={
                        showPassword
                            ? "text"
                            : "password"
                    }

                    name={name}

                    placeholder={placeholder}

                    value={value}

                    onChange={onChange}

                    className={`form-control ${error
                            ? "is-invalid"
                            : ""
                        }`}
                />

                <button
                    type="button"

                    className="btn btn-outline-secondary"

                    onClick={() => setShowPassword(!showPassword)}
                >

                    {
                        showPassword
                            ? "Hide"
                            : "Show"
                    }

                </button>

            </div>

            {
                error && (

                    <div className="text-danger small mt-1">

                        {error}

                    </div>

                )
            }

        </div>
    );
};

export default PasswordInput;