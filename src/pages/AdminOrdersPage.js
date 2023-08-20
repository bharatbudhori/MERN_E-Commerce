import Navbar from '../features/navbar/Navbar';
import AdminOrders from '../features/admin/component/AdminOrders';

function AdminOrdersPage() {
    return (
        <div>
            <Navbar>
                <AdminOrders />
            </Navbar>
        </div>
    );
}

export default AdminOrdersPage