import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import userService from "../../services/Admin/userService";

const initialState = {
    users: [],
    total: 0,
    totalPages: 0,
    currentPage: 1,
    loading: false,
    error: null,
    selectedUser: null,
    userOrders: [],
};

export const getUsers =
    createAsyncThunk(
        "adminUsers/getUsers",
        async (params, thunkAPI) => {

            try {

                return await userService.getUsers(
                    params.page,
                    params.limit,
                    params.search
                );

            } catch (error) {

                return thunkAPI.rejectWithValue(
                    error.response?.data?.message
                );

            }

        }
    );

export const changeUserRole =
    createAsyncThunk(
        "adminUsers/changeUserRole",
        async (
            { id, role },
            thunkAPI
        ) => {

            try {

                return await userService.changeUserRole(
                    id,
                    role
                );

            } catch (error) {

                return thunkAPI.rejectWithValue(
                    error.response?.data?.message
                );

            }

        }
    );

export const toggleUserBlock =
    createAsyncThunk(
        "adminUsers/toggleUserBlock",
        async (
            { id },
            thunkAPI
        ) => {

            try {

                return await userService.toggleUserBlock(
                    id
                );

            } catch (error) {

                return thunkAPI.rejectWithValue(
                    error.response?.data?.message
                );

            }

        }
    );

export const getUserDetails =
    createAsyncThunk(
        "adminUsers/getUserDetails",
        async (
            id,
            thunkAPI
        ) => {

            try {

                return await userService.getUserDetails(
                    id
                );

            } catch (error) {

                return thunkAPI.rejectWithValue(
                    error.response?.data?.message
                );

            }

        }
    );

const userSlice = createSlice({
    name: "adminUsers",

    initialState,

    reducers: {},

    extraReducers: (builder) => {

        builder

            .addCase(
                getUsers.pending,
                (state) => {

                    state.loading = true;

                }
            )

            .addCase(
                getUsers.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.users =
                        action.payload.data.users;

                    state.total =
                        action.payload.data.total;

                    state.totalPages =
                        action.payload.data.totalPages;

                    state.currentPage =
                        action.payload.data.currentPage;

                }
            )

            .addCase(
                getUsers.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            )

            .addCase(
                changeUserRole.fulfilled,
                (state, action) => {

                    const updatedUser =
                        action.payload.data;

                    const index =
                        state.users.findIndex(
                            (user) =>
                                user._id === updatedUser._id
                        );

                    if (index !== -1) {

                        state.users[index] =
                            updatedUser;

                    }

                }
            )

            .addCase(
                toggleUserBlock.fulfilled,
                (state, action) => {

                    const updatedUser =
                        action.payload.data;

                    const index =
                        state.users.findIndex(
                            (user) =>
                                user._id === updatedUser._id
                        );

                    if (index !== -1) {

                        state.users[index] =
                            updatedUser;

                    }

                }
            )

            .addCase(
                getUserDetails.pending,
                (state) => {
                    state.loading = true;
                }
            )

            .addCase(
                getUserDetails.fulfilled,
                (state, action) => {

                    state.loading = false;



                    state.selectedUser =
                        action.payload.data;

                    state.userOrders = [];
                }
            )

            .addCase(
                getUserDetails.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;
                }
            )

    },
});

export default userSlice.reducer;