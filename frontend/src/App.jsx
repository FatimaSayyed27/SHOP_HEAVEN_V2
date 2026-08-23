import {
  Routes,
  Route,
  Outlet,
  Link,
} from "react-router-dom";

// =====================================================
// STORE COMPONENTS
// =====================================================

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import BrandSection from "./components/BrandSection";
import ProductGrid from "./components/ProductGrid";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// =====================================================
// ADMIN COMPONENTS
// =====================================================

import AdminLayout from "./components/AdminLayout";
import AdminRoute from "./components/AdminRoute";

// =====================================================
// USER ROUTE GUARD
// =====================================================

import ProtectedRoute from "./components/ProtectedRoute";

// =====================================================
// PAGES
// =====================================================

import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import BrandsPage from "./pages/BrandsPage";
import BrandProductsPage from "./pages/BrandProductsPage";

import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

import OrdersPage from "./pages/OrdersPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";

import ProfilePage from "./pages/ProfilePage";
import WishlistPage from "./pages/WishlistPage";

// =====================================================
// ADMIN PAGES
// =====================================================

import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminProductsPage from "./pages/AdminProductsPage";
import AdminCatalogPage from "./pages/AdminCatalogPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";

import NotFoundPage from "./pages/NotFoundPage";

// =====================================================
// HOME PAGE
// =====================================================

function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandSection />
      <ProductGrid />
    </>
  );
}

// =====================================================
// MAIN STORE LAYOUT
// =====================================================

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">

      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

    </div>
  );
}

// =====================================================
// AUTH LAYOUT
// =====================================================

function AuthLayout() {
  return (
    <div className="min-h-screen bg-[#fbfaf7]">

      <div className="px-6 py-6">
        <Link
          to="/"
          className="font-serif text-xl tracking-[0.12em] font-semibold"
        >
          SHOP HAVEN
        </Link>
      </div>

      <Outlet />

    </div>
  );
}

// =====================================================
// APP
// =====================================================

function App() {
  return (
    <>
    <ScrollToTop/>

    <Routes>
      {/* <Route element={<ScrollToTop/>}></Route> */}

      {/* =================================================
          AUTH PAGES
      ================================================= */}

      <Route element={<AuthLayout />}>

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/signup"
          element={<SignupPage />}
        />

      </Route>

      {/* =================================================
          ADMIN PAGES
      ================================================= */}

      <Route element={<AdminRoute />}>

        <Route element={<AdminLayout />}>

          <Route
            path="/admin"
            element={<AdminDashboardPage />}
          />

          <Route
            path="/admin/products"
            element={<AdminProductsPage />}
          />

          <Route
            path="/admin/catalog"
            element={<AdminCatalogPage />}
          />

          <Route
            path="/admin/orders"
            element={<AdminOrdersPage />}
          />

        </Route>

      </Route>

      {/* =================================================
          MAIN STORE
      ================================================= */}

      <Route element={<MainLayout />}>

        {/* =================================================
            PUBLIC ROUTES
        ================================================= */}

        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/products"
          element={<ProductsPage />}
        />

        <Route
          path="/products/:id"
          element={<ProductDetailsPage />}
        />

        <Route
          path="/brands"
          element={<BrandsPage />}
        />

        <Route
          path="/brands/:slug"
          element={<BrandProductsPage />}
        />

        {/* =================================================
            PROTECTED USER ROUTES
        ================================================= */}

        <Route element={<ProtectedRoute />}>

          <Route
            path="/cart"
            element={<CartPage />}
          />

          <Route
            path="/checkout"
            element={<CheckoutPage />}
          />

          <Route
            path="/orders"
            element={<OrdersPage />}
          />

          <Route
            path="/orders/:orderId"
            element={<OrderDetailsPage />}
          />

          <Route
            path="/profile"
            element={<ProfilePage />}
          />

          <Route
            path="/wishlist"
            element={<WishlistPage />}
          />

          <Route
            path="/order-success"
            element={<OrderSuccessPage />}
          />

        </Route>

        {/* =================================================
            404
        ================================================= */}

        <Route
          path="*"
          element={<NotFoundPage />}
        />

      </Route>

    </Routes>
    </>
  );
}

export default App;

