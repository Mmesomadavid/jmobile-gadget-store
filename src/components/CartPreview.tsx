"use client";

import { ShoppingBag } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { Button } from "../components/ui/button";

interface CartPreviewProps {
  isAuthenticated: boolean;
  onRequireAuth: () => void;
}

const CartPreview = ({
  isAuthenticated,
  onRequireAuth,
}: CartPreviewProps) => {
  const handleClick = () => {
    if (!isAuthenticated) {
      onRequireAuth();
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          onClick={handleClick}
          className="relative p-1.5 rounded-full hover:bg-gray-100"
        >
          <ShoppingBag className="w-5 h-5" />
          {/* badge */}
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
            2
          </span>
        </button>
      </PopoverTrigger>

      {isAuthenticated && (
        <PopoverContent
          align="end"
          className="w-72 p-4"
        >
          <p className="text-sm font-medium mb-3">Your Cart</p>

          <div className="space-y-3">
            {/* Cart item mock */}
            <div className="flex justify-between text-sm">
              <span>iPhone 17 Pro</span>
              <span>$1,299</span>
            </div>

            <div className="flex justify-between text-sm">
              <span>AirPods Max</span>
              <span>$549</span>
            </div>
          </div>

          <Button className="w-full mt-4 rounded-full">
            Checkout
          </Button>
        </PopoverContent>
      )}
    </Popover>
  );
};

export default CartPreview;
