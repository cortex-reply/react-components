/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/components/**/*.{html,js,jsx,ts,tsx}',
    './src/server/**/*.{html,js,jsx,ts,tsx}',
    './src/styles/**/*.{html,js,jsx,ts,tsx}',
    './src/sections/**/*.{html,js,jsx,ts,tsx}',
    './src/pages/**/*.{html,js,jsx,ts,tsx}',
  ],
  darkMode: ['selector'],
  corePlugins: {
    // preflight: false
  },
  plugins: [
    require('tailwindcss-animated'),
    require('@tailwindcss/typography'),
    require('tailwindcss-intersect'),
  ],
  prefix: '',
  safelist: [
    {
      pattern: /bg-brand-(plum|blue|green|orange)(-\d{2,3}|foreground|)/,
    },
    {
      pattern: /text-brand-(plum|blue|green|orange)-\d{2,3}/,
    },
    'intersect:animate-delay-100',
    'intersect:animate-delay-200',
    'intersect:animate-delay-300',
    'intersect:animate-delay-400',
    'intersect:animate-delay-500',
    'lg:col-span-4',
    'lg:col-span-6',
    'lg:col-span-8',
    'lg:col-span-12',
    'border-border',
    'bg-card',
    'border-error',
    'bg-error/30',
    'border-success',
    'bg-success/30',
    'border-warning',
    'bg-warning/30',
    'bg-background',
    'bg-foreground',
    'bg-card',
    'bg-card-foreground',
    'bg-popover',
    'bg-popover-foreground',
    'bg-primary',
    'bg-primary/75',
    'bg-primary-foreground',
    'bg-secondary',
    'bg-secondary-foreground',
    'bg-muted',
    'bg-muted-foreground',
    'bg-accent',
    'bg-accent-foreground',
    'bg-destructive',
    'bg-destructive-foreground',
    'bg-border',
    'bg-input',
    'bg-ring',
    'bg-chart-1',
    'bg-chart-2',
    'bg-chart-3',
    'bg-chart-4',
    'bg-chart-5',
    'bg-sidebar-background',
    'bg-sidebar-foreground',
    'bg-sidebar-primary',
    'bg-sidebar-primary-foreground',
    'bg-sidebar-accent',
    'bg-sidebar-accent-foreground',
    'bg-sidebar-border',
    'bg-sidebar-ring',
    'bg-brand-one',
    'bg-brand-one-DEFAULT',
    'bg-brand-one-foreground',
    'text-brand-one-foreground',
    'bg-brand-orange-100',
    'bg-brand-one-200',
    'bg-brand-one-300',
    'bg-brand-one-400',
    'bg-brand-one-500',
    'bg-brand-one-600',
    'bg-brand-one-700',
    'bg-brand-one-800',
    'bg-brand-one-900',
    'bg-brand-two',
    'bg-brand-two-DEFAULT',
    'bg-brand-two-foreground',
    'text-brand-two-foreground',
    'bg-brand-two-100',
    'bg-brand-two-200',
    'bg-brand-two-300',
    'bg-brand-two-400',
    'bg-brand-two-500',
    'bg-brand-two-600',
    'bg-brand-two-700',
    'bg-brand-two-800',
    'bg-brand-two-900',
    'bg-brand-three',
    'bg-brand-three-DEFAULT',
    'bg-brand-three-foreground',
    'text-brand-three-foreground',
    'bg-brand-three-100',
    'bg-brand-three-200',
    'bg-brand-three-300',
    'bg-brand-three-400',
    'bg-brand-three-500',
    'bg-brand-three-600',
    'bg-brand-three-700',
    'bg-brand-three-800',
    'bg-brand-three-900',
    'bg-brand-four',
    'bg-brand-four-DEFAULT',
    'bg-brand-four-foreground',
    'text-brand-four-foreground',
    'bg-brand-four-100',
    'bg-brand-four-200',
    'bg-brand-four-300',
    'bg-brand-four-400',
    'bg-brand-four-500',
    'bg-brand-four-600',
    'bg-brand-four-700',
    'bg-brand-four-800',
    'bg-brand-four-900',
    'from-brand-one',
    'from-brand-two',
    'from-brand-three',
    'from-brand-four',
    'from-brand-five',
    'to-brand-one',
    'to-brand-two',
    'to-brand-three',
    'to-brand-four',
    'to-brand-five',
    // Add other dynamic class names as needed
  ],
  theme: {
    fontFamily: {
      sans: ['Manrope', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    screens: {
      xs: '320px', // Extra small screens (custom)
      sm: '480px', // Small screens
      md: '768px', // Medium screens
      lg: '1024px', // Large screens
      xl: '1280px', // Extra Large screens
      '2xl': '1440px', // 2XL screens
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem', // Base padding for all screens
        sm: '1rem', // Small screens
        md: '1.5rem', // Medium screens
        lg: '2rem', // Large screens
        xl: '3rem', // Extra Large screens
        '2xl': '4rem', // 2XL screens
      },
      screens: {
        xs: '90%', // Extra small screens (custom)
        sm: '90%', // Small screens
        md: '768px', // Medium screens
        lg: '1024px', // Large screens
        xl: '1280px', // Extra Large screens
        '2xl': '1440px', // 2XL screens
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
          // DEFAULT: '#A42368',
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
      // fontFamily: {
      //   mono: ['var(--font-geist-mono)'],
      //   sans: ['var(--font-geist-sans)'],
      // },
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
        shape: 'polygon(0 0, 100% 0%, 100% 85%, 0 100%)', // Customize this to get the curve or shape you need
      },
      backgroundImage: {
        'gradient-1': 'linear-gradient(180deg,var(--tw-gradient-stops))',
      },
      transitionDuration: {
        350: '350ms',
        400: '400ms',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: 'hsl(var(--foreground))',
            '--tw-prose-bold': 'rgb(var(--accent))',
            // '--tw-prose-body': 'var(--text)',
            // '--tw-prose-headings': 'var(--text)',
            h1: {
              fontSize: '3.5rem',
              fontWeight: 'normal',
              marginBottom: '0.25em',
            },
            h2: {
              fontWeight: 'normal',
              fontSize: '2em'
            },
            b : {
              fontWeight: '700'
            }
          },
        },
      }),
    },
  },
}

export default config
