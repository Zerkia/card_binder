import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      ':root': {
        '--foreground-rgb': '0, 0, 0',
        '--background-start-rgb': '255, 253, 230',
        '--background-end-rgb': '255, 253, 230',
      },
      '@media (prefers-color-scheme: dark)': {
        ':root': {
          '--foreground-rgb': '255, 255, 255',
          '--background-start-rgb': '255, 253, 208',
          '--background-end-rgb': '255, 253, 208',
        },
      },
      body: {
        color: `rgb(var(--foreground-rgb))`,
        background: `linear-gradient(to bottom, transparent, rgb(var(--background-end-rgb))) rgb(var(--background-start-rgb))`,
      },
    },
  },
  fonts: {
    body: 'Roboto, sans-serif',
    heading: 'Poppins, sans-serif',
  },
});

export default theme;
