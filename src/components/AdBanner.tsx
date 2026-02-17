"use client";

import { useEffect, useRef } from "react";
import { isAdsEnabled, getAdSenseClientId } from "@/utils/ads";

interface AdBannerProps {
  slot: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function AdBanner({ slot, className = "", style }: AdBannerProps) {
  const adRef = useRef<HTMLModElement | null>(null);
  const adsLoaded = useRef(false);

  useEffect(() => {
    if (!isAdsEnabled() || adsLoaded.current) return;

    try {
      const adsbygoogle = (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle || [];
      adsbygoogle.push({});
      adsLoaded.current = true;
    } catch (error) {
      console.log("AdSense error:", error);
    }
  }, []);

  if (!isAdsEnabled()) {
    return null;
  }

  return (
    <div className={`ad-container ${className}`} style={style}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", ...style }}
        data-ad-client={getAdSenseClientId()}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
