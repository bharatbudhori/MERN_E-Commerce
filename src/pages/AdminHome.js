import AdminProductList from "../features/admin/component/AdminProductList"
import Footer from "../features/common/Footer"
import Navbar from "../features/navbar/Navbar"

function AdminHome() {
  return (
    <div>
        <Navbar >
            <AdminProductList />
        </Navbar>
        <Footer />
    </div>
  )
}

export default AdminHome