import { extendTheme } from '@chakra-ui/react';

const colors = {
  primary: {
    50: '#e6f7ff',
    100: '#b3e6ff',
    200: '#80d5ff',
    300: '#4dc3ff',
    400: '#1ab2ff',
    500: '#0099e6',
    600: '#0077b3',
    700: '#005580',
    800: '#00334d',
    900: '#001a26',
  },
  success: {
    50: '#e6f9ec',
    100: '#c3f0d5',
    200: '#9fe7be',
    300: '#7bdea6',
    400: '#57d58f',
    500: '#33cc77',
    600: '#29a35f',
    700: '#1f7a47',
    800: '#14522f',
    900: '#0a2918',
  },
  warning: {
    50: '#fff9e6',
    100: '#ffefb3',
    200: '#ffe680',
    300: '#ffdc4d',
    400: '#ffd21a',
    500: '#e6b800',
    600: '#b38f00',
    700: '#806600',
    800: '#4d3d00',
    900: '#1a1400',
  },
  error: {
    50: '#ffe6e6',
    100: '#ffb3b3',
    200: '#ff8080',
    300: '#ff4d4d',
    400: '#ff1a1a',
    500: '#e60000',
    600: '#b30000',
    700: '#800000',
    800: '#4d0000',
    900: '#1a0000',
  },
  neutral: {
    50: '#f8f9fa',
    100: '#e9ecef',
    200: '#dee2e6',
    300: '#ced4da',
    400: '#adb5bd',
    500: '#6c757d',
    600: '#495057',
    700: '#343a40',
    800: '#212529',
    900: '#1a1a1a',
  },
};

const fonts = {
  heading:
    "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
  body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
};

const components = {
  Button: {
    baseStyle: {
      fontWeight: '600',
      borderRadius: 'md',
      _focus: {
        boxShadow: 'outline',
      },
    },
    variants: {
      solid: (props: { colorScheme: string }) => ({
        bg: `${props.colorScheme}.500`,
        color: 'white',
        _hover: {
          bg: `${props.colorScheme}.600`,
          transform: 'translateY(-2px)',
          boxShadow: 'md',
          _disabled: {
            bg: `${props.colorScheme}.500`,
          },
        },
        _active: {
          bg: `${props.colorScheme}.700`,
          transform: 'translateY(0)',
        },
        transition: 'all 0.2s ease-in-out',
      }),
      outline: (props: { colorScheme: string }) => ({
        border: '2px solid',
        borderColor: `${props.colorScheme}.500`,
        color: `${props.colorScheme}.500`,
        _hover: {
          bg: `${props.colorScheme}.50`,
          transform: 'translateY(-2px)',
          boxShadow: 'sm',
        },
        _active: {
          bg: `${props.colorScheme}.100`,
          transform: 'translateY(0)',
        },
        transition: 'all 0.2s ease-in-out',
      }),
    },
  },
  Heading: {
    baseStyle: {
      fontWeight: '700',
      lineHeight: '1.2',
    },
  },
  Card: {
    baseStyle: {
      container: {
        borderRadius: 'lg',
        boxShadow: 'md',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        _hover: {
          boxShadow: 'lg',
        },
      },
    },
  },
  Badge: {
    baseStyle: {
      borderRadius: 'full',
      px: 2,
      py: 1,
      fontWeight: '600',
    },
  },
};

const styles = {
  global: {
    body: {
      bg: 'neutral.50',
      color: 'neutral.800',
    },
    '*': {
      transition:
        'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease',
    },
    'input:focus, button:focus': {
      boxShadow: 'outline',
      outline: 'none',
    },
    '.fade-in': {
      animation: 'fadeIn 0.5s ease-in-out',
    },
    '.slide-up': {
      animation: 'slideUp 0.5s ease-in-out',
    },
    '@keyframes fadeIn': {
      '0%': { opacity: 0 },
      '100%': { opacity: 1 },
    },
    '@keyframes slideUp': {
      '0%': { transform: 'translateY(20px)', opacity: 0 },
      '100%': { transform: 'translateY(0)', opacity: 1 },
    },
    '@keyframes spin': {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' },
    },
  },
};

export const theme = extendTheme({
  colors,
  fonts,
  components,
  styles,
});
