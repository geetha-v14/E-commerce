import api from "../../api/api";

const orderService = {

    getAllOrders: async (
        page = 1,
        limit = 10,
        status = ""
    ) => {

        const response =
            await api.get(
                `/orders/admin/all?page=${page}&limit=${limit}&status=${status}`
            );



        return response.data;
    },

    getOrderById: async (
        orderId
    ) => {

        const response =
            await api.get(
                `/orders/admin/${orderId}`
            );

        return response.data;
    },

    getOrderDetails: async (
        orderId
    ) => {

        const response =
            await api.get(
                `/orders/admin/${orderId}`
            );

        return response.data;

    },

    updateOrderStatus: async (
        orderId,
        status
    ) => {

        const response =
            await api.patch(
                `/orders/admin/${orderId}/status`,
                { status }
            );

        return response.data;
    },

};

export default orderService;