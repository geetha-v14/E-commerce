const AuthInput = ({

    label,
    name,
    type = "text",
    placeholder,
    value,
    onChange,
    error,

}) => {

    return (

        <div className="mb-3">

            <label className="form-label">

                {label}

            </label>

            <input
                type={type}

                name={name}

                placeholder={placeholder}

                value={value}

                onChange={onChange}

                className={`form-control ${error
                        ? "is-invalid"
                        : ""
                    }`}
            />

            {
                error && (

                    <div className="invalid-feedback">

                        {error}

                    </div>

                )
            }

        </div>
    );
};

export default AuthInput;