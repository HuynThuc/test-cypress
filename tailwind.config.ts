type CustomScreen = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
  '3xl': number;
};

const SCREENS: CustomScreen = {
  xs: 420,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  '3xl': 1920,
};

function screenToPx(screen: number) {
  return `${screen}px`;
}

function screenUp(screen: number) {
  return { min: screenToPx(screen) };
}

function screenDown(screen: number) {
  return { max: screenToPx(screen - 1) };
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: [
    './app/**/*.{html,js,ts,tsx}',
    './components/**/*.{html,js,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        oppositeBackground: 'hsl(var(--opposite-background))',
        surface: 'hsl(var(--surface))',
        bgSecondary: 'hsl(var(--background-secondary))',
        border: 'hsl(var(--border))',
        success: '#177f3d',
        warning: '#ca8a04',
        error: '#b91d1b',
        primary: 'hsl(var(--primary-color))',
        icon: 'hsl(var(--icon))',
        text: {
          light: 'hsl(var(--text-light))',
          dark: 'hsl(var(--text-dark))',
          secondary: 'hsl(var(--text-secondary))',
          onPrimary: 'hsl(var(--on-primary))',
          prima: 'hsl(var(--primary))',
        },
      },
      boxShadow: {
        inset: 'var(--shadow-elevation-01-inset)',
        e0: 'var(--shadow-elevation-00)',
        e1: 'var(--shadow-elevation-01)',
        e2: 'var(--shadow-elevation-02)',
        e3: 'var(--shadow-elevation-03)',
        e4: 'var(--shadow-elevation-04)',
        e5: 'var(--shadow-elevation-05)',
        e6: 'var(--shadow-elevation-06)',
        dropdown: 'var(--shadow-elevation-01-inset)',
      },
      screens: {
        sx: screenUp(SCREENS.xs),
        xsDown: screenDown(SCREENS.sm),

        sm: screenUp(SCREENS.sm),
        smDown: screenDown(SCREENS.md),

        md: screenUp(SCREENS.md),
        mdDown: screenDown(SCREENS.lg),

        lg: screenUp(SCREENS.lg),
        lgDown: screenDown(SCREENS.xl),

        xl: screenUp(SCREENS.xl),
        xlDown: screenDown(SCREENS['2xl']),

        '2xl': screenUp(SCREENS['2xl']),
        '2xlDown': screenDown(SCREENS['3xl']),

        '3xl': screenUp(SCREENS['3xl']),
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
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - var(--gap)))' },
        },
        'marquee-vertical': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(calc(-100% - var(--gap)))' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        marquee: 'marquee var(--duration) linear infinite',
        'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
      },
      transitionProperty: {
        height: 'height',
      },
    },
  },
  variants: {
    extend: {
      height: ['responsive', 'hover', 'focus'],
    },
  },
  plugins: [require('tailwindcss-animate'), require('tailwind-scrollbar-hide')],
};
