import { extendTheme } from '@chakra-ui/react';

// Add font imports to index.html
const theme = extendTheme({
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Inter', sans-serif`,
    mono: `'Courier New', monospace`,
  },
  colors: {
    white: '#fff',
    gray: {
      10: '#f8f8f7',
      25: '#f5f4ec',
      50: '#dcdaca',
      100: '#ccc8b1',
      200: '#aba895',
      300: '#8b8878',
      400: '#7a786a',
      500: '#68665a',
      600: '#545249',
      700: '#3f3e37',
      800: '#2a2a25',
      900: '#1d1d1c',
    },
    black: '#0a0a09',
    yellow: {
      50: '#fefbe8',
      100: '#fef7c3',
      200: '#feee95',
      300: '#fde272',
      400: '#fac515',
      500: '#eaaa08',
      600: '#ca8504',
      700: '#a15c07',
      800: '#854a0e',
      900: '#713b12',
    },
    blue: {
      50: '#d5eaf3',
      100: '#b3d8e9',
      200: '#91c7df',
      300: '#6fb6d5',
      400: '#4da5cb',
      500: '#2b94c1',
      600: '#247ca2',
      700: '#1d6583',
      800: '#164d64',
      900: '#0f3545',
    },
    green: {
      50: '#f5fbee',
      100: '#e6f4d7',
      200: '#ceeab0',
      300: '#acdc79',
      400: '#86cb3c',
      500: '#669f2a',
      600: '#4f7a21',
      700: '#3f621a',
      800: '#335015',
      900: '#2b4212',
    },
    orange: {
      50: '#f8e1cd',
      100: '#f2c9a4',
      200: '#edb07c',
      300: '#e79854',
      400: '#e2802b',
      500: '#dc6803',
      600: '#b95703',
      700: '#964702',
      800: '#723602',
      900: '#4f2501',
    },
    red: {
      50: '#f4d8d3',
      100: '#ecb9b1',
      200: '#e39a8e',
      300: '#da7a6b',
      400: '#d25b48',
      500: '#c93c25',
      600: '#a9321f',
      700: '#892919',
      800: '#691f13',
      900: '#48160d',
    },
    teal: {
      50: '#ddebee',
      100: '#b2cdd3',
      200: '#90b7c0',
      300: '#6da1ac',
      400: '#4b8b99',
      500: '#297585',
      600: '#226270',
      700: '#1c505a',
      800: '#153d45',
      900: '#0f2a30',
    },
    brand: {
      50: '#ddebee',
      100: '#b2cdd3',
      200: '#90b7c0',
      300: '#6da1ac',
      400: '#4b8b99',
      500: '#297585',
      primary: '#297585',
      600: '#226270',
      700: '#1c505a',
      800: '#153d45',
      900: '#0f2a30',
    },
    condition: {
      mint: '#22c35e',
      nearMint: '#4299e1',
      veryGoodPlus: '#805ad5',
      veryGood: '#d69e2e',
      good: '#dd6b20',
      fair: '#e53e3e',
      poor: '#718096',
      mintBg: '#22c35e',
      nearMintBg: '#4299e1',
      veryGoodPlusBg: '#805ad5',
      veryGoodBg: '#d69e2e',
      goodBg: '#dd6b20',
      fairBg: '#e53e3e',
      poorBg: '#718096',
    },
    background01: {
      light: '#f7f7f7',
      dark: '#1a202c',
    },
  },
  components: {
    Text: {
      baseStyle: {
        fontSize: '16px',
        lineHeight: '1.5',
        color: 'gray.800',
        fontFamily: `'Inter', sans-serif`,
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: 'bold',
        color: 'brand.500',
        fontFamily: `'Poppins', sans-serif`,
      },
      sizes: {
        lg: {
          fontSize: '2xl',
        },
        md: {
          fontSize: 'xl',
        },
        sm: {
          fontSize: 'lg',
        },
      },
      variants: {
        solid: {
          color: 'brand.500',
        },
        outline: {
          color: 'gray.600',
        },
      },
    },
    Badge: {
      baseStyle: {
        px: 2,
        py: 1,
        borderRadius: 'full',
        fontWeight: 'medium',
        fontSize: 'xs',
        textTransform: 'none',
      },
      variants: {
        mint: {
          bg: 'green.100',
          color: 'green.700',
          borderWidth: '1px',
          borderColor: 'green.200',
        },
        nearMint: {
          bg: 'blue.100',
          color: 'blue.700',
          borderWidth: '1px',
          borderColor: 'blue.200',
        },
        veryGoodPlus: {
          bg: 'purple.100',
          color: 'purple.700',
          borderWidth: '1px',
          borderColor: 'purple.200',
        },
        veryGood: {
          bg: 'yellow.100',
          color: 'yellow.700',
          borderWidth: '1px',
          borderColor: 'yellow.200',
        },
        good: {
          bg: 'orange.100',
          color: 'orange.700',
          borderWidth: '1px',
          borderColor: 'orange.200',
        },
        fair: {
          bg: 'red.100',
          color: 'red.700',
          borderWidth: '1px',
          borderColor: 'red.200',
        },
        poor: {
          bg: 'gray.100',
          color: 'gray.700',
          borderWidth: '1px',
          borderColor: 'gray.200',
        },
      },
    },
    Highlight: {
      baseStyle: {
        bg: 'yellow.100',
        fontWeight: 'bold',
        color: 'black',
      },
    },
    Button: {
      baseStyle: {
        fontWeight: 'normal',
        textTransform: 'none',
        borderRadius: 'md',
      },
      variants: {
        solid: {
          bg: 'brand.primary',
          color: 'white',
          _hover: {
            bg: 'brand.700',
            transform: 'translateY(0px)',
            boxShadow: 'lg',
          },
          _active: {
            bg: 'brand.700',
          },
        },
        outline: {
          borderColor: 'brand.primary',
          color: 'brand.500',
          _hover: {
            bg: 'brand.50',
          },
          _active: {
            bg: 'brand.100',
          },
        },
      },
    },
    Tabs: {
      variants: {
        enclosed: {
          tablist: {
            borderBottom: '1px solid',
            borderColor: 'gray.100',
            _dark: {
              borderColor: 'gray.700',
            },
          },
          tab: {
            borderWidth: '1px',
            borderColor: 'transparent',
            borderBottom: 'none',
            _selected: {
              bg: 'gray.800',
              color: 'white',
              borderColor: 'gray.100',
              _dark: {
                bg: 'gray.700',
                borderColor: 'gray.700',
              },
            },
            _hover: {
              bg: 'gray.50',
              _dark: {
                bg: 'gray.700',
              },
            },
            _active: {
              bg: 'gray.100',
              _dark: {
                bg: 'gray.600',
              },
            },
            _disabled: {
              opacity: 0.4,
              cursor: 'not-allowed',
            },
          },
          tabpanel: {
            pt: 4,
            _dark: {
              bg: 'gray.800',
            },
            _light: {
              bg: 'white',
            },
          },
        },
      },
    },
  },
});

export default theme;