  import "./App.css";
  import { ToastContainer } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import { Routes, Route } from "react-router-dom";
  import Signup from "./Pages/Signup";
  import Login from "./Pages/Login";
  import Home from "./Pages/Home";
  import Products from "./Pages/Products";
  import ProductDetails from "./Pages/Productetails";
  import Cart from "./Pages/Cart";
  import Profile from "./Pages/Profile";
  import ProtectedRoutes from "./Routes/ProtectedRoutes";
  import Wishlist from "./Pages/Wishlist";
  import Whey from "./Pages/Whey";
  import Creatin from "./Pages/Creatin";
  import PreWorkouts from "./Pages/PreWorkouts";
  import Multivitamin from "./Pages/Multivitamin";
  import Checkout from "./Pages/Checkout";
  import OrderSuccess from "./Pages/OrderSuccess";
  import About from "./Pages/About";
  import OrderDetails from "./Pages/OrderDetails";
  import Contact from "./Pages/Contact";
  // admin side

  import AdminLogin from "./Admin/AdminLogin";
  import AdminLayout from "./Admin/AdminLayout";
  import AdminProtectedRoute from "./Admin/Context/AdminProtectedRoute";
import AdminProducts from "./Admin/Pages/AdminProducts";
import AdminDashboard from "./Admin/Pages/AdminDashboard";
import AdminOrders from "./Admin/Pages/AdminOrders";
import AdminUsers from "./Admin/Pages/AdminUsers";

  function App() {
    return (
      <>
      

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signup />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/wheyprotien" element={<Whey />} />
          <Route path="/creatin" element={<Creatin />} />
          <Route path="/preworkout" element={<PreWorkouts />} />
          <Route path="/multivitamin" element={<Multivitamin />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/ordersuccess" element={<OrderSuccess />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/orderdetails/:id" element={<OrderDetails />} />

          {/* {protected routes} */}
          <Route
            path="/cart"
            element={
              <ProtectedRoutes>
                <Cart />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoutes>
                <Profile />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoutes>
                <Wishlist />
              </ProtectedRoutes>
            }
          />



  {/* 1. Admin Login: This handles /admin and /admin/login */}
  <Route path="/admin" element={<AdminLogin />} />
  <Route path="/admin/login" element={<AdminLogin />} />

  {/* 2. Admin Panel: We use a separate base path (like /admin/panel) 
         to ensure the Sidebar layout doesn't trigger on the login page */}
  <Route
    path="/admin"
    element={
      <AdminProtectedRoute>
        <AdminLayout />
      </AdminProtectedRoute>
    }
  >
    {/* These will now render WITH the Sidebar */}
    <Route path="dashboard" element={<AdminDashboard />} />
    <Route path="products" element={<AdminProducts />} />
    <Route path="orders" element={<AdminOrders />} />
    <Route path="users" element={<AdminUsers />} />
  </Route>




      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="dark"
      />


    </>
  );
}

export default App;
