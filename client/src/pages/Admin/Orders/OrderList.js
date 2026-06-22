import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import {
    getAllOrders,
    updateOrderStatus,
} from "../../../features/Admin/orderSlice";

const OrderList = () => {

    const dispatch = useDispatch();

    const {
        orders,
        totalPages,
        totalOrders,
        loading,
    } = useSelector(
        (state) => state.adminOrders
    );

    const [page, setPage] =
        useState(1);

    const [status, setStatus] =
        useState("");

    useEffect(() => {

        dispatch(
            getAllOrders({
                page,
                limit: 10,
                status,
            })
        );

    }, [
        dispatch,
        page,
        status,
    ]);

    const handleStatusChange =
        async (
            orderId,
            newStatus
        ) => {

            try {

                await dispatch(
                    updateOrderStatus({
                        orderId,
                        status: newStatus,
                    })
                ).unwrap();

                dispatch(
                    getAllOrders({
                        page,
                        limit: 10,
                        status,
                    })
                );

            } catch (error) {

                console.log(error);

            }

        };

    const getBadgeClass =
        (status) => {

            switch (status) {

                case "DELIVERED":
                    return "bg-success";

                case "SHIPPED":
                    return "bg-primary";

                case "CANCELLED":
                    return "bg-danger";

                default:
                    return "bg-warning";

            }

        };

    return (

        <div className="container-fluid">

            <div className="card shadow-sm">

                <div className="card-header d-flex justify-content-between align-items-center">

                    <h4>
                        Orders
                    </h4>

                    <h6>
                        Total Orders:
                        {" "}
                        {totalOrders}
                    </h6>

                </div>

                <div className="card-body">

                    {/* Filter */}

                    <div className="mb-3">

                        <select
                            className="form-select"
                            value={status}
                            onChange={(e) => {

                                setStatus(
                                    e.target.value
                                );

                                setPage(1);

                            }}
                        >

                            <option value="">
                                All Orders
                            </option>

                            <option value="PROCESSING">
                                Processing
                            </option>

                            <option value="SHIPPED">
                                Shipped
                            </option>

                            <option value="DELIVERED">
                                Delivered
                            </option>

                            <option value="CANCELLED">
                                Cancelled
                            </option>

                        </select>

                    </div>

                    <div className="table-responsive">

                        <table className="table table-bordered">

                            <thead>

                                <tr>

                                    <th>
                                        Order No
                                    </th>

                                    <th>
                                        Customer
                                    </th>

                                    <th>
                                        Email
                                    </th>

                                    <th>
                                        Total
                                    </th>

                                    <th>
                                        Payment
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Date
                                    </th>

                                    <th>
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {loading ? (

                                    <tr>

                                        <td
                                            colSpan="8"
                                            className="text-center"
                                        >
                                            Loading...
                                        </td>

                                    </tr>

                                ) : orders.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="8"
                                            className="text-center"
                                        >
                                            No Orders Found
                                        </td>

                                    </tr>

                                ) : (

                                    orders.map(
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
                                                    {
                                                        order.user?.name
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        order.user?.email
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
                                                        order.paymentMethod
                                                    }
                                                </td>

                                                <td>

                                                    <span
                                                        className={`badge ${getBadgeClass(
                                                            order.orderStatus
                                                        )}`}
                                                    >
                                                        {
                                                            order.orderStatus
                                                        }
                                                    </span>

                                                </td>

                                                <td>
                                                    {
                                                        new Date(
                                                            order.createdAt
                                                        ).toLocaleDateString()
                                                    }
                                                </td>

                                                <td>

                                                    <select
                                                        className="form-select form-select-sm mb-2"
                                                        value={
                                                            order.orderStatus
                                                        }
                                                        onChange={(
                                                            e
                                                        ) =>
                                                            handleStatusChange(
                                                                order._id,
                                                                e.target.value
                                                            )
                                                        }
                                                    >

                                                        <option value="PROCESSING">
                                                            Processing
                                                        </option>

                                                        <option value="SHIPPED">
                                                            Shipped
                                                        </option>

                                                        <option value="DELIVERED">
                                                            Delivered
                                                        </option>

                                                        <option value="CANCELLED">
                                                            Cancelled
                                                        </option>

                                                    </select>

                                                    <Link
                                                        to={`/admin/orders/${order._id}`}
                                                        className="btn btn-sm btn-primary"
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

                    {/* Pagination */}

                    {totalPages > 1 && (

                        <div className="d-flex gap-2 mt-3">

                            {[
                                ...Array(
                                    totalPages
                                ),
                            ].map(
                                (
                                    _,
                                    index
                                ) => (

                                    <button
                                        key={
                                            index
                                        }
                                        className={`btn ${
                                            page ===
                                            index +
                                                1
                                                ? "btn-primary"
                                                : "btn-outline-primary"
                                        }`}
                                        onClick={() =>
                                            setPage(
                                                index +
                                                    1
                                            )
                                        }
                                    >
                                        {index + 1}
                                    </button>

                                )
                            )}

                        </div>

                    )}

                </div>

            </div>

        </div>

    );

};

export default OrderList;