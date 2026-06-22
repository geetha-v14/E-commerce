import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import orderService from "../../services/Admin/orderService";

const initialState = {
    orders: [],
    selectedOrder: null,
    totalOrders: 0,
    totalPages: 0,
    currentPage: 1,
    loading: false,
    error: null,
    
};

export const getAllOrders =
    createAsyncThunk(
        "orders/getAllOrders",
        async (params, thunkAPI) => {

            try {

                return await orderService.getAllOrders(
                    params.page,
                    params.limit,
                    params.status
                );

            } catch (error) {

                return thunkAPI.rejectWithValue(
                    error.response?.data?.message
                );

            }

        }
    );

export const getOrderDetails =
    createAsyncThunk(
        "orders/details",

        async (
            orderId,
            thunkAPI
        ) => {

            try {

                return await orderService.getOrderDetails(
                    orderId
                );

            } catch (error) {

                return thunkAPI.rejectWithValue(
                    error.response?.data?.message
                );

            }

        }
    );

export const updateOrderStatus =
    createAsyncThunk(
        "orders/updateStatus",

        async (
            { orderId, status },
            thunkAPI
        ) => {

            try {

                return await orderService.updateOrderStatus(
                    orderId,
                    status
                );

            } catch (error) {

                return thunkAPI.rejectWithValue(
                    error.response?.data?.message
                );

            }

        }
    );

const orderSlice = createSlice({
    name: "adminOrders",

    initialState,

    reducers: {},

    extraReducers: (builder) => {

        builder

            .addCase(
                getAllOrders.pending,
                (state) => {
                    state.loading = true;
                }
            )

            .addCase(
                getAllOrders.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.orders =
                        action.payload.data.orders;

                    state.totalOrders =
                        action.payload.data.totalOrders;

                    state.totalPages =
                        action.payload.data.totalPages;

                    state.currentPage =
                        action.payload.data.currentPage;
                }
            )

            .addCase(
                getAllOrders.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            )

            .addCase(
                getOrderDetails.fulfilled,
                (state, action) => {

                    state.selectedOrder =
                        action.payload.data;

                }
            )

            .addCase(
                updateOrderStatus.fulfilled,
                (state, action) => {

                    const index =
                        state.orders.findIndex(
                            (order) =>
                                order._id ===
                                action.payload.data._id
                        );

                    if (index !== -1) {

                        state.orders[index] =
                            action.payload.data;

                    }

                }
            );
    },
});

export default orderSlice.reducer;