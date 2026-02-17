"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminStats from "@/components/admin/AdminStats";
import UploadMovieForm from "@/components/admin/UploadMovieForm";
import UploadSeriesForm from "@/components/admin/UploadSeriesForm";
import AdminContentTable from "@/components/admin/AdminContentTable";

const tabs = [
  { id: "dashboard", label: "Dashboard" },
  { id: "upload-movie", label: "Upload Movie" },
  { id: "upload-series", label: "Upload Series" },
  { id: "manage", label: "Manage Content" },
];

function AdminPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && tabs.find((t) => t.id === tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    router.push(`/admin?tab=${tabId}`);
  };

  const handleUploadSuccess = () => {
    setRefreshTrigger((prev) => prev + 1);
    handleTabChange("manage");
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-text-primary">TeluguDB Admin Panel</h1>
            <p className="text-text-muted mt-1">Manage your content and uploads</p>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-border pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-primary-gold text-background"
                  : "text-text-muted hover:text-text-primary hover:bg-card"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              <AdminStats />
              <div className="bg-card rounded-2xl border border-border p-8">
                <h2 className="text-xl font-bold text-text-primary mb-4">Welcome to TeluguDB Admin</h2>
                <p className="text-text-muted mb-6">
                  Use the navigation tabs above to manage your content. You can upload movies and web series,
                  edit existing content, and view statistics about your platform.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-background rounded-xl border border-border">
                    <h3 className="font-semibold text-text-primary mb-2">Upload Movie</h3>
                    <p className="text-sm text-text-muted">Add new movies with streaming and download links</p>
                  </div>
                  <div className="p-4 bg-background rounded-xl border border-border">
                    <h3 className="font-semibold text-text-primary mb-2">Upload Series</h3>
                    <p className="text-sm text-text-muted">Add web series with seasons and episodes</p>
                  </div>
                  <div className="p-4 bg-background rounded-xl border border-border">
                    <h3 className="font-semibold text-text-primary mb-2">Manage Content</h3>
                    <p className="text-sm text-text-muted">Edit or delete existing movies and series</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "upload-movie" && (
            <UploadMovieForm onSuccess={handleUploadSuccess} />
          )}

          {activeTab === "upload-series" && (
            <UploadSeriesForm onSuccess={handleUploadSuccess} />
          )}

          {activeTab === "manage" && (
            <AdminContentTable refreshTrigger={refreshTrigger} />
          )}

          {activeTab === "categories" && (
            <div className="bg-card rounded-2xl border border-border p-8 text-center">
              <p className="text-text-muted">Categories management coming soon</p>
            </div>
          )}
        </motion.div>
      </div>
    </AdminLayout>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>}>
      <AdminPageContent />
    </Suspense>
  );
}
