'use client';

import { useState } from 'react';
import { Search, Heart, ShoppingCart, User, Menu, X } from 'lucide-react';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useAuth } from '../../context/AuthContext';
import Login from '../Auth/Login';
import Logo from '../Logo';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loginOpen, setLoginOpen] = useState(false);
  const [wishlistHover, setWishlistHover] = useState(false);
  const { user } = useAuth();

  const cartItems = [
    { id: 1, name: 'iPhone 14 Pro Max Case', price: '₦5,999', image: '📱' },
    { id: 2, name: 'USB-C Fast Charger 65W', price: '₦8,500', image: '🔌' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-none border-gray-200">
      {/* Top Bar */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-2 sm:py-3 flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-4">
            {/* Currency */}
            <Select defaultValue="ngn">
              <SelectTrigger className="w-12 h-7 p-1 border-0 bg-transparent text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ngn">🇳🇬 NGN</SelectItem>
                <SelectItem value="usd">💵 USD</SelectItem>
              </SelectContent>
            </Select>

            {user ? (
              <span className="text-gray-600 font-medium">{user.name}</span>
            ) : (
              <button
                onClick={() => setLoginOpen(true)}
                className="text-gray-600 hover:text-gray-900 transition"
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between gap-2 sm:gap-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Logo/>
        </div>

        {/* Desktop Search Bar */}
        <div className="flex-1 hidden md:flex max-w-2xl">
          <div className="w-full flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
            <Input
              type="text"
              placeholder="Search for any product or brand"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-0 h-10 focus-visible:ring-0 flex-1 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base"
            />
            <button className="px-3 sm:px-4 py-1.5 sm:py-2 text-gray-400 hover:text-gray-600 transition">
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Icons (Desktop & Mobile) */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Heart / Wishlist */}
          <button
            onClick={() => setWishlistHover(!wishlistHover)}
            className="text-gray-600 hover:text-red-500 transition"
          >
            <Heart className="w-5 h-5" />
          </button>

          {/* Cart */}
          <button
            onClick={() => !user && setLoginOpen(true)}
            className="relative text-gray-600 hover:text-blue-600 transition"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-semibold">
                {cartItems.length}
              </span>
            )}
          </button>

          {/* User */}
          <button
            onClick={() => setLoginOpen(true)}
            className="text-gray-600 hover:text-gray-900"
          >
            <User className="w-5 h-5" />
          </button>

          {/* Hamburger Menu (mobile only) */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 space-y-2 px-4">
          {/* Mobile Search */}
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white mb-2">
            <Input
              type="text"
              placeholder="Search..."
              className="border-0 focus-visible:ring-0 flex-1 px-3 py-2 text-sm"
            />
            <Search className="w-4 h-4 text-gray-400 mr-2" />
          </div>

          {/* Categories Label */}
          <p className="text-gray-500 text-sm font-semibold uppercase mb-1">Categories</p>
        </div>
      )}

      <Login open={loginOpen} onOpenChange={setLoginOpen} />
    </header>
  );
}
