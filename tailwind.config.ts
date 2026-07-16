import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Hammersmith One', 'sans-serif'],
        body: ['Inria Sans', 'sans-serif'],
      },
      colors: {
        background: "hsl(var(--bg))",
        foreground: "hsl(var(--fg))",
        surface: "hsl(var(--bg-surface))",
        border: "hsl(var(--border))",
        ring: "hsl(var(--ring))",
        muted: {
          DEFAULT: "hsl(var(--fg-muted))",
          foreground: "hsl(var(--fg-muted))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-fg))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-fg))",
        },
        // Keep shadcn compat
        card: {
          DEFAULT: "hsl(var(--bg-surface))",
          foreground: "hsl(var(--fg))",
        },
        popover: {
          DEFAULT: "hsl(var(--bg-surface))",
          foreground: "hsl(var(--fg))",
        },
        destructive: {
          DEFAULT: "hsl(0 72% 51%)",
          foreground: "hsl(0 0% 100%)",
        },
        input: "hsl(var(--border))",
        accent: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-fg))",
        },
        // Status colors
        approved: "hsl(var(--approved))",
        pending: "hsl(var(--pending))",
        rejected: "hsl(var(--rejected))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0,0,0,.08), 0 1px 2px -1px rgba(0,0,0,.06)',
        'card-hover': '0 10px 25px -3px rgba(0,0,0,.15), 0 4px 6px -4px rgba(0,0,0,.12)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
