import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    fetchLoggedInUser,
    fecthLoggedInUserOrders,
    updateUser,
} from "./userAPI";

const initialState = {
    status: "idle",
    userInfo: null,
};

export const fecthLoggedInUserOrdersAsync = createAsyncThunk(
    "user/fetchLoggedInUserOrders",
    async () => {
        const response = await fecthLoggedInUserOrders();
        return response.data;
    }
);

export const fetchLoggedInUserAsync = createAsyncThunk(
    "user/fetchLoggedInUser",
    async () => {
        const response = await fetchLoggedInUser();
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
                    state.userInfo.orders = action.payload;
                }
            )

            .addCase(updateUserAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateUserAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.userInfo = action.payload;
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

export const selectUserOrders = (state) => state.user.userInfo.orders;
export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserStatus = (state) => state.user.status;

export default userSlice.reducer;
