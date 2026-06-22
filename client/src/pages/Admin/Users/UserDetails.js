import {
    useEffect,
} from "react";

import {
    useParams,
    Link,
} from "react-router-dom";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import {
    getUserDetails,
} from "../../../features/Admin/userSlice";

const UserDetails = () => {

    const { id } =
        useParams();

    const dispatch =
        useDispatch();

    const {
        selectedUser,
        userOrders,
        loading,
    } = useSelector(
        (state) =>
            state.adminUsers
    );




    useEffect(() => {

        dispatch(
            getUserDetails(id)
        );

    }, [dispatch, id]);

    if (
        loading ||
        !selectedUser
    ) {

        return (
            <div>
                Loading...
            </div>
        );

    }

    return (

        <div className="container-fluid">

            <div className="d-flex justify-content-between mb-3">

                <h3>
                    User Details
                </h3>

                <Link
                    to="/admin/users"
                    className="btn btn-secondary"
                >
                    Back
                </Link>

            </div>

            <div className="row mb-3">

                <div className="col-md-4">

                    <div className="card">

                        <div className="card-body">

                            <h6>
                                Orders
                            </h6>

                            <h3>
                                {userOrders.length}
                            </h3>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card">

                        <div className="card-body">

                            <h6>
                                Addresses
                            </h6>

                            <h3>
                                {selectedUser.addresses?.length || 0}
                            </h3>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card">

                        <div className="card-body">

                            <h6>
                                Wishlist Items
                            </h6>

                            <h3>
                                {selectedUser.wishlist?.length || 0}
                            </h3>

                        </div>

                    </div>

                </div>

            </div>

            <div className="card mb-3">

                <div className="card-header">
                    User Information
                </div>

                <div className="card-body">

                    <p>
                        <strong>Name:</strong>
                        {" "}
                        {selectedUser.name}
                    </p>

                    <p>
                        <strong>Email:</strong>
                        {" "}
                        {selectedUser.email}
                    </p>

                    <p>
                        <strong>Role:</strong>
                        {" "}
                        {selectedUser.role}
                    </p>

                    <p>
                        <strong>Status:</strong>
                        {" "}
                        {selectedUser.isBlocked
                            ? "Blocked"
                            : "Active"}
                    </p>

                    <p>
                        <strong>Verified:</strong>
                        {" "}
                        {selectedUser.isEmailVerified
                            ? "Yes"
                            : "No"}
                    </p>

                    <p>
                        <strong>Joined:</strong>
                        {" "}
                        {new Date(
                            selectedUser.createdAt
                        ).toLocaleDateString()}
                    </p>

                </div>

            </div>

            <div className="card mb-3">

                <div className="card-header">
                    Addresses
                </div>

                <div className="card-body">

                    {
                        selectedUser.addresses
                            ?.length === 0
                            ? (
                                <p>
                                    No addresses
                                </p>
                            )
                            : (
                                selectedUser.addresses.map(
                                    (
                                        address
                                    ) => (

                                        <div
                                            key={
                                                address._id
                                            }
                                            className="border rounded p-2 mb-2"
                                        >

                                            <strong>
                                                {
                                                    address.fullName
                                                }
                                            </strong>

                                            <br />

                                            {
                                                address.phone
                                            }

                                            <br />

                                            {
                                                address.addressLine1
                                            }

                                            <br />

                                            {
                                                address.city
                                            }
                                            ,
                                            {
                                                address.state
                                            }

                                        </div>

                                    )
                                )
                            )
                    }

                </div>

            </div>
            <div className="card mb-3">

                <div className="card-header">
                    Wishlist
                </div>

                <div className="card-body">

                    {
                        selectedUser.wishlist
                            ?.length === 0
                            ? (
                                <p>
                                    Empty wishlist
                                </p>
                            )
                            : (
                                <div className="row">

                                    {
                                        selectedUser.wishlist.map(
                                            (
                                                item
                                            ) => (

                                                <div
                                                    key={
                                                        item._id
                                                    }
                                                    className="col-md-3 mb-3"
                                                >

                                                    <div className="card">

                                                        <img
                                                            src={
                                                                item.images?.[0]?.url ||
                                                                null
                                                            }
                                                            alt={
                                                                item.title
                                                            }
                                                            height="150"
                                                        />

                                                        <div className="card-body">

                                                            <h6>
                                                                {
                                                                    item.title
                                                                }
                                                            </h6>

                                                            ₹
                                                            {
                                                                item.price
                                                            }

                                                        </div>

                                                    </div>

                                                </div>

                                            )
                                        )
                                    }

                                </div>
                            )
                    }

                </div>

            </div>
            <div className="card">

                <div className="card-header">
                    Orders
                </div>

                <div className="card-body">

                    <table className="table">

                        <thead>

                            <tr>

                                <th>
                                    Order
                                </th>

                                <th>
                                    Amount
                                </th>

                                <th>
                                    Status
                                </th>

                                <th>
                                    Date
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {userOrders.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="4"
                                        className="text-center"
                                    >
                                        No Orders Found
                                    </td>

                                </tr>

                            ) : (

                                userOrders.map(
                                    (
                                        order
                                    ) => (

                                        <tr
                                            key={
                                                order._id
                                            }
                                        >

                                            <td>
                                                {
                                                    order.orderNumber
                                                }
                                            </td>

                                            <td>
                                                ₹
                                                {
                                                    order.totalAmount
                                                }
                                            </td>

                                            <td>
                                                {
                                                    order.orderStatus
                                                }
                                            </td>

                                            <td>
                                                {
                                                    new Date(
                                                        order.createdAt
                                                    ).toLocaleDateString()
                                                }
                                            </td>

                                        </tr>

                                    )
                                )
                            )
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

};

export default UserDetails;