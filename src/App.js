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
import UserOrders from "./features/user/components/UserOrders";
import UserOrderPage from "./pages/UserOrderPage";

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
        }
    }, [dispatch, user]);

    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
