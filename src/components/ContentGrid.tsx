"use client";

import { motion } from "framer-motion";
import { IContent } from "@/models/Content";
import MovieCard from "./MovieCard";
import SeriesCard from "./SeriesCard";
import { Film, Tv } from "lucide-react";

interface ContentGridProps {
  title: string;
  items: IContent[];
  horizontal?: boolean;
  icon?: "movie" | "series";
}

export default function ContentGrid({ title, items, horizontal = false, icon }: ContentGridProps) {
  if (items.length === 0) return null;

  const Icon = icon === "movie" ? Film : icon === "series" ? Tv : null;

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-6"
        >
          {Icon && <Icon className="w-6 h-6 text-primary-gold" />}
          <h2 className="text-2xl font-bold text-text-primary">{title}</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
        </motion.div>

        {/* Content */}
        {horizontal ? (
          <div className="relative -mx-4 px-4">
            <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
              {items.map((item, index) => (
                <div key={String(item._id)} className="flex-shrink-0 w-32 sm:w-40 md:w-44 lg:w-48 snap-start">
                  {item.type === "movie" ? (
                    <MovieCard movie={item} index={index} />
                  ) : (
                    <SeriesCard series={item} index={index} />
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
            {items.map((item, index) => (
              <div key={String(item._id)}>
                {item.type === "movie" ? (
                  <MovieCard movie={item} index={index} />
                ) : (
                  <SeriesCard series={item} index={index} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
