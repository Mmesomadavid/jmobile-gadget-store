"use client";

import GoogleIcon from "../../assets/icons/google-icon.png";
import FastCart from "../../assets/icons/fast-cart.png"; // 👈 your cart image

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";

interface LoginProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const Login = ({ open, onOpenChange }: LoginProps) => {
  const handleGoogleLogin = () => {
    console.log("Google auth clicked");
    // TODO: integrate Google auth
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
            className="w-full flex items-center justify-center gap-3 py-6 rounded-xl text-sm border border-black"
          >
            <img
              src={GoogleIcon}
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </Button>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            We’ll never post without your permission.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
