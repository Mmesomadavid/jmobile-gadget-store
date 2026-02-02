'use client';

import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import GoogleIcon from "../../assets/icons/google-icon.png";
import FastCart from "../../assets/icons/fast-cart.png";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { useAuth } from "../../context/AuthContext";

interface LoginProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const Login = ({ open, onOpenChange }: LoginProps) => {
  const { login } = useAuth();
  const [searchParams] = useSearchParams(); // destructure tuple correctly
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token"); // now works
    if (token) {
      // Wrap async call inside an IIFE since useEffect cannot be async
      (async () => {
        await login(token); // login is async
        onOpenChange(false); // close modal
        navigate("/"); // redirect after login
      })();
    }
  }, [searchParams, login, navigate, onOpenChange]);

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">
            Sign in to JMobile Gadget Store
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6 flex flex-col items-center">
          {/* FAST CART IMAGE */}
          <img
            src={FastCart}
            alt="Fast checkout"
            className="w-28 mb-6"
          />

          {/* GOOGLE AUTH BUTTON */}
          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full flex items-center justify-center gap-3 py-6 rounded-xl text-sm border border-black hover:bg-zinc-50 transition"
          >
            <img
              src={GoogleIcon}
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </Button>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            By continuing, you agree to our Terms & Privacy Policy.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
