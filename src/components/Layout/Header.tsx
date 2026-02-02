'use client';

import { useState } from 'react';
import { Search,  Heart, ShoppingCart, User,  Menu, X } from 'lucide-react';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface HeaderProps {
  cartCount?: number;
}

export default function Header({ cartCount = 0 }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All Categories',
    'Electronics',
    'Fashion',
    "Women's",
    "Men's Fashion",
    'Health & Beauty',
    'Pharmacy',
    'Groceries',
    'Luxury Item'
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      {/* Top Bar */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <Select defaultValue="ae">
              <SelectTrigger className="w-12 h-8 p-1 border-0 bg-transparent">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ae">NGN</SelectItem>
                <SelectItem value="sa">USA</SelectItem>
              </SelectContent>
            </Select>
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

            <button className="text-gray-600 hover:text-gray-900">
              <Heart className="w-5 h-5" />
            </button>

            <button className="relative text-gray-600 hover:text-gray-900">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button className="text-gray-600 hover:text-gray-900">
              <User className="w-5 h-5" />
            </button>
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
    </header>
  );
}
