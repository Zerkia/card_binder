import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: (props: any) => ({
      body: {
        color: props.colorMode === 'dark' ? '#ffffff' : '#000000',
        backgroundColor: props.colorMode === 'dark' ? '#FFFDD0' : '#FFFDE6',
      },
    }),
  },
  colors: {
    darkBlue: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554',
      color: '#ffffff',
    },
  },
  components: {
    Button: {
      variants: {
        solid: (props: any) => ({
          bg: props.colorMode === 'dark' ? 'darkBlue.600' : 'darkBlue.700',
          color: 'white',
          _hover: {
            bg: props.colorMode === 'dark' ? 'darkBlue.700' : 'darkBlue.600',
          },
        }),
      },
    },
    Input: {
      baseStyle: {
        field: {
          border: '1px solid black',
          _hover: {
            borderColor: 'black',
          },
        },
      },
      variants: {
        outline: {
          field: {
            borderColor: 'black',
            _hover: {
              borderColor: 'black',
            },
          },
        },
        filled: {
          field: {
            borderColor: 'black',
            _hover: {
              borderColor: 'black',
            },
          },
        },
      },
    },
  },
});

export default theme;
