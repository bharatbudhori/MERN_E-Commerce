import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkUser, createUser, loginUser, signOut } from "./authAPI";

const initialState = {
    loggedInUserToken: null,
    status: "idle",
    error: null,
    userChecked: false,
};

export const createUserAsync = createAsyncThunk(
    "user/createUser",
    async (userData) => {
        const response = await createUser(userData);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const checkUserAsync = createAsyncThunk("user/checkUser", async () => {
    const response = await checkUser();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
});

export const loginUserAsync = createAsyncThunk(
    "user/loginUser",
    async (loginInfo) => {
        const response = await loginUser(loginInfo);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const signOutAsync = createAsyncThunk("user/signOut", async (userId) => {
    const response = await signOut(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
});

export const authSlice = createSlice({
    name: "user",
    initialState,

    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(createUserAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createUserAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.loggedInUserToken = action.payload;
            })
            .addCase(loginUserAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(loginUserAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.loggedInUserToken = action.payload;
            })
            .addCase(loginUserAsync.rejected, (state, action) => {
                state.status = "idle";
                state.error = action.error;
            })
            .addCase(signOutAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(signOutAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.loggedInUserToken = null;
            })
            .addCase(checkUserAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(checkUserAsync.fulfilled, (state, action) => {
                state.status = "idle";
                state.loggedInUserToken = action.payload;
                state.userChecked = true;
            })
            .addCase(checkUserAsync.rejected, (state, action) => {
                state.status = "idle";
                state.error = action.error;
                state.userChecked = true;
            });
    },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.error;
export const selectUserChecked = (state) => state.auth.userChecked;

export default authSlice.reducer;
