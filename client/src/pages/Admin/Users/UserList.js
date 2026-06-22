import {
    useEffect,
    useState,
} from "react";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import { Link } from "react-router-dom";

import {
    getUsers, changeUserRole, toggleUserBlock,
} from "../../../features/Admin/userSlice";

const UserList = () => {

    const dispatch =
        useDispatch();

    const {
        users,
        total,
        totalPages,
        loading,
    } = useSelector(
        (state) => state.adminUsers
    );

    const [page, setPage] =
        useState(1);

    const [search, setSearch] =
        useState("");

    const handleBlockToggle =
        async (
            userId
        ) => {
            try {
                await dispatch(
                    toggleUserBlock({
                        id: userId,
                    })
                ).unwrap();
                dispatch(
                    getUsers({
                        page,
                        limit: 10,
                        search,
                    })
                );
            } catch (error) {
                console.log(error);
            }
        };

    const handleRoleChange =
        async (
            userId,
            role
        ) => {

            try {

                await dispatch(
                    changeUserRole({
                        id: userId,
                        role,
                    })
                ).unwrap();

                dispatch(
                    getUsers({
                        page,
                        limit: 10,
                        search,
                    })
                );

            } catch (error) {

                console.log(error);

            }

        };

    useEffect(() => {

        dispatch(
            getUsers({
                page,
                limit: 10,
                search,
            })
        );

    }, [
        dispatch,
        page,
        search,
    ]);

    return (
        <div>

            <div className="row mb-4">

                <div className="col-md-4">

                    <div className="card">
                        <div className="card-body">
                            <h5>Total Users</h5>
                            <h3>{total}</h3>
                        </div>
                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card">
                        <div className="card-body">
                            <h5>Admins</h5>

                            <h3>
                                {
                                    users.filter(
                                        (user) =>
                                            user.role === "admin"
                                    ).length
                                }
                            </h3>
                        </div>
                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card">
                        <div className="card-body">
                            <h5>Customers</h5>

                            <h3>
                                {
                                    users.filter(
                                        (user) =>
                                            user.role === "user"
                                    ).length
                                }
                            </h3>
                        </div>
                    </div>

                </div>

            </div>

            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search users..."
                value={search}
                onChange={(e) => {

                    setSearch(
                        e.target.value
                    );

                    setPage(1);

                }}
            />

            <div className="table-responsive">

                <table className="table table-bordered">

                    <thead>

                        <tr>

                            <th>Name</th>

                            <th>Email</th>

                            <th>Role</th>

                            <th>Verified</th>

                            <th>Status</th>

                            <th>Joined</th>

                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {loading ? (

                            <tr>

                                <td
                                    colSpan="7"
                                    className="text-center"
                                >
                                    Loading...
                                </td>

                            </tr>

                        ) : users.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="7"
                                    className="text-center"
                                >
                                    No Users Found
                                </td>

                            </tr>

                        ) : (

                            users.map(
                                (user) => (

                                    <tr key={user._id}>

                                        <td>
                                            {user.name}
                                        </td>

                                        <td>
                                            {user.email}
                                        </td>

                                        <td>

                                            <span
                                                className={`badge ${user.role === "admin"
                                                    ? "bg-danger"
                                                    : "bg-primary"
                                                    }`}
                                            >
                                                {user.role}
                                            </span>

                                        </td>

                                        <td>

                                            <span
                                                className={`badge ${user.isEmailVerified
                                                    ? "bg-success"
                                                    : "bg-warning"
                                                    }`}
                                            >
                                                {user.isEmailVerified
                                                    ? "Verified"
                                                    : "Pending"}
                                            </span>

                                        </td>

                                        <td>

                                            <span
                                                className={`badge ${user.isBlocked
                                                    ? "bg-danger"
                                                    : "bg-success"
                                                    }`}
                                            >
                                                {user.isBlocked
                                                    ? "Blocked"
                                                    : "Active"}
                                            </span>

                                        </td>

                                        <td>

                                            {
                                                new Date(
                                                    user.createdAt
                                                ).toLocaleDateString()
                                            }

                                        </td>

                                        <td>

                                            {/* Role Change */}

                                            <select
                                                className="form-select form-select-sm mb-2"
                                                value={user.role}
                                                onChange={(e) =>
                                                    handleRoleChange(
                                                        user._id,
                                                        e.target.value
                                                    )
                                                }
                                            >

                                                <option value="user">
                                                    User
                                                </option>

                                                <option value="admin">
                                                    Admin
                                                </option>

                                            </select>

                                            <button
                                                className={`btn btn-sm ${user.isBlocked
                                                    ? "btn-success"
                                                    : "btn-danger"
                                                    }`}
                                                onClick={() =>
                                                    handleBlockToggle(
                                                        user._id
                                                    )
                                                }
                                            >
                                                {user.isBlocked
                                                    ? "Unblock"
                                                    : "Block"}
                                            </button>

                                            <Link
                                                to={`/admin/users/${user._id}`}
                                                className="btn btn-primary btn-sm me-2"
                                            >
                                                View
                                            </Link>

                                        </td>

                                    </tr>

                                )
                            )

                        )}

                    </tbody>

                </table>

            </div>

            {totalPages > 1 && (

                <div className="d-flex gap-2 mt-3">

                    {[...Array(totalPages)]
                        .map((_, index) => (

                            <button
                                key={index}
                                className={`btn ${page === index + 1
                                    ? "btn-primary"
                                    : "btn-outline-primary"
                                    }`}
                                onClick={() =>
                                    setPage(index + 1)
                                }
                            >
                                {index + 1}
                            </button>

                        ))}

                </div>

            )}

        </div>
    );
};

export default UserList;