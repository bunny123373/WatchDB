"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setContent } from "@/redux/slices/contentSlice";
import { IContent } from "@/models/Content";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import ContentGrid from "@/components/ContentGrid";
import Footer from "@/components/Footer";
import AdBanner from "@/components/AdBanner";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { list: content } = useAppSelector((state) => state.content);
  const { search, typeFilter } = useAppSelector((state) => state.ui);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch("/api/content");
      const data = await response.json();
      if (data.success) {
        dispatch(setContent(data.data));
      }
    } catch (error) {
      console.error("Failed to fetch content:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter content based on search and type filter
  const filteredContent = content.filter((item: IContent) => {
    const matchesSearch =
      !search ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.tags?.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));

    const matchesType = typeFilter === "all" || item.type === typeFilter;

    return matchesSearch && matchesType;
  });

  // Get featured content (first trending or latest item)
  const featuredContent =
    filteredContent.find((item) => item.category === "Trending") ||
    filteredContent[0];

  // Get content by category
  const trendingContent = filteredContent.filter((item) => item.category === "Trending");
  const latestContent = filteredContent.filter((item) => item.category === "Latest");
  const teluguMovies = filteredContent.filter(
    (item) => item.type === "movie" && item.language === "Telugu"
  );
  const hindiDubbed = filteredContent.filter(
    (item) => item.type === "movie" && (item.language === "Hindi" || item.category === "Dubbed")
  );
  const webSeries = filteredContent.filter((item) => item.type === "series");

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-16">
          {/* Skeleton Hero */}
          <div className="h-[70vh] bg-card animate-pulse" />
          {/* Skeleton Grid */}
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="h-8 w-48 bg-card rounded-lg mb-6" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-[2/3] bg-card rounded-2xl animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-16">
        {/* Hero Banner */}
        {featuredContent && !search && typeFilter === "all" && (
          <HeroBanner content={featuredContent} />
        )}

        {/* Ad Banner after Hero */}
        {!search && typeFilter === "all" && (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <AdBanner slot="home-hero" className="w-full h-24" />
          </div>
        )}

        {/* Content Sections */}
        <div className="space-y-8 pb-8">
          {/* Trending */}
          {trendingContent.length > 0 && !search && (
            <ContentGrid
              title="Trending Now"
              items={trendingContent.slice(0, 8)}
              horizontal
              icon="movie"
            />
          )}

          {/* Ad between sections */}
          {!search && typeFilter === "all" && (
            <div className="max-w-7xl mx-auto px-4">
              <AdBanner slot="home-section" className="w-full h-24" />
            </div>
          )}

          {/* Latest Uploads */}
          {latestContent.length > 0 && (
            <ContentGrid
              title={search ? "Search Results" : "Latest Uploads"}
              items={search ? filteredContent : latestContent}
              horizontal
              icon="movie"
            />
          )}

          {/* Telugu Movies */}
          {teluguMovies.length > 0 && !search && typeFilter !== "series" && (
            <ContentGrid
              title="Telugu Movies"
              items={teluguMovies}
              horizontal
              icon="movie"
            />
          )}

          {/* Hindi Dubbed */}
          {hindiDubbed.length > 0 && !search && typeFilter !== "series" && (
            <ContentGrid
              title="Hindi Dubbed"
              items={hindiDubbed}
              horizontal
              icon="movie"
            />
          )}

          {/* Web Series */}
          {webSeries.length > 0 && !search && typeFilter !== "movie" && (
            <ContentGrid
              title="Web Series"
              items={webSeries}
              horizontal
              icon="series"
            />
          )}

          {/* No Results */}
          {filteredContent.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <h2 className="text-2xl font-bold text-text-primary mb-2">No results found</h2>
              <p className="text-text-muted">Try adjusting your search or filters</p>
            </motion.div>
          )}
        </div>

        {/* Ad before footer */}
        <div className="max-w-7xl mx-auto px-4 pb-8">
          <AdBanner slot="home-section" className="w-full h-24" />
        </div>
      </div>

      <Footer />
    </main>
  );
}
