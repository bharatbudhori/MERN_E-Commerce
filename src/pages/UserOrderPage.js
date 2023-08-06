import Navbar from "../features/navbar/Navbar";
import UserOrders from "../features/user/components/UserOrders";

function UserOrderPage() {
    return (
        <div>

            <Navbar>
                <h1 className="text-3xl font-semibold text-gray-800"> My Orders </h1>
                <UserOrders />
            </Navbar>
        </div>
    );
}

export default UserOrderPage;
