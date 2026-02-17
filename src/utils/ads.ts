export const isAdsEnabled = (): boolean => {
  return process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true";
};

export const getAdSenseClientId = (): string => {
  return process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "";
};

export const AD_SLOTS = {
  homeHero: "home-hero",
  homeSection: "home-section",
  movieDetails: "movie-details",
  movieWatch: "movie-watch",
  seriesDetails: "series-details",
  seriesWatch: "series-watch",
} as const;
