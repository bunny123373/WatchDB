"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Play, Download, Star, Calendar, Globe, ArrowLeft, Layers } from "lucide-react";
import { motion } from "framer-motion";
import { IContent, IEpisode } from "@/models/Content";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import EpisodeList from "@/components/EpisodeList";
import ContentGrid from "@/components/ContentGrid";
import AdBanner from "@/components/AdBanner";
import { formatDate } from "@/utils/formatDate";

export default function SeriesDetailsPage() {
  const params = useParams();
  const [series, setSeries] = useState<IContent | null>(null);
  const [similarSeries, setSimilarSeries] = useState<IContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchSeries();
    }
  }, [params.id]);

  const fetchSeries = async () => {
    try {
      const response = await fetch(`/api/content/${params.id}`);
      const data = await response.json();
      if (data.success) {
        setSeries(data.data);
        fetchSimilarSeries(data.data._id);
      }
    } catch (error) {
      console.error("Failed to fetch series:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSimilarSeries = async (excludeId: string) => {
    try {
      const response = await fetch("/api/content?type=series");
      const data = await response.json();
      if (data.success) {
        setSimilarSeries(data.data.filter((s: IContent) => String(s._id) !== excludeId).slice(0, 6));
      }
    } catch (error) {
      console.error("Failed to fetch similar series:", error);
    }
  };

  const handleEpisodeSelect = (episode: IEpisode, seasonNumber: number) => {
    // Navigate to watch page with episode info
    window.location.href = `/series/watch/${series?._id}?season=${seasonNumber}&episode=${episode.episodeNumber}`;
  };

  const getTotalEpisodes = () => {
    return series?.seasons?.reduce((acc, season) => acc + (season.episodes?.length || 0), 0) || 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-16">
          <div className="h-[50vh] bg-card animate-pulse" />
        </div>
      </div>
    );
  }

  if (!series) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 text-center">
          <h1 className="text-2xl font-bold text-text-primary">Series not found</h1>
          <Link href="/" className="text-primary-gold mt-4 inline-block">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-16">
        {/* Banner Background */}
        <div className="relative h-[50vh] min-h-[400px]">
          <Image
            src={series.banner || series.poster}
            alt={series.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Poster */}
            <div className="lg:col-span-1">
              <div className="relative aspect-[2/3] rounded-2xl overflow-hidden border border-border shadow-2xl">
                <Image
                  src={series.poster}
                  alt={series.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Back Link */}
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-text-muted hover:text-primary-gold transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="purple">Web Series</Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Layers className="w-3 h-3" />
                  {series.seasons?.length || 0} Seasons
                </Badge>
                <Badge variant="outline">
                  {getTotalEpisodes()} Episodes
                </Badge>
                {series.rating && (
                  <Badge variant="green" className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    {series.rating}
                  </Badge>
                )}
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl font-bold text-text-primary">
                {series.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-text-muted">
                {series.year && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {series.year}
                  </span>
                )}
                {series.language && (
                  <span className="flex items-center gap-1.5">
                    <Globe className="w-4 h-4" />
                    {series.language}
                  </span>
                )}
              </div>

              {/* Description */}
              {series.description && (
                <p className="text-text-muted text-lg leading-relaxed">
                  {series.description}
                </p>
              )}

              {/* Tags */}
              {series.tags && series.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {series.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full bg-card border border-border text-sm text-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Watch Button */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href={`/series/watch/${series._id}`}>
                  <Button size="lg" variant="secondary" className="gap-2">
                    <Play className="w-5 h-5 fill-current" />
                    Start Watching
                  </Button>
                </Link>
              </div>

              {/* Additional Info */}
              <div className="pt-6 border-t border-border">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-text-muted block">Added</span>
                    <span className="text-text-primary">{formatDate(series.createdAt)}</span>
                  </div>
                  <div>
                    <span className="text-text-muted block">Seasons</span>
                    <span className="text-text-primary">{series.seasons?.length || 0}</span>
                  </div>
                  <div>
                    <span className="text-text-muted block">Episodes</span>
                    <span className="text-text-primary">{getTotalEpisodes()}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Ad Banner */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <AdBanner slot="series-details" className="w-full h-24" />
        </div>

        {/* Episode List */}
        <div className="max-w-4xl mx-auto px-4 pb-12">
          {series.seasons && series.seasons.length > 0 && (
            <EpisodeList
              seasons={series.seasons}
              onEpisodeSelect={handleEpisodeSelect}
            />
          )}
        </div>

        {/* Similar Series */}
        {similarSeries.length > 0 && (
          <ContentGrid title="Similar Series" items={similarSeries} horizontal icon="series" />
        )}
      </div>

      <Footer />
    </main>
  );
}
