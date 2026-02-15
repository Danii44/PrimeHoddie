import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import animatePlugin from 'tailwindcss-animate'

const config: Config = {
  // 1. Enable class-based dark mode
  darkMode: ['class'],
  
  // 2. Critical: Tell Tailwind to look in ALL your folders for CSS classes
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './sections/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        display: ['Montserrat', ...defaultTheme.fontFamily.sans],
        mono: ['Space Grotesk', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        // --- MANDATORY SYSTEM COLORS (Fixes the border-border error) ---
        // These map the HSL variables from your globals.css to Tailwind classes
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // --- YOUR CUSTOM PRIME COLORS ---
        'prime-black': '#0B0C0F',
        'prime-charcoal': '#12131A',
        'prime-violet': '#7B2FF7',
        'prime-white': '#F2F4F8',
        'prime-gray': '#A6ACB8',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      // Keeps your specific custom border mapping
      borderColor: {
        'prime-border': 'rgba(255, 255, 255, 0.08)',
      },
    },
  },
  plugins: [animatePlugin],
}

export default config