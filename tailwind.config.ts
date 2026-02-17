import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050608",
        card: "#0E1015",
        border: "#1F232D",
        "primary-gold": "#F5C542",
        "secondary-purple": "#8B5CF6",
        "accent-green": "#22C55E",
        "text-primary": "#F9FAFB",
        "text-muted": "#9CA3AF",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gold-gradient": "linear-gradient(135deg, #F5C542 0%, #D4A017 100%)",
        "purple-gradient": "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
      },
      boxShadow: {
        "gold-glow": "0 0 20px rgba(245, 197, 66, 0.3)",
        "purple-glow": "0 0 20px rgba(139, 92, 246, 0.3)",
        "green-glow": "0 0 20px rgba(34, 197, 94, 0.3)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(245, 197, 66, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(245, 197, 66, 0.6)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
