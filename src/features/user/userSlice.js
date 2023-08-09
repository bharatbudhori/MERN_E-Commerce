import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    fetchLoggedInUser,
    fecthLoggedInUserOrders,
    updateUser,
} from "./userAPI";

const initialState = {
    userOrders: [],
    status: "idle",
    userInfo: null,
};

export const fecthLoggedInUserOrdersAsync = createAsyncThunk(
    "user/fetchLoggedInUserOrders",
    async (userId) => {
        const response = await fecthLoggedInUserOrders(userId);
        return response.data;
    }
);

export const fetchLoggedInUserAsync = createAsyncThunk(
    "user/fetchLoggedInUser",
    async (userId) => {
        const response = await fetchLoggedInUser(userId);
        return response.data;
    }
);

export const updateUserAsync = createAsyncThunk(
    "user/updateUser",
    async (userData) => {
        const response = await updateUser(userData);
        return response.data;
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState,

    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(fecthLoggedInUserOrdersAsync.pending, (state) => {
            state.status = "loading";
        });
        builder
            .addCase(
                fecthLoggedInUserOrdersAsync.fulfilled,
                (state, action) => {
                    state.status = "idle";
                    state.userOrders = action.payload;
                }
            )

            .addCase(updateUserAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateUserAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.userOrders = action.payload;
            })
            .addCase(fetchLoggedInUserAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.userInfo = action.payload;
            });
    },
});

export const selectUserOrders = (state) => state.user.userOrders;
export const selectUserInfo = (state) => state.user.userInfo;

export default userSlice.reducer;
