import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import productService from "../../services/Admin/productService";

const initialState = {
    products: [],
    total: 0,
    totalPages: 0,
    currentPage: 1,
    loading: false,
    error: null,
};

export const getProducts =
    createAsyncThunk(
        "adminProducts/getProducts", async (params, thunkAPI) => {
            try {
                return await productService.getProducts(
                    params
                );
            } catch (error) {
                return thunkAPI.rejectWithValue(
                    error.response?.data?.message
                );
            }
        }
    );

export const createProduct =
    createAsyncThunk(
        "adminProducts/createProduct",

        async (
            productData,
            thunkAPI
        ) => {

            try {

                return await productService.createProduct(
                    productData
                );

            } catch (error) {

                return thunkAPI.rejectWithValue(
                    error.response?.data?.message
                );

            }

        }
    );


export const updateProduct =
    createAsyncThunk(
        "adminProducts/updateProduct",
        async (
            { id, formData },
            thunkAPI
        ) => {
            try {
                return await productService.updateProduct(
                    id,
                    formData
                );
            } catch (error) {
                return thunkAPI.rejectWithValue(
                    error.response?.data?.message
                );
            }
        }
    );

export const deleteProduct = createAsyncThunk(
    "adminProducts/deleteProduct",
    async (id, thunkAPI) => {
        try {
            await productService.deleteProduct(id);

            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message
            );
        }
    }
);

const productSlice = createSlice({
    name: "products",

    initialState,

    reducers: {},

    extraReducers: (builder) => {

        builder
            // GET PRODUCT
            .addCase(
                getProducts.pending,
                (state) => {
                    state.loading = true;
                }
            )

            .addCase(
                getProducts.fulfilled,
                (state, action) => {
                    state.loading = false;

                    state.products =
                        action.payload.data.products || [];

                    state.total =
                        action.payload.data.total || 0;

                    state.totalPages =
                        action.payload.data.totalPages || 0;

                    state.currentPage =
                        action.payload.data.currentPage || 1;
                }
            )

            .addCase(
                getProducts.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            )



            // CREATE PRODUCT
            .addCase(
                createProduct.pending,
                (state) => {
                    state.loading = true;
                }
            )

            .addCase(
                createProduct.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.products.unshift(
                        action.payload.data
                    );
                }
            )

            .addCase(
                createProduct.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            )

            // UPDATE PRODUCT
            .addCase(
                updateProduct.fulfilled,
                (state, action) => {

                    const index =
                        state.products.findIndex(
                            (product) =>
                                product._id ===
                                action.payload.data._id
                        );

                    if (index !== -1) {
                        state.products[index] =
                            action.payload.data;
                    }
                }
            )

            // DELETE PRODUCT
            .addCase(
                deleteProduct.fulfilled,
                (state, action) => {

                    state.products =
                        state.products.filter(
                            (product) =>
                                product._id !==
                                action.payload
                        );
                }
            );



    },
});

export default productSlice.reducer;