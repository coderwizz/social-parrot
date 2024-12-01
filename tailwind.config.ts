import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        parrotGradient: 'linear-gradient(to right, #a8e063, #ffed62, #ff6961)', // Light parrot gradient
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      animation: {
        'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
        shine: 'shine var(--duration) infinite linear',
        shoot: 'shoot 4s linear infinite',
        meteor: 'meteor 5s linear infinite',
        shimmer: 'shimmer 3s ease-in-out infinite', // Add shimmer animation
        glossy: 'glossy 4s ease-in-out infinite', // Glossy effect animation
      },
      keyframes: {
        'border-beam': {
          '100%': {
            'offset-distance': '100%',
          },
        },
        shine: {
          '0%': {
            'background-position': '0% 0%',
          },
          '50%': {
            'background-position': '100% 100%',
          },
          to: {
            'background-position': '0% 0%',
          },
        },
        shoot: {
          '0%': {
            transform: 'translateY(0) translateX(0)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(100vh) translateX(100vw)',
            opacity: '0',
          },
        },
        meteor: {
          '0%': {
            transform: 'rotate(215deg) translateX(0)',
            opacity: '1',
          },
          '70%': {
            opacity: '1',
          },
          '100%': {
            transform: 'rotate(215deg) translateX(-500px)',
            opacity: '0',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-200% 0',
          },
          '50%': {
            backgroundPosition: '200% 0',
          },
          '100%': {
            backgroundPosition: '-200% 0',
          },
        },
        glossy: {
          '0%': {
            backgroundPosition: '0% 0%',
            opacity: '0.8',
          },
          '50%': {
            backgroundPosition: '100% 100%',
            opacity: '1',
          },
          '100%': {
            backgroundPosition: '0% 0%',
            opacity: '0.8',
          },
        },
      },
      // Custom styles for DisclaimerNotice component
      typography: {
        DEFAULT: {
          css: {
            '.disclaimer-container': {
              padding: '20px',
              backgroundColor: '#f9f9f9',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            },
            '.disclaimer-text': {
              color: 'var(--foreground)',
              fontSize: '1rem',
              lineHeight: '1.5',
            },
            '.disclaimer-title': {
              fontWeight: 'bold',
              fontSize: '1.2rem',
              color: 'var(--primary)',
            },
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;