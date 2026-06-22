import {
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";

import dashboardService from "../../services/Admin/dashboardService";

const initialState = {
    stats: null,
    loading: false,
    error: null,
};

export const getDashboardStats =
    createAsyncThunk("dashboard/getStats",
        async (_, thunkAPI) => {
            try {
                return await dashboardService.getStats();
            } catch (error) {
                return thunkAPI.rejectWithValue(
                    error.response?.data?.message || "Failed to load dashboard"
                );
            }
        }
    );

const dashboardSlice = createSlice({
    
    name: "dashboard",

    initialState,

    reducers: {},

    extraReducers: (builder) => {
        builder

            .addCase(
                getDashboardStats.pending,
                (state) => {
                    state.loading = true;
                }
            )

            .addCase(
                getDashboardStats.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.stats = action.payload;
                }
            )

            .addCase(
                getDashboardStats.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            );
    },
});

export default dashboardSlice.reducer;