"use client";

import Link from "next/link";
import Image from "next/image";
import { Play, Download, Star, Calendar, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { IContent } from "@/models/Content";
import Button from "./ui/Button";
import Badge from "./ui/Badge";

interface HeroBannerProps {
  content: IContent;
}

export default function HeroBanner({ content }: HeroBannerProps) {
  if (!content) return null;

  const isMovie = content.type === "movie";
  const watchLink = isMovie ? `/watch/${content._id}` : `/series/watch/${content._id}`;
  const detailsLink = isMovie ? `/movie/${content._id}` : `/series/${content._id}`;

  return (
    <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] min-h-[300px] sm:min-h-[400px] md:min-h-[500px] max-h-[400px] sm:max-h-[600px] md:max-h-[800px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={content.banner || content.poster}
          alt={content.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent sm:via-background/80 md:via-background/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xl sm:max-w-2xl space-y-3 sm:space-y-4 md:space-y-6"
        >
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="gold" className="text-xs sm:text-sm">{isMovie ? "Movie" : "Web Series"}</Badge>
            {content.quality && <Badge variant="purple" className="text-xs sm:text-sm">{content.quality}</Badge>}
            {content.rating && (
              <Badge variant="green" className="text-xs sm:text-sm flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" />
                {content.rating}
              </Badge>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-text-primary leading-tight">
            {content.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-text-muted">
            {content.year && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3 sm:w-4 h-3 sm:h-4" />
                {content.year}
              </span>
            )}
            {content.language && (
              <span className="flex items-center gap-1">
                <Globe className="w-3 sm:w-4 h-3 sm:h-4" />
                {content.language}
              </span>
            )}
          </div>

          {/* Description */}
          {content.description && (
            <p className="text-text-muted text-sm sm:text-lg line-clamp-2 sm:line-clamp-3 max-w-xl">
              {content.description}
            </p>
          )}

          {/* Tags */}
          {content.tags && content.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {content.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-card border border-border text-xs text-text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-wrap gap-2 sm:gap-4 pt-1 sm:pt-2">
            <Link href={watchLink}>
              <Button size="md" className="gap-1 sm:gap-2">
                <Play className="w-4 sm:w-5 h-4 sm:h-5 fill-current" />
                <span className="hidden sm:inline">Watch Now</span>
                <span className="sm:hidden">Watch</span>
              </Button>
            </Link>
            {content.downloadLink && (
              <a
                href={content.downloadLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="md" className="gap-1 sm:gap-2">
                  <Download className="w-4 sm:w-5 h-4 sm:h-5" />
                  <span className="hidden sm:inline">Download</span>
                  <span className="sm:hidden">DL</span>
                </Button>
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
