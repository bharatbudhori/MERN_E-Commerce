import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    addToCart,
    deleteItemFromCart,
    fetchItemsByUserId,
    resetCart,
    updateCart,
} from "./cartAPI";

const initialState = {
    items: [],
    status: "idle",
    cartLoaded: false,
};

export const addToCartAsync = createAsyncThunk(
    "cart/addToCart",
    async (item) => {
        const response = await addToCart(item);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const fetchItemsByUserIdAsync = createAsyncThunk(
    "cart/fetchItemsByUserId",
    async () => {
        const response = await fetchItemsByUserId();
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const updateItemAsync = createAsyncThunk(
    "cart/updateItem",
    async (update) => {
        const response = await updateCart(update);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const deleteItemAsync = createAsyncThunk(
    "cart/deleteItem",
    async (id) => {
        const response = await deleteItemFromCart(id);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const resetCartAsync = createAsyncThunk("cart/resetCart", async () => {
    const response = await resetCart();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
});

export const cartSlice = createSlice({
    name: "cart",
    initialState,

    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(addToCartAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addToCartAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.items.push(action.payload);
            })
            .addCase(fetchItemsByUserIdAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.items = action.payload;
                state.cartLoaded = true;
            })
            .addCase(fetchItemsByUserIdAsync.rejected, (state, action) => {
                state.status = "idle";
                state.error = action.error;
                state.cartLoaded = true;
            })
            .addCase(updateItemAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateItemAsync.fulfilled, (state, action) => {
                state.status = "idle";
                const index = state.items.findIndex(
                    (item) => item.id === action.payload.id
                );
                state.items[index] = action.payload;
            })
            .addCase(deleteItemAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteItemAsync.fulfilled, (state, action) => {
                state.status = "idle";
                const index = state.items.findIndex(
                    (item) => item.id === action.payload.id
                );
                state.items.splice(index, 1);
            })
            .addCase(resetCartAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(resetCartAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.items = [];
            });
    },
});

export const selectItems = (state) => state.cart.items;
export const selectCartLoaded = (state) => state.cart.cartLoaded;

export default cartSlice.reducer;
