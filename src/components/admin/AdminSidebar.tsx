"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Film,
  Tv,
  List,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAppDispatch } from "@/redux/hooks";
import { setAdminAuthenticated } from "@/redux/slices/uiSlice";
import { cn } from "@/utils/cn";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin?tab=upload-movie", label: "Upload Movie", icon: Film },
  { href: "/admin?tab=upload-series", label: "Upload Series", icon: Tv },
  { href: "/admin?tab=manage", label: "Manage Content", icon: List },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(setAdminAuthenticated(false));
    sessionStorage.removeItem("adminKey");
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border z-50">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-gold to-yellow-600 flex items-center justify-center">
            <Film className="w-5 h-5 text-background" />
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href.split("?")[0];

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                isActive
                  ? "bg-primary-gold/10 text-primary-gold border border-primary-gold/30"
                  : "text-text-muted hover:text-text-primary hover:bg-border"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-text-muted hover:text-text-primary hover:bg-border transition-all mb-2"
        >
          <ExternalLink className="w-5 h-5" />
          <span className="font-medium">View Website</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
