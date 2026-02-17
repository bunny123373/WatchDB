"use client";

import Link from "next/link";
import { Film, Heart, Github, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-gold to-yellow-600 flex items-center justify-center">
                <Film className="w-5 h-5 text-background" />
              </div>
              <span className="text-xl font-bold text-text-primary">
                Telugu<span className="text-primary-gold">DB</span>
              </span>
            </Link>
            <p className="text-text-muted max-w-sm mb-6">
              Watch. Download. Stream Premium Cinema. Your ultimate destination for Telugu movies and web series.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-border flex items-center justify-center text-text-muted hover:text-primary-gold hover:bg-primary-gold/10 transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-border flex items-center justify-center text-text-muted hover:text-primary-gold hover:bg-primary-gold/10 transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-border flex items-center justify-center text-text-muted hover:text-primary-gold hover:bg-primary-gold/10 transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-text-primary font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-text-muted hover:text-primary-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/?type=movie" className="text-text-muted hover:text-primary-gold transition-colors">
                  Movies
                </Link>
              </li>
              <li>
                <Link href="/?type=series" className="text-text-muted hover:text-primary-gold transition-colors">
                  Web Series
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-text-primary font-semibold mb-4">Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/?category=Trending" className="text-text-muted hover:text-primary-gold transition-colors">
                  Trending
                </Link>
              </li>
              <li>
                <Link href="/?category=Latest" className="text-text-muted hover:text-primary-gold transition-colors">
                  Latest
                </Link>
              </li>
              <li>
                <Link href="/?category=Dubbed" className="text-text-muted hover:text-primary-gold transition-colors">
                  Dubbed
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-sm">
            TeluguDB &copy; {currentYear}. All rights reserved.
          </p>
          <p className="text-text-muted text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> for cinema lovers
          </p>
        </div>
      </div>
    </footer>
  );
}
