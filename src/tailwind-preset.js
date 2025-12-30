/**
 * Tailwind CSS Preset for cortex-react-components
 * 
 * This preset contains all the theme configuration (colors, typography, animations, etc.)
 * that the component library uses. Consumers should extend their Tailwind config with this preset.
 * 
 * Usage in consuming app's tailwind.config.js:
 * 
 * ```js
 * import cortexPreset from 'cortex-react-components/tailwind-preset';
 * 
 * export default {
 *   presets: [cortexPreset],
 *   content: [
 *     './src/**\/*.{js,ts,jsx,tsx}',
 *     // Include the library's components for Tailwind to scan
 *     './node_modules/cortex-react-components/dist/**\/*.{js,mjs}',
 *   ],
 *   // ... your other config
 * };
 * ```
 */

/** @type {import('tailwindcss').Config} */
const cortexPreset = {
  darkMode: ['selector'],
  safelist: [
    // Brand colors
    { pattern: /bg-brand-(plum|blue|green|orange|cyan)(-\d{2,3}|foreground)?/ },
    { pattern: /text-brand-(plum|blue|green|orange|cyan)(-\d{2,3}|foreground)?/ },
    { pattern: /from-brand-(plum|blue|green|orange|cyan)/ },
    { pattern: /to-brand-(plum|blue|green|orange|cyan)/ },
    // Theme colors
    { pattern: /bg-(background|foreground|card|popover|primary|secondary|muted|accent|destructive|border|input|ring)/ },
    { pattern: /text-(background|foreground|card|popover|primary|secondary|muted|accent|destructive)/ },
    { pattern: /border-(background|foreground|card|popover|primary|secondary|muted|accent|destructive|border|error|success|warning)/ },
    // Sidebar
    { pattern: /bg-sidebar(-background|-foreground|-primary|-accent|-border|-ring)?/ },
    { pattern: /text-sidebar(-foreground|-primary-foreground|-accent-foreground)?/ },
    // Status colors
    'bg-error/30', 'bg-success/30', 'bg-warning/30',
    'border-error', 'border-success', 'border-warning',
    // Layout
    'lg:col-span-4', 'lg:col-span-6', 'lg:col-span-8', 'lg:col-span-12',
    // Charts
    'bg-chart-1', 'bg-chart-2', 'bg-chart-3', 'bg-chart-4', 'bg-chart-5',
  ],
  theme: {
    fontFamily: {
      sans: ['Manrope', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    screens: {
      xs: '320px',
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '3rem',
        '2xl': '4rem',
      },
      screens: {
        xs: '90%',
        sm: '90%',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
    },
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        expand: 'expand 0.3s ease-out',
        collapse: 'collapse 0.3s ease-out',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        accent: {
          DEFAULT: 'rgb(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        background: 'hsl(var(--background))',
        border: 'hsla(var(--border))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        foreground: 'hsl(var(--foreground))',
        input: 'hsl(var(--input))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'rgb(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          ON_HOVER: 'hsla(var(--primary), 0.75)',
        },
        ring: 'hsl(var(--ring))',
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        success: 'hsl(var(--success))',
        error: 'hsl(var(--error))',
        warning: 'hsl(var(--warning))',
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
        brand: {
          plum: {
            DEFAULT: '#a52368',
            foreground: '#fff',
            50: '#fcf3f9',
            100: '#fae9f5',
            200: '#f7d3ec',
            300: '#f2afdb',
            400: '#e97dc2',
            500: '#df55a9',
            600: '#cc368a',
            700: '#a52368',
            800: '#92225c',
            900: '#7a214f',
            950: '#4a0d2c',
          },
          green: {
            DEFAULT: '#22b2aa',
            foreground: '#fff',
            50: '#f1fcfa',
            100: '#d0f7f1',
            200: '#a0efe4',
            300: '#69dfd3',
            400: '#3ac7bd',
            500: '#22b2aa',
            600: '#178a85',
            700: '#176e6c',
            800: '#175858',
            900: '#184949',
            950: '#072b2c',
          },
          blue: {
            DEFAULT: '#004857',
            foreground: '#fff',
            50: '#e9fffd',
            100: '#c9fff9',
            200: '#99fff7',
            300: '#54fff4',
            400: '#07fffb',
            500: '#00e4ef',
            600: '#00b5c9',
            700: '#0090a1',
            800: '#087382',
            900: '#0c5e6d',
            950: '#004857',
          },
          cyan: {
            DEFAULT: '#2dafe5',
            foreground: '#fff',
            50: '#f1f9fe',
            100: '#e2f2fc',
            200: '#bee6f9',
            300: '#85d2f4',
            400: '#44bcec',
            500: '#2dafe5',
            600: '#0e83bb',
            700: '#0d6897',
            800: '#0f597d',
            900: '#124968',
            950: '#0c2f45',
          },
          orange: {
            DEFAULT: '#f59c00',
            foreground: '#fff',
            50: '#fffcea',
            100: '#fff4c5',
            200: '#ffea85',
            300: '#ffd946',
            400: '#ffc51b',
            500: '#f59c00',
            600: '#e27a00',
            700: '#bb5402',
            800: '#984008',
            900: '#7c350b',
            950: '#481a00',
          },
        },
      },
      boxShadow: {
        1: '0px 0px 60px 0px rgba(0, 0, 0, 0.05)',
        2: '0px 0px 15px 10px rgba(255, 255, 255, 0.1)',
        3: '0px 4px 25px 0px rgba(0, 0, 0, 0.06)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        expand: {
          from: { height: 0 },
          to: { height: 'var(--radix-collapsible-content-height)' },
        },
        collapse: {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to: { height: 0 },
        },
      },
      clipPath: {
        shape: 'polygon(0 0, 100% 0%, 100% 85%, 0 100%)',
      },
      backgroundImage: {
        'gradient-1': 'linear-gradient(180deg,var(--tw-gradient-stops))',
      },
      transitionDuration: {
        350: '350ms',
        400: '400ms',
      },
      typography: {
        DEFAULT: {
          css: [
            {
              color: 'hsl(var(--foreground))',
              h1: {
                fontSize: '3.5rem',
                fontWeight: 'normal',
                marginBottom: '0.25em',
              },
              h2: {
                fontWeight: 'normal',
                color: 'rgb(var(--primary))',
                fontSize: '2em',
              },
              strong: {
                fontWeight: '700',
                color: 'rgb(var(--accent))',
              },
            },
          ],
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animated'),
    require('@tailwindcss/typography'),
    // Note: tailwindcss-intersect removed as it can cause CSS parsing issues with some bundlers
    // If you need it, add it to your own tailwind.config.js: require('tailwindcss-intersect')
    function ({ addUtilities }) {
      addUtilities({
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
      });
    },
  ],
};

module.exports = cortexPreset;
