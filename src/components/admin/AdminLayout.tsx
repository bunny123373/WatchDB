"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Film } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setAdminAuthenticated } from "@/redux/slices/uiSlice";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [adminKey, setAdminKey] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { isAdminAuthenticated } = useAppSelector((state) => state.ui);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: adminKey }),
      });

      const data = await response.json();

      if (data.success) {
        dispatch(setAdminAuthenticated(true));
        sessionStorage.setItem("adminKey", adminKey);
      } else {
        setError("Invalid admin key");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  // Check session storage on mount
  if (typeof window !== "undefined") {
    const storedKey = sessionStorage.getItem("adminKey");
    if (storedKey && !isAdminAuthenticated) {
      fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: storedKey }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            dispatch(setAdminAuthenticated(true));
          } else {
            sessionStorage.removeItem("adminKey");
          }
        });
    }
  }

  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-card rounded-2xl border border-border p-8 shadow-2xl">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-gold to-yellow-600 flex items-center justify-center mx-auto mb-4">
                <Film className="w-8 h-8 text-background" />
              </div>
              <h1 className="text-2xl font-bold text-text-primary">
                Telugu<span className="text-primary-gold">DB</span> Admin
              </h1>
              <p className="text-text-muted mt-2">Enter admin key to continue</p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="password"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  placeholder="Enter admin key"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-background border border-border text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-primary-gold transition-all"
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full" isLoading={isLoading}>
                Access Admin Panel
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="p-8">{children}</main>
    </div>
  );
}
