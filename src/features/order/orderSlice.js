import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder } from "./orderAPI";

const initialState = {
    orders: [],
    status: "idle",
};

export const createOrderAsync = createAsyncThunk(
    "order/createOrder",
    async (order) => {
        const response = await createOrder(order);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const counterSlice = createSlice({
    name: "order",
    initialState,

    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(createOrderAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createOrderAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.orders.push(action.payload);
            });
    },
});

export const selectOrders = (state) => state.order.orders;

export default counterSlice.reducer;