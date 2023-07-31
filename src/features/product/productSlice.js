import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    fetchAllProducts,
    fetchProductsByFilters,
    fetchAllBrands,
    fetchAllCategories,
} from "./productAPI";

const initialState = {
    products: [],
    brands: [],
    categories: [],
    totalItems: 0,
    status: "idle",
};

export const fetchAllProductsAsync = createAsyncThunk(
    "product/fetchAllProducts",
    async () => {
        const response = await fetchAllProducts();
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const fetchProductsByFiltersAsync = createAsyncThunk(
    "product/fetchProductsByFilters",
    async ({ filter, sort, pagination }) => {
        const response = await fetchProductsByFilters(filter, sort, pagination);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const fetchBrandsAsync = createAsyncThunk(
    "product/fetchAllBrands",
    async () => {
        const response = await fetchAllBrands();
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const fetchCategoriesAsync = createAsyncThunk(
    "product/fetchAllCategories",
    async () => {
        const response = await fetchAllCategories();
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const productSlice = createSlice({
    name: "product",
    initialState,

    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProductsAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.products = action.payload;
            })

            .addCase(fetchProductsByFiltersAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.products = action.payload.products;
                state.totalItems = action.payload.totalItems;
            })
            .addCase(fetchBrandsAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.brands = action.payload;
            })
            .addCase(fetchCategoriesAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.categories = action.payload;
            });
    },
});

export const selectAllProducts = (state) => state.product.products;
export const selectBrands = (state) => state.product.brands;
export const selectCategories = (state) => state.product.categories;

export const selectTotalItems = (state) => state.product.totalItems;

export default productSlice.reducer;
