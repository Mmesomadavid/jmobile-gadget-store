'use client';

import  { useState } from 'react';
import { Search, MapPin, Heart, ShoppingCart, User,  Menu, X, LogOut } from 'lucide-react';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu';



export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loginOpen, setLoginOpen] = useState(false);
  const [cartHover, setCartHover] = useState(false);
  const [wishlistHover, setWishlistHover] = useState(false);
  const { user, logout } = useAuth();

  const categories = [
    'Smartphones',
    'Laptops & Computers',
    'Tablets & Ipads',
    'Smartwatches',
    'Headphones & Earbuds',
    'Phone Accessories',
    'Chargers & Power Banks',
    'Phone Cases & Protectors',
    'Screen Protectors',
  ];

  // Mock data - will be replaced with real data from API
  const cartItems = [
    { id: 1, name: 'iPhone 14 Pro Max Case', price: '₦5,999', image: '📱' },
    { id: 2, name: 'USB-C Fast Charger 65W', price: '₦8,500', image: '🔌' }
  ];

  const wishlistItems = [
    { id: 1, name: 'Samsung Galaxy S24 Ultra', price: '₦799,999', image: '📱' },
    { id: 2, name: 'Apple MacBook Pro 16"', price: '₦2,499,999', image: '💻' },
    { id: 3, name: 'Sony WH-1000XM5 Headphones', price: '₦189,999', image: '🎧' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      {/* Top Bar */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <span className="text-gray-600">Deliver to</span>
            <div className="flex items-center gap-2 text-gray-700 font-medium">
              <MapPin className="w-4 h-4" />
              <span>Update Location</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Select defaultValue="ae">
              <SelectTrigger className="w-12 h-8 p-1 border-0 bg-transparent">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ae">🇦🇪 AE</SelectItem>
                <SelectItem value="sa">🇸🇦 SA</SelectItem>
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
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-900">jj.mobilewrld</h1>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl">
            <div className="w-full flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
              <Input
                type="text"
                placeholder="Search for any product or brand"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0 focus-visible:ring-0 flex-1 px-4 py-2"
              />
              <button className="px-4 py-2 text-gray-400 hover:text-gray-600">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Actions - Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <Select defaultValue="best">
              <SelectTrigger className="w-32 h-10 text-sm border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="best">Best Deals</SelectItem>
              </SelectContent>
            </Select>

            <div
              className="relative"
              onMouseEnter={() => setWishlistHover(true)}
              onMouseLeave={() => setWishlistHover(false)}
            >
              <button className="text-gray-600 hover:text-red-500 transition">
                <Heart className="w-5 h-5" />
              </button>

              {/* Wishlist Dropdown Card */}
              {wishlistHover && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">Wishlist ({wishlistItems.length})</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {wishlistItems.length > 0 ? (
                      wishlistItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 p-3 border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer"
                        >
                          <div className="w-12 h-12 rounded bg-gray-100 flex items-center justify-center text-xl">
                            {item.image}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                            <p className="text-sm text-gray-600">{item.price}</p>
                          </div>
                          <button className="text-red-500 hover:text-red-600 transition">
                            <Heart className="w-4 h-4 fill-current" />
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center">
                        <Heart className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">Your wishlist is empty</p>
                      </div>
                    )}
                  </div>
                  {wishlistItems.length > 0 && (
                    <div className="p-3 border-t border-gray-200 bg-gray-50">
                      <button className="w-full py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition">
                        View All Wishlist Items
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div
              className="relative"
              onMouseEnter={() => setCartHover(true)}
              onMouseLeave={() => setCartHover(false)}
            >
              <button
                onClick={() => {
                  if (!user) {
                    setLoginOpen(true);
                  }
                }}
                className="relative text-gray-600 hover:text-blue-600 transition"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                    {cartItems.length}
                  </span>
                )}
              </button>

              {/* Shopping Cart Dropdown Card */}
              {cartHover && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">Shopping Bag ({cartItems.length})</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {cartItems.length > 0 ? (
                      cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 p-3 border-b border-gray-100 hover:bg-gray-50 transition"
                        >
                          <div className="w-12 h-12 rounded bg-gray-100 flex items-center justify-center text-xl">
                            {item.image}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                            <p className="text-sm text-gray-600">{item.price}</p>
                          </div>
                          <button className="text-gray-400 hover:text-red-500 transition">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center">
                        <ShoppingCart className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">Your bag is empty</p>
                      </div>
                    )}
                  </div>
                  {cartItems.length > 0 && (
                    <div className="p-4 border-t border-gray-200 space-y-3 bg-gray-50">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Subtotal:</span>
                        <span className="font-semibold text-gray-900">₦14,499</span>
                      </div>
                      <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                        View Cart & Checkout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="text-gray-600 hover:text-gray-900">
                    <User className="w-5 h-5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-600">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    My Orders
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    My Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    Wishlist
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => logout()}
                    className="cursor-pointer text-red-600"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <button
                onClick={() => setLoginOpen(true)}
                className="text-gray-600 hover:text-gray-900"
              >
                <User className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Category Navigation - Desktop */}
        <div className="hidden lg:flex items-center gap-6 mt-4 text-sm text-gray-700">
          {categories.map((cat) => (
            <button
              key={cat}
              className="hover:text-blue-600 transition"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white mb-4">
              <Input
                type="text"
                placeholder="Search..."
                className="border-0 focus-visible:ring-0 flex-1 px-3 py-2"
              />
              <Search className="w-5 h-5 text-gray-400 mr-2" />
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                className="block w-full text-left py-2 text-sm text-gray-700 hover:text-blue-600"
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>
      <Login open={loginOpen} onOpenChange={setLoginOpen} />
    </header>
  );
}
