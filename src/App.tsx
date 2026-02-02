import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// Layout components
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";

// Public pages
import Home from "./pages/public/Home";
import Products from "./pages/public/Products";

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminLogin from "./pages/admin/AdminLogin";

// --------------------------
// ProtectedRoute component
// --------------------------
interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  adminOnly = false,
}) => {
  const { user, loading } = useAuth();

  if (loading) return null; // replace with spinner if needed

  if (!user) return <Navigate to="/" replace />;

  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

// --------------------------
// Layout component
// --------------------------
const Layout: React.FC = () => {


  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Header/>

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

      {/* Login modal lives here */}
      {/* <Login open={loginOpen} onOpenChange={setLoginOpen} /> */}
    </div>
  );
};

// --------------------------
// App Component
// --------------------------
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/products" element={<Products />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <ProtectedRoute adminOnly>
              <AdminProducts />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
