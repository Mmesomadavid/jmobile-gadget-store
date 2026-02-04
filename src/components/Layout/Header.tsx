'use client';

import { useState } from 'react';
import { Search, Heart, ShoppingCart, User, Menu, X, LogOut, Package, Settings } from 'lucide-react';
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
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';

const categories = [
  { value: 'all', label: 'All' },
  { value: 'phones', label: 'Phones' },
  { value: 'accessories', label: 'Accessories' },
  { value: 'chargers', label: 'Chargers' },
  { value: 'audio', label: 'Audio' },
  { value: 'wearables', label: 'Wearables' },
  { value: 'gaming', label: 'Gaming' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('all');
  const [loginOpen, setLoginOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const cartItems = [
    { id: 1, name: 'iPhone 14 Pro Max Case', price: '?5,999', image: '??' },
    { id: 2, name: 'USB-C Fast Charger 65W', price: '?8,500', image: '??' },
  ];
  const wishlistItems = [
    { id: 1, name: 'AirPods Pro 2nd Gen', price: '?175,000' },
    { id: 2, name: 'Samsung 45W Super Fast Charger', price: '?12,500' },
  ];

  const handleAuthGate = () => {
    if (!user) {
      setLoginOpen(true);
      return false;
    }
    return true;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-200/70">
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
                <SelectItem value="ngn">???? NGN</SelectItem>
                <SelectItem value="usd">?? USD</SelectItem>
              </SelectContent>
            </Select>

            {user ? (
              <span className="text-gray-600 font-medium">Welcome {user.name}, Happy Shopping!</span>
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
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-end md:justify-between gap-2 sm:gap-4">
        {/* Desktop Search Bar */}
        <div className="flex-1 hidden md:flex max-w-3xl">
          <div className="w-full flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-100/70 transition">
            <Select value={searchCategory} onValueChange={setSearchCategory}>
              <SelectTrigger className="h-10 sm:h-11 w-[120px] sm:w-[140px] border-0 border-r border-gray-200 bg-gray-50 text-xs sm:text-sm font-medium rounded-none">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="text"
              placeholder="Search for any product or brand"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-0 h-10 sm:h-11 focus-visible:ring-0 flex-1 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base bg-transparent"
            />
            <button
              className="px-3 sm:px-4 py-1.5 sm:py-2 text-gray-500 hover:text-blue-600 transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Icons (Desktop & Mobile) */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Heart / Wishlist */}
          <HoverCard>
            <HoverCardTrigger asChild>
              <button
                className="text-gray-600 hover:text-red-500 transition"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
              </button>
            </HoverCardTrigger>
            <HoverCardContent align="end" className="w-80">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold">Wishlist</p>
                {user ? (
                  <button
                    onClick={() => navigate('/wishlist')}
                    className="text-xs text-blue-600 hover:text-blue-700"
                  >
                    View all
                  </button>
                ) : null}
              </div>
              {user ? (
                <div className="space-y-3">
                  {wishlistItems.map((item) => (
                    <div key={item.id} className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.price}</p>
                      </div>
                    </div>
                  ))}
                  {wishlistItems.length === 0 && (
                    <p className="text-sm text-gray-500">Your wishlist is empty.</p>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Sign in to view your wishlist.</p>
                  <button
                    onClick={() => setLoginOpen(true)}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Sign in
                  </button>
                </div>
              )}
            </HoverCardContent>
          </HoverCard>

          {/* Cart */}
          <HoverCard>
            <HoverCardTrigger asChild>
              <button
                onClick={() => !user && setLoginOpen(true)}
                className="relative text-gray-600 hover:text-blue-600 transition"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-semibold">
                    {cartItems.length}
                  </span>
                )}
              </button>
            </HoverCardTrigger>
            <HoverCardContent align="end" className="w-80">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold">Cart</p>
                {user ? (
                  <button
                    onClick={() => navigate('/cart')}
                    className="text-xs text-blue-600 hover:text-blue-700"
                  >
                    View cart
                  </button>
                ) : null}
              </div>
              {user ? (
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.price}</p>
                      </div>
                    </div>
                  ))}
                  {cartItems.length === 0 && (
                    <p className="text-sm text-gray-500">Your cart is empty.</p>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Sign in to view your cart.</p>
                  <button
                    onClick={() => setLoginOpen(true)}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Sign in
                  </button>
                </div>
              )}
            </HoverCardContent>
          </HoverCard>

          {/* User */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex items-center justify-center rounded-full p-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                  aria-label="User menu"
                >
                  <User className="h-5 w-5" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                sideOffset={8}
                className="w-64 rounded-xl border border-gray-100 bg-white p-2 shadow-xl"
              >
                {/* User Info */}
                <DropdownMenuLabel className="px-3 py-2 text-sm font-semibold text-gray-900">
                  <span className="block truncate">{user.name}</span>
                  <span className="block truncate text-xs font-normal text-gray-500">
                    {user.email}
                  </span>
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="my-1" />

                {/* Menu Items */}
                <DropdownMenuItem
                  onClick={() => handleAuthGate() && navigate('/orders')}
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-100 focus:bg-gray-100"
                >
                  <Package className="h-5 w-5 text-gray-500" />
                  <span>My Orders</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => handleAuthGate() && navigate('/wishlist')}
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-100 focus:bg-gray-100"
                >
                  <Heart className="h-5 w-5 text-gray-500" />
                  <span>Wishlist</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => handleAuthGate() && navigate('/account')}
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-100 focus:bg-gray-100"
                >
                  <Settings className="h-5 w-5 text-gray-500" />
                  <span>Account Settings</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="my-1" />

                {/* Logout */}
                <DropdownMenuItem
                  onClick={logout}
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 transition hover:bg-red-50 focus:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <button
              onClick={() => setLoginOpen(true)}
              className="text-gray-600 hover:text-gray-900"
              aria-label="Sign in"
            >
              <User className="w-5 h-5" />
            </button>
          )}

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
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-100/70 transition mb-2">
            <Select value={searchCategory} onValueChange={setSearchCategory}>
              <SelectTrigger className="h-9 w-[110px] border-0 border-r border-gray-200 bg-gray-50 text-xs font-medium rounded-none">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-0 h-9 focus-visible:ring-0 flex-1 px-3 py-2 text-sm bg-transparent"
            />
            <button
              className="px-2 text-gray-400 hover:text-blue-600 transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Categories Label */}
          <p className="text-gray-500 text-sm font-semibold uppercase mb-1">Categories</p>
        </div>
      )}

      <Login open={loginOpen} onOpenChange={setLoginOpen} />
    </header>
  );
}
