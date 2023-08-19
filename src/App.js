import React, { useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import ProductDetailPage from "./pages/ProductDetailPage";
import Protected from "./features/auth/components/Protected";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import { selectLoggedInUser } from "./features/auth/authSlice";
import PageNotFound from "./pages/404";
import OrderSuccessPage from "./pages/OrderSuccess";
import UserOrderPage from "./pages/UserOrderPage";
import UserProfilePage from "./pages/UserProfilePage";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import Logout from "./features/auth/components/Logout";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import AdminHome from "./pages/AdminHome";
import AdminProductDetail from "./features/admin/component/AdminProductDetail";
import AdminProductFormPage from "./pages/AdminProductFormPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Protected>
                <Home />
            </Protected>
        ),
    },
    {
        path: "/admin",
        element: (
            <ProtectedAdmin>
                <AdminHome />
            </ProtectedAdmin>
        ),
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/signup",
        element: <SignupPage />,
    },
    {
        path: "/cart",
        element: (
            <Protected>
                <CartPage />
            </Protected>
        ),
    },
    {
        path: "/checkout",
        element: (
            <Protected>
                <Checkout />
            </Protected>
        ),
    },
    {
        path: "/product-detail/:id",
        element: (
            <Protected>
                <ProductDetailPage />
            </Protected>
        ),
    },
    {
        path: "/admin/product-detail/:id",
        element: (
            <ProtectedAdmin>
                <AdminProductDetail />
            </ProtectedAdmin>
        ),
    },
    {
        path: "/order-success/:id",
        element: (
            <Protected>
                <OrderSuccessPage />
            </Protected>
        ),
    },
    {
        path: "/orders",
        element: (
            <Protected>
                <UserOrderPage />
            </Protected>
        ),
    },
    {
        path: "/profile",
        element: (
            <Protected>
                <UserProfilePage />
            </Protected>
        ),
    },
    {
        path: "/logout",
        element: <Logout />,
    },
    {
        path: "/forgot-password",
        element: <ForgotPasswordPage />,
    },
    {
        path: "/admin/product-form",
        element: (
            <ProtectedAdmin>
                <AdminProductFormPage />
            </ProtectedAdmin>
        ),
    },
    {
        path: "/admin/product-form/edit/:id",
        element: (
            <ProtectedAdmin>
                <AdminProductFormPage />
            </ProtectedAdmin>
        ),
    },
    {
        path: "*",
        element: <PageNotFound />,
    },
]);

function App() {
    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser);
    useEffect(() => {
        if (user) {
            dispatch(fetchItemsByUserIdAsync(user.id));
            dispatch(fetchLoggedInUserAsync(user.id));
        }
    }, [dispatch, user]);

    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
