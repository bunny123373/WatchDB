"use client";

import { useState } from "react";
import { Play, Download, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ISeason, IEpisode } from "@/models/Content";
import { cn } from "@/utils/cn";
import Badge from "./ui/Badge";

interface EpisodeListProps {
  seasons: ISeason[];
  currentEpisodeId?: string;
  onEpisodeSelect?: (episode: IEpisode, seasonNumber: number) => void;
}

export default function EpisodeList({
  seasons,
  currentEpisodeId,
  onEpisodeSelect,
}: EpisodeListProps) {
  const [expandedSeason, setExpandedSeason] = useState<number>(seasons[0]?.seasonNumber || 1);

  const toggleSeason = (seasonNumber: number) => {
    setExpandedSeason(expandedSeason === seasonNumber ? 0 : seasonNumber);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
        Episodes
        <span className="text-sm font-normal text-text-muted">
          ({seasons.reduce((acc, s) => acc + s.episodes.length, 0)} total)
        </span>
      </h3>

      <div className="space-y-3">
        {seasons.map((season) => (
          <div
            key={season.seasonNumber}
            className="bg-card rounded-xl border border-border overflow-hidden"
          >
            {/* Season Header */}
            <button
              onClick={() => toggleSeason(season.seasonNumber)}
              className="w-full flex items-center justify-between p-4 hover:bg-border/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg font-semibold text-text-primary">
                  Season {season.seasonNumber}
                </span>
                <Badge variant="outline" size="sm">
                  {season.episodes.length} {season.episodes.length === 1 ? "Episode" : "Episodes"}
                </Badge>
              </div>
              <ChevronDown
                className={cn(
                  "w-5 h-5 text-text-muted transition-transform duration-300",
                  expandedSeason === season.seasonNumber && "rotate-180"
                )}
              />
            </button>

            {/* Episodes */}
            <AnimatePresence>
              {expandedSeason === season.seasonNumber && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-border">
                    {season.episodes.map((episode, index) => {
                      const episodeId = `${season.seasonNumber}-${episode.episodeNumber}`;
                      const isActive = currentEpisodeId === episodeId;

                      return (
                        <motion.div
                          key={episodeId}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className={cn(
                            "flex items-center gap-4 p-4 hover:bg-border/30 transition-colors",
                            isActive && "bg-primary-gold/10 border-l-4 border-l-primary-gold"
                          )}
                        >
                          {/* Episode Number */}
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-border flex items-center justify-center">
                            <span className="text-sm font-semibold text-text-muted">
                              {episode.episodeNumber}
                            </span>
                          </div>

                          {/* Episode Info */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-text-primary truncate">
                              {episode.episodeTitle}
                            </h4>
                            {episode.quality && (
                              <span className="text-xs text-text-muted">{episode.quality}</span>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2">
                            {episode.embedIframeLink && (
                              <button
                                onClick={() => onEpisodeSelect?.(episode, season.seasonNumber)}
                                className={cn(
                                  "p-2.5 rounded-lg transition-all",
                                  isActive
                                    ? "bg-primary-gold text-background"
                                    : "bg-border text-text-muted hover:text-primary-gold hover:bg-primary-gold/10"
                                )}
                              >
                                <Play className="w-4 h-4 fill-current" />
                              </button>
                            )}
                            {episode.downloadLink && (
                              <a
                                href={episode.downloadLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 rounded-lg bg-border text-text-muted hover:text-secondary-purple hover:bg-secondary-purple/10 transition-all"
                              >
                                <Download className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
