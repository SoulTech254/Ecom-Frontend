import { Route, Routes } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Layout from "./layout/Layout";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/Cart/CartPage";
import AddressPage from "./pages/Cart/AddressPage";
import PaymentPage from "./pages/Cart/PaymentPage";
import CheckoutPage from "./pages/Cart/CheckoutPage";
import CheckingPaymentPage from "./pages/Cart/CheckingPaymentPage";
import OrdersPage from "./pages/OrdersPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/sign-up" element={<RegistrationPage />} />
      <Route path="/sign-in" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route
        path="/dash"
        element={
          <Layout>
            <Navbar />
          </Layout>
        }
      />
      <Route
        path="/products/:id"
        element={
          <Layout>
            <ProductPage />
          </Layout>
        }
      />
      <Route
        path="/cart"
        element={
          <Layout>
            <CartPage />
          </Layout>
        }
      />
      <Route
        path="/address"
        element={
          <Layout>
            <AddressPage />
          </Layout>
        }
      />
      <Route
        path="/payment"
        element={
          <Layout>
            <PaymentPage />
          </Layout>
        }
      />
      <Route
        path="/checkout"
        element={
          <Layout>
            <CheckoutPage />
          </Layout>
        }
      />
      <Route
        path="/checking-payment/:id"
        element={
          <Layout>
            <CheckingPaymentPage />
          </Layout>
        }
      />
      <Route
        path="/orders"
        element={
          <Layout>
            <OrdersPage />
          </Layout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
