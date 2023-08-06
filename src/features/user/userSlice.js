import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fecthLoggedInUserOrders } from "./userAPI";

const initialState = {
    userOrders: null,
    status: "idle",
};

export const fecthLoggedInUserOrdersAsync = createAsyncThunk(
    "user/fetchLoggedInUser",
    async (userId) => {
        const response = await fecthLoggedInUserOrders(userId);
        return response.data;
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState,

    reducers: {
        increment: (state) => {
            state.value += 1;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fecthLoggedInUserOrdersAsync.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(fecthLoggedInUserOrdersAsync.fulfilled, (state, action) => {
            state.status = "idle";
            state.userOrders = action.payload;
        });
    },
});

export const selectUserOrders = (state) => state.user.userOrders;

export default userSlice.reducer;
