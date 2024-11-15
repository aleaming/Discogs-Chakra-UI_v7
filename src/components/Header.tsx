// src/components/Header.tsx
import {
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  Spacer,
  useColorMode,
  Button,
} from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

const Header: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box as="header" bg="gray.800" color="white" py={4} px={8} shadow="md">
      <Flex align="center">
        <Heading size="md" as="a" href="/" _hover={{ textDecoration: 'none' }}>
          Discogs Clone
        </Heading>
        <Spacer />
        <HStack spacing={4}>
          <Button as="a" href="#" variant="ghost" colorScheme="teal">
            Home
          </Button>
          <Button as="a" href="#" variant="ghost" colorScheme="teal">
            Explore
          </Button>
          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
            onClick={toggleColorMode}
            variant="ghost"
          />
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
