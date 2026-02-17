"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, Film, Tv } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setSearch, setTypeFilter } from "@/redux/slices/uiSlice";
import { cn } from "@/utils/cn";
import { TYPE_OPTIONS } from "@/utils/constants";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { search, typeFilter } = useAppSelector((state) => state.ui);
  const pathname = usePathname();

  const isAdminRoute = pathname.startsWith("/admin");
  if (isAdminRoute) return null;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-gold to-yellow-600 flex items-center justify-center">
              <Film className="w-5 h-5 text-background" />
            </div>
            <span className="text-xl font-bold text-text-primary">
              Telugu<span className="text-primary-gold">DB</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {/* Type Filter */}
            <div className="flex items-center gap-1 bg-card rounded-xl p-1 border border-border">
              {TYPE_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => dispatch(setTypeFilter(option.value as "all" | "movie" | "series"))}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200",
                    typeFilter === option.value
                      ? "bg-primary-gold text-background"
                      : "text-text-muted hover:text-text-primary"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                placeholder="Search movies, series..."
                value={search}
                onChange={(e) => dispatch(setSearch(e.target.value))}
                className="w-64 pl-10 pr-4 py-2 rounded-xl bg-card border border-border text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-primary-gold transition-all"
              />
            </div>

            {/* Links */}
            <Link
              href="/"
              className={cn(
                "text-sm font-medium transition-colors",
                pathname === "/" ? "text-primary-gold" : "text-text-muted hover:text-text-primary"
              )}
            >
              Home
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-lg hover:bg-card transition-colors"
            >
              <Search className="w-5 h-5 text-text-muted" />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-card transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-text-muted" />
              ) : (
                <Menu className="w-5 h-5 text-text-muted" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input
                    type="text"
                    placeholder="Search movies, series..."
                    value={search}
                    onChange={(e) => dispatch(setSearch(e.target.value))}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-border text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-primary-gold"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-border"
            >
              <div className="py-4 space-y-3">
                {/* Type Filter Mobile */}
                <div className="flex gap-2">
                  {TYPE_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        dispatch(setTypeFilter(option.value as "all" | "movie" | "series"));
                        setIsMenuOpen(false);
                      }}
                      className={cn(
                        "flex-1 px-3 py-2 rounded-xl text-sm font-medium transition-all",
                        typeFilter === option.value
                          ? "bg-primary-gold text-background"
                          : "bg-card text-text-muted border border-border"
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>

                <Link
                  href="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-card transition-colors"
                >
                  <Film className="w-5 h-5 text-primary-gold" />
                  <span className="text-text-primary font-medium">Home</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
