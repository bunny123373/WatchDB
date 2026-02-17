"use client";

import { useEffect, useState } from "react";
import { Film, Tv, PlayCircle, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface Stats {
  totalMovies: number;
  totalSeries: number;
  totalEpisodes: number;
  trendingCount: number;
}

export default function AdminStats() {
  const [stats, setStats] = useState<Stats>({
    totalMovies: 0,
    totalSeries: 0,
    totalEpisodes: 0,
    trendingCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const adminKey = sessionStorage.getItem("adminKey");
      const response = await fetch("/api/admin/stats", {
        headers: { "x-admin-key": adminKey || "" },
      });
      const data = await response.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      label: "Total Movies",
      value: stats.totalMovies,
      icon: Film,
      color: "from-primary-gold to-yellow-600",
      bgColor: "bg-primary-gold/10",
      textColor: "text-primary-gold",
    },
    {
      label: "Total Series",
      value: stats.totalSeries,
      icon: Tv,
      color: "from-secondary-purple to-purple-600",
      bgColor: "bg-secondary-purple/10",
      textColor: "text-secondary-purple",
    },
    {
      label: "Total Episodes",
      value: stats.totalEpisodes,
      icon: PlayCircle,
      color: "from-accent-green to-green-600",
      bgColor: "bg-accent-green/10",
      textColor: "text-accent-green",
    },
    {
      label: "Trending",
      value: stats.trendingCount,
      icon: TrendingUp,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-500/10",
      textColor: "text-blue-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-2xl border border-border p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-text-muted text-sm mb-1">{stat.label}</p>
                <h3 className="text-3xl font-bold text-text-primary">
                  {loading ? "-" : stat.value}
                </h3>
              </div>
              <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${stat.textColor}`} />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
