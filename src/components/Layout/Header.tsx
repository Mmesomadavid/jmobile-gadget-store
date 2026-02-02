"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  MapPin,
  Search,
  User,
} from "lucide-react";
import { Separator } from "../../components/ui/separator";
import Login from "../Auth/Login"; // 👈 adjust path if needed

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ color: "", storage: "" });

  // 🔐 auth state (replace later with real auth)
  const isAuthenticated = false;

  // login dialog state
  const [loginOpen, setLoginOpen] = useState(false);

  const requireAuth = () => {
    if (!isAuthenticated) {
      setLoginOpen(true);
      return false;
    }
    return true;
  };

  return (
    <>
      <header className="bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 relative">
            {/* Logo */}
            <a href="/" className="text-xl font-bold text-gray-800">
              GadgetStore
            </a>

            {/* Search */}
            <div className="flex-1 flex justify-center relative">
              <AnimatePresence>
                {showSearch && (
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    exit={{ opacity: 0, scaleX: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute max-w-xl w-full"
                  >
                    <div className="flex items-center w-full border rounded-full px-3 py-1">
                      <Search className="w-4 h-4 text-gray-400 mr-2" />
                      <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search gadgets..."
                        className="flex-1 text-sm focus:outline-none"
                      />

                      <Separator orientation="vertical" className="h-6 mx-2" />

                      <select
                        className="text-sm bg-transparent"
                        value={filters.color}
                        onChange={(e) =>
                          setFilters({ ...filters, color: e.target.value })
                        }
                      >
                        <option value="">Color</option>
                        <option value="black">Black</option>
                        <option value="white">White</option>
                        <option value="blue">Blue</option>
                      </select>

                      <Separator orientation="vertical" className="h-6 mx-2" />

                      <select
                        className="text-sm bg-transparent"
                        value={filters.storage}
                        onChange={(e) =>
                          setFilters({ ...filters, storage: e.target.value })
                        }
                      >
                        <option value="">Storage</option>
                        <option value="64">64GB</option>
                        <option value="128">128GB</option>
                        <option value="256">256GB</option>
                      </select>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-3">
              <button onClick={() => setShowSearch((p) => !p)}>
                <Search className="w-5 h-5" />
              </button>

              <button
                onClick={() => requireAuth()}
                className="relative"
              >
                <ShoppingBag className="w-5 h-5" />
              </button>

              <MapPin className="w-5 h-5" />

              <button onClick={() => requireAuth()}>
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* LOGIN DIALOG */}
      <Login open={loginOpen} onOpenChange={setLoginOpen} />
    </>
  );
};

export default Header;
