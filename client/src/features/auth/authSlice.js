import { createSlice, createAsyncThunk, } from "@reduxjs/toolkit";

import api from "../../api/api";

const initialState = {

    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
    authInitialized: false,
};


// REGISTER
export const registerUser = createAsyncThunk("auth/registerUser", async (
    userData,
    thunkAPI
) => {

    try {

        const response = await api.post(
            "/auth/register",
            userData
        );

        localStorage.setItem("accessToken", response.data.data.accessToken);

        return response.data.data;

    } catch (error) {

        return thunkAPI.rejectWithValue(

            error.response?.data?.message || "Registration failed"
        );

    }

}
);


// LOGIN
export const loginUser = createAsyncThunk(

    "auth/loginUser",

    async (
        userData,
        thunkAPI
    ) => {

        try {

            const response = await api.post(
                "/auth/login",
                userData
            );

            localStorage.setItem("accessToken", response.data.data.accessToken);

            return response.data.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data
                    ?.message ||

                "Login failed"
            );

        }

    }
);


// GET CURRENT USER
export const fetchCurrentUser = createAsyncThunk(

    "auth/fetchCurrentUser",

    async (_, thunkAPI) => {

        try {

            const response = await api.get(
                "/auth/me"
            );

            return response.data.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data
                    ?.message ||

                "Failed to fetch user"
            );

        }

    }
);


// LOGOUT
export const logoutUser = createAsyncThunk(

    "auth/logoutUser",

    async (_, thunkAPI) => {

        try {

            await api.post(
                "/auth/logout"
            );

            localStorage.removeItem(
                "accessToken"
            );

        } catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data
                    ?.message ||

                "Logout failed"
            );

        }

    }
);


const authSlice = createSlice({

    name: "auth",

    initialState,

    reducers: {},

    extraReducers: (builder) => {

        builder

            // REGISTER
            .addCase(registerUser.pending, (state) => {

                state.loading = true;

                state.error = null;

            }
            )

            .addCase(registerUser.fulfilled, (state, action) => {

                state.loading = false;

                state.user = action.payload.user;

                state.isAuthenticated = true;

            }
            )

            .addCase(registerUser.rejected,

                (state, action) => {
                    state.loading = false;

                    state.error = action.payload;

                }
            )


            // LOGIN
            .addCase(loginUser.pending, (state) => {

                state.loading = true;

                state.error = null;

            }
            )

            .addCase(loginUser.fulfilled, (state, action) => {

                state.loading = false;

                state.user =
                    action.payload.user;

                state.isAuthenticated =
                    true;

            }
            )

            .addCase(loginUser.rejected, (state, action) => {

                state.loading = false;

                state.error =
                    action.payload;

            }
            )


            // FETCH USER
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {

                state.user = action.payload;

                state.isAuthenticated = true;

                state.authInitialized = true;

            }
            )

            .addCase(fetchCurrentUser.rejected, (state) => {

                state.user = null;

                state.isAuthenticated =
                    false;

                state.authInitialized = true;

            }
            )


            // LOGOUT
            .addCase(logoutUser.fulfilled, (state) => {

                state.user = null;

                state.isAuthenticated =
                    false;

            }
            );

    },
});

export default authSlice.reducer;