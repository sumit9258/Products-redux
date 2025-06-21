import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Componants/Pages/Login";
import Register from "./Componants/Pages/Register";
import ProfilePage from "./Componants/Pages/ProfilePage";
import ProtectedRoute from "./Componants/Auth/ProtectedRoute";
import Categories from "./Componants/Pages/Categories";
import CategoryDetailPage from "./Componants/Pages/CategoryDetailPage";
import Products from "./Componants/Pages/Products";
import ProductEditPage from "./Componants/Pages/ProductEditPage";
import ProductDetailPage from "./Componants/Product/ProductDetail";
import Dashboard from "./Componants/Pages/Dashboard";
import CartPage from "./Componants/Pages/CartPage";
import Navbar from "./Componants/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/categories" element={<Categories />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/categories/:id"
          element={
            <ProtectedRoute>
              <CategoryDetailPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products/:id"
          element={
            <ProtectedRoute>
              <ProductEditPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <ProductDetailPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
