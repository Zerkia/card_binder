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
  fonts: {
    body: 'Roboto, sans-serif',
    heading: 'Poppins, sans-serif',
  },
});

export default theme;
