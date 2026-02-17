"use client";

import Link from "next/link";
import Image from "next/image";
import { Play, Star } from "lucide-react";
import { motion } from "framer-motion";
import { IContent } from "@/models/Content";
import Badge from "./ui/Badge";

interface MovieCardProps {
  movie: IContent;
  index?: number;
}

export default function MovieCard({ movie, index = 0 }: MovieCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link href={`/movie/${movie._id}`}>
        <div className="group relative bg-card rounded-xl sm:rounded-2xl overflow-hidden border border-border hover:border-primary-gold/50 transition-all duration-300 hover:shadow-gold-glow">
          {/* Poster */}
          <div className="relative aspect-[2/3] overflow-hidden">
            <Image
              src={movie.poster}
              alt={movie.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
            
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 rounded-full bg-primary-gold/90 flex items-center justify-center backdrop-blur-sm transform scale-75 group-hover:scale-100 transition-transform duration-300">
                <Play className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 text-background fill-current ml-0.5 sm:ml-1" />
              </div>
            </div>

            {/* Quality Badge */}
            {movie.quality && (
              <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                <Badge variant="gold" className="text-xs px-1.5 py-0.5">{movie.quality}</Badge>
              </div>
            )}

            {/* Rating */}
            {movie.rating && (
              <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
                <Badge variant="green" className="text-xs px-1.5 py-0.5 flex items-center gap-0.5">
                  <Star className="w-2.5 h-2.5 fill-current" />
                  {movie.rating}
                </Badge>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-2 sm:p-3 md:p-4">
            <h3 className="font-semibold text-sm sm:text-base text-text-primary line-clamp-1 group-hover:text-primary-gold transition-colors">
              {movie.title}
            </h3>
            <div className="flex items-center justify-between mt-1 sm:mt-2 text-xs sm:text-sm text-text-muted">
              {movie.year && <span>{movie.year}</span>}
              {movie.language && <span>{movie.language}</span>}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
