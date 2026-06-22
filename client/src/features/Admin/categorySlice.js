import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import categoryService from "../../services/Admin/categoryService";

const initialState = {
    categories: [],
    total: 0,
    mainCategories: 0,
    subcategories: 0,
    totalPages: 0,
    currentPage: 1,
    loading: false,
    error: null,
};

// GET CATEGORIES
export const getCategories =
    createAsyncThunk(
        "categories/getAll",
        async (params, thunkAPI) => {
            try {
                return await categoryService.getCategories(
                    params
                );
            } catch (error) {
                return thunkAPI.rejectWithValue(
                    error.response?.data?.message
                );
            }
        }
    );

// CREATE CATEGORY
export const createCategory =
    createAsyncThunk(
        "categories/create",
        async (
            categoryData,
            thunkAPI
        ) => {
            try {
                return await categoryService.createCategory(
                    categoryData
                );
            } catch (error) {
                return thunkAPI.rejectWithValue(
                    error.response?.data?.message
                );
            }
        }
    );

// UPDATE CATEGORY
export const updateCategory =
    createAsyncThunk(
        "categories/update",
        async (
            { id, formData },
            thunkAPI
        ) => {
            try {
                return await categoryService.updateCategory(
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

// DELETE CATEGORY
export const deleteCategory =
    createAsyncThunk(
        "categories/delete",
        async (id, thunkAPI) => {
            try {
                await categoryService.deleteCategory(
                    id
                );

                return id;
            } catch (error) {
                return thunkAPI.rejectWithValue(
                    error.response?.data?.message
                );
            }
        }
    );

// TOGGLE STATUS
export const toggleCategoryStatus =
    createAsyncThunk(
        "categories/toggle",
        async (id, thunkAPI) => {
            try {
                return await categoryService.toggleCategoryStatus(
                    id
                );
            } catch (error) {
                return thunkAPI.rejectWithValue(
                    error.response?.data?.message
                );
            }
        }
    );

const categorySlice =
    createSlice({
        name: "categories",

        initialState,

        reducers: {},

        extraReducers: (
            builder
        ) => {
            builder

                // GET
                .addCase(
                    getCategories.pending,
                    (state) => {
                        state.loading = true;
                    }
                )

                .addCase(
                    getCategories.fulfilled,
                    (
                        state,
                        action
                    ) => {
                        state.loading = false;

                        state.categories =
                            action.payload.data.categories ||
                            [];

                        state.total =
                            action.payload.data.total ||
                            0;

                        state.mainCategories =
                            action.payload.data.mainCategories ||
                            0;

                        state.subcategories =
                            action.payload.data.subcategories ||
                            0;

                        state.totalPages =
                            action.payload.data.totalPages ||
                            0;

                        state.currentPage =
                            action.payload.data.currentPage ||
                            1;


                            console.log(action.payload.data);
                    }

                    
                )

                .addCase(
                    getCategories.rejected,
                    (
                        state,
                        action
                    ) => {
                        state.loading = false;
                        state.error =
                            action.payload;
                    }
                )

                // CREATE
                .addCase(
                    createCategory.pending,
                    (state) => {
                        state.loading = true;
                    }
                )

                .addCase(
                    createCategory.fulfilled,
                    (state) => {
                        state.loading = false;
                    }
                )

                .addCase(
                    createCategory.rejected,
                    (
                        state,
                        action
                    ) => {
                        state.loading = false;
                        state.error =
                            action.payload;
                    }
                )

                // UPDATE
                .addCase(
                    updateCategory.fulfilled,
                    (
                        state,
                        action
                    ) => {
                        const index =
                            state.categories.findIndex(
                                (
                                    category
                                ) =>
                                    category._id ===
                                    action.payload.data
                                        ._id
                            );

                        if (
                            index !== -1
                        ) {
                            state.categories[
                                index
                            ] =
                                action.payload.data;
                        }
                    }
                )

                // DELETE
                .addCase(
                    deleteCategory.fulfilled,
                    (
                        state,
                        action
                    ) => {
                        state.categories =
                            state.categories.filter(
                                (
                                    category
                                ) =>
                                    category._id !==
                                    action.payload
                            );
                    }
                )

                // TOGGLE STATUS
                .addCase(
                    toggleCategoryStatus.fulfilled,
                    (
                        state,
                        action
                    ) => {
                        const index =
                            state.categories.findIndex(
                                (
                                    category
                                ) =>
                                    category._id ===
                                    action.payload.data
                                        ._id
                            );

                        if (
                            index !== -1
                        ) {
                            state.categories[
                                index
                            ] =
                                action.payload.data;
                        }
                    }
                );
        },
    });

export default categorySlice.reducer;