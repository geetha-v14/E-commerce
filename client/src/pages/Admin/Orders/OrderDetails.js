import {
    useEffect,
} from "react";

import {
    useParams,
    Link,
} from "react-router-dom";


import {getOrderDetails,} from "../../../features/Admin/orderSlice";

import { useDispatch, useSelector } from "react-redux";

const OrderDetails = () => {

    const { orderId } = useParams();

    const dispatch = useDispatch();

    const {
        selectedOrder,
        loading,
    } = useSelector(
        (state) =>
            state.adminOrders
    );


    useEffect(() => {

        dispatch(
            getOrderDetails(
                orderId
            )
        );

    }, [
        dispatch,
        orderId,
    ]);

    if (loading) {

        return (
            <div className="container-fluid">
                Loading...
            </div>
        );

    }

    if (!selectedOrder) {

        return (
            <div className="container-fluid">
                Order not found
            </div>
        );

    }

    return (

        <div className="container-fluid">

            <div className="d-flex justify-content-between mb-3">

                <h3>
                    Order Details
                </h3>

                <Link
                    to="/admin/orders"
                    className="btn btn-secondary"
                >
                    Back
                </Link>

            </div>

            {/* Order Info */}

            <div className="card mb-3">

                <div className="card-header">
                    Order Information
                </div>

                <div className="card-body">

                    <p>
                        <strong>
                            Order Number:
                        </strong>{" "}
                        {selectedOrder?.orderNumber}
                    </p>

                    <p>
                        <strong>
                            Status:
                        </strong>{" "}
                        {selectedOrder?.orderStatus}
                    </p>

                    <p>
                        <strong>
                            Payment:
                        </strong>{" "}
                        {selectedOrder?.paymentMethod}
                    </p>

                    <p>
                        <strong>
                            Date:
                        </strong>{" "}
                        {new Date(
                            selectedOrder?.createdAt
                        ).toLocaleString()}
                    </p>

                </div>

            </div>

            {/* Customer */}

            <div className="card mb-3">

                <div className="card-header">
                    Customer
                </div>

                <div className="card-body">

                    <p>
                        <strong>Name:</strong>{" "}
                        {selectedOrder?.user?.name}
                    </p>

                    <p>
                        <strong>Email:</strong>{" "}
                        {selectedOrder?.user?.email}
                    </p>

                </div>

            </div>

            {/* Shipping Address */}

            <div className="card mb-3">

                <div className="card-header">
                    Shipping Address
                </div>

                <div className="card-body">

                    <p>
                        {
                            selectedOrder?.shippingAddress?.fullName
                        }
                    </p>

                    <p>
                        {
                            selectedOrder?.shippingAddress?.phone
                        }
                    </p>

                    <p>
                        {
                            selectedOrder?.shippingAddress?.addressLine1
                        }
                    </p>

                    <p>
                        {
                            selectedOrder?.shippingAddress?.city
                        }
                        ,{" "}
                        {
                            selectedOrder?.shippingAddress?.state
                        }
                    </p>

                    <p>
                        {
                            selectedOrder?.shippingAddress?.pincode
                        }
                    </p>

                </div>

            </div>

            {/* Products */}

            <div className="card mb-3">

                <div className="card-header">
                    Ordered Products
                </div>

                <div className="card-body">

                    <table className="table">

                        <thead>

                            <tr>

                                <th>
                                    Image
                                </th>

                                <th>
                                    Product
                                </th>

                                <th>
                                    Price
                                </th>

                                <th>
                                    Qty
                                </th>

                                <th>
                                    Total
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {selectedOrder?.orderItems?.map(
                                (
                                    item
                                ) => (

                                    <tr
                                        key={
                                            item._id
                                        }
                                    >

                                        <td>

                                            <img
                                                src={
                                                    item.image
                                                }
                                                alt={
                                                    item.title
                                                }
                                                width="60"
                                            />

                                        </td>

                                        <td>
                                            {
                                                item.title
                                            }
                                        </td>

                                        <td>
                                            ₹
                                            {
                                                item.price
                                            }
                                        </td>

                                        <td>
                                            {
                                                item.quantity
                                            }
                                        </td>

                                        <td>
                                            ₹
                                            {item.price *
                                                item.quantity}
                                        </td>

                                    </tr>

                                )
                            )}

                        </tbody>

                    </table>

                </div>

            </div>

            {/* Summary */}

            <div className="card">

                <div className="card-header">
                    Order Summary
                </div>

                <div className="card-body">

                    <p>
                        <strong>
                            Subtotal:
                        </strong>{" "}
                        ₹
                        {
                            selectedOrder?.subtotal
                        }
                    </p>

                    <p>
                        <strong>
                            Shipping:
                        </strong>{" "}
                        ₹
                        {
                            selectedOrder?.shippingCharge
                        }
                    </p>

                    <p>
                        <strong>
                            Tax:
                        </strong>{" "}
                        ₹
                        {
                            selectedOrder?.tax
                        }
                    </p>

                    <h5>
                        Total: ₹
                        {
                            selectedOrder?.totalAmount
                        }
                    </h5>

                </div>

            </div>

        </div>

    );

};

export default OrderDetails;