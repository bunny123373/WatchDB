"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Play, Download, Star, Calendar, Globe, ArrowLeft, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { IContent } from "@/models/Content";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import ContentGrid from "@/components/ContentGrid";
import AdBanner from "@/components/AdBanner";
import { formatDate } from "@/utils/formatDate";

export default function MovieDetailsPage() {
  const params = useParams();
  const [movie, setMovie] = useState<IContent | null>(null);
  const [similarMovies, setSimilarMovies] = useState<IContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchMovie();
    }
  }, [params.id]);

  const fetchMovie = async () => {
    try {
      const response = await fetch(`/api/content/${params.id}`);
      const data = await response.json();
      if (data.success) {
        setMovie(data.data);
        fetchSimilarMovies(data.data.language, data.data._id);
      }
    } catch (error) {
      console.error("Failed to fetch movie:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSimilarMovies = async (language: string, excludeId: string) => {
    try {
      const response = await fetch(`/api/content?type=movie&language=${language}`);
      const data = await response.json();
      if (data.success) {
        setSimilarMovies(data.data.filter((m: IContent) => String(m._id) !== excludeId).slice(0, 6));
      }
    } catch (error) {
      console.error("Failed to fetch similar movies:", error);
    }
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

  if (!movie) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 text-center">
          <h1 className="text-2xl font-bold text-text-primary">Movie not found</h1>
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
            src={movie.banner || movie.poster}
            alt={movie.title}
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
                  src={movie.poster}
                  alt={movie.title}
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
                <Badge variant="gold">Movie</Badge>
                {movie.quality && <Badge variant="purple">{movie.quality}</Badge>}
                {movie.rating && (
                  <Badge variant="green" className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    {movie.rating}
                  </Badge>
                )}
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl font-bold text-text-primary">
                {movie.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-text-muted">
                {movie.year && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {movie.year}
                  </span>
                )}
                {movie.language && (
                  <span className="flex items-center gap-1.5">
                    <Globe className="w-4 h-4" />
                    {movie.language}
                  </span>
                )}
                {movie.category && (
                  <Badge variant="outline">{movie.category}</Badge>
                )}
              </div>

              {/* Description */}
              {movie.description && (
                <p className="text-text-muted text-lg leading-relaxed">
                  {movie.description}
                </p>
              )}

              {/* Tags */}
              {movie.tags && movie.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {movie.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full bg-card border border-border text-sm text-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href={`/watch/${movie._id}`}>
                  <Button size="lg" className="gap-2">
                    <Play className="w-5 h-5 fill-current" />
                    Watch Now
                  </Button>
                </Link>
                {movie.downloadLink && (
                  <a
                    href={movie.downloadLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="lg" className="gap-2">
                      <Download className="w-5 h-5" />
                      Download
                    </Button>
                  </a>
                )}
              </div>

              {/* Additional Info */}
              <div className="pt-6 border-t border-border">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-text-muted block">Added</span>
                    <span className="text-text-primary">{formatDate(movie.createdAt)}</span>
                  </div>
                  <div>
                    <span className="text-text-muted block">Type</span>
                    <span className="text-text-primary capitalize">{movie.type}</span>
                  </div>
                  {movie.category && (
                    <div>
                      <span className="text-text-muted block">Category</span>
                      <span className="text-text-primary">{movie.category}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Ad Banner */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <AdBanner slot="movie-details" className="w-full h-24" />
        </div>

        {/* Similar Movies */}
        {similarMovies.length > 0 && (
          <ContentGrid title="Similar Movies" items={similarMovies} horizontal icon="movie" />
        )}
      </div>

      <Footer />
    </main>
  );
}
