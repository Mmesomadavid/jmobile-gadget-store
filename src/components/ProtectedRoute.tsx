// src/components/routes/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode; // ✅ use ReactNode instead of JSX.Element
  adminOnly?: boolean;       // optional flag for admin
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();

  if (loading) return null; // or a spinner component

  if (!user) return <Navigate to="/login" replace />;

  if (adminOnly && user.role !== "admin") return <Navigate to="/" replace />;

  return <>{children}</>; // wrap in fragment since ReactNode can be multiple elements
};

export default ProtectedRoute;
