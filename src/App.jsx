import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// Layout Components
import Navbar from "./components/Layout/Navbar";
import Sidebar from "./components/Layout/Sidebar";
import SearchOverlay from "./components/Layout/SearchOverlay";
import CartSidebar from "./components/Layout/CartSidebar";
import ProfilePanel from "./components/Layout/ProfilePanel";
import LoginModal from "./components/Layout/LoginModal";
import Footer from "./components/Layout/Footer";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

// Pages
import Index from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Payment from "./pages/Payment";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import PostRequirement from "./pages/PostRequirement";
import NotFound from "./pages/NotFound";
import { getUser } from "./store/slices/authSlice";
import { fetchProducts } from "./store/slices/productSlice";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
};

const AppWithRouter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="min-h-screen bg-background">
            <Navbar />
            <Sidebar />
            <SearchOverlay />
            <CartSidebar />
            <ProfilePanel />
            <LoginModal />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/password/reset/:token" element={<Index />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/payment"
                element={
                  <ProtectedRoute>
                    <Payment />
                  </ProtectedRoute>
                }
              />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/post-requirement" element={<PostRequirement />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </div>
          <ToastContainer
            position="bottom-center"
            autoClose={2400}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnHover
            draggable
            theme="colored"
            style={{ width: "min(92vw, 420px)" }}
          />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default AppWithRouter;

