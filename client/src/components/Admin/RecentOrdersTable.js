const RecentOrdersTable = ({ orders = [] }) => {
    
  return (
    <div className="card shadow-sm mt-4">

      <div className="card-header">
        <h5 className="mb-0">
          Recent Orders
        </h5>
      </div>

      <div className="card-body">

        <div className="table-responsive">

          <table className="table table-hover align-middle">

            <thead>
              <tr>
                <th>Order No</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>

              {orders.length > 0 ? (

                orders.map((order) => (

                  <tr key={order._id}>

                    <td>
                      {order.orderNumber}
                    </td>

                    <td>
                      {order.user?.name}
                    </td>

                    <td>
                      ₹{order.totalAmount}
                    </td>

                    <td>

                      <span
                        className={`badge ${
                          order.orderStatus === "DELIVERED"
                            ? "bg-success"
                            : order.orderStatus === "SHIPPED"
                            ? "bg-primary"
                            : order.orderStatus === "CANCELLED"
                            ? "bg-danger"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {order.orderStatus}
                      </span>

                    </td>

                    <td>
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
                    </td>

                  </tr>

                ))

              ) : (

                <tr>
                  <td
                    colSpan="5"
                    className="text-center"
                  >
                    No Orders Found
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default RecentOrdersTable;