/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        'particles-1': "radial-gradient(circle, rgba(255,165,0,0.15) 1px, transparent 1px), radial-gradient(circle, rgba(255,165,0,0.1) 1px, transparent 1px)",
        'particles-2': "radial-gradient(circle, rgba(147,51,234,0.15) 1px, transparent 1px), radial-gradient(circle, rgba(147,51,234,0.1) 0.5px, transparent 0.5px)",
        'particles-3': "radial-gradient(circle, rgba(255,69,0,0.15) 0.5px, transparent 0.5px), radial-gradient(circle, rgba(255,69,0,0.1) 1px, transparent 1px)",
      },
      backgroundSize: {
        'particle-sm': '12px 12px',
        'particle-md': '16px 16px',
        'particle-lg': '20px 20px',
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "border-flow": {
          "0%, 100%": {
            "background-position": "0% 50%",
            transform: "rotate(0deg)",
          },
          "25%": {
            "background-position": "50% 25%",
            transform: "rotate(0.5deg)",
          },
          "50%": {
            "background-position": "100% 50%",
            transform: "rotate(0deg)",
          },
          "75%": {
            "background-position": "50% 75%",
            transform: "rotate(-0.5deg)",
          },
        },
        "particles-flow-1": {
          "0%": { transform: "translateX(0) translateY(0)" },
          "33%": { transform: "translateX(10px) translateY(-5px)" },
          "66%": { transform: "translateX(-5px) translateY(10px)" },
          "100%": { transform: "translateX(0) translateY(0)" },
        },
        "particles-flow-2": {
          "0%": { transform: "translateX(0) translateY(0)" },
          "33%": { transform: "translateX(-8px) translateY(8px)" },
          "66%": { transform: "translateX(8px) translateY(-4px)" },
          "100%": { transform: "translateX(0) translateY(0)" },
        },
        "particles-flow-3": {
          "0%": { transform: "translateX(0) translateY(0)" },
          "33%": { transform: "translateX(12px) translateY(6px)" },
          "66%": { transform: "translateX(-6px) translateY(-8px)" },
          "100%": { transform: "translateX(0) translateY(0)" },
        },
        "glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "0.8" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "border-flow": "border-flow 15s ease-in-out infinite",
        "particles-1": "particles-flow-1 20s ease-in-out infinite",
        "particles-2": "particles-flow-2 25s ease-in-out infinite",
        "particles-3": "particles-flow-3 30s ease-in-out infinite",
        "glow": "glow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require('tailwind-scrollbar')
  ],
}

