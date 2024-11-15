import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  IconButton,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  VStack,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Badge,
  Text,
} from '@chakra-ui/react';
import { Menu, Moon, Sun, X, ShoppingCart, Library } from 'lucide-react';
import { SearchBar } from '../SearchBar';
import { CartDrawer } from '../Cart';
import { useCart } from '../../contexts/CartContext';
import { CollectionDrawer } from '../Collection';
import { UserAvatar } from '../UserAvatar';
import { DashboardSidebar } from '../DashboardSidebar';
import { useState } from 'react';

interface NavigationProps {
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { label: 'Database', href: '#' },
  { label: 'Marketplace', href: '#marketplace' },
  { label: 'Sell', href: '#' },
  { label: 'Community', href: '#' },
];

// Mock user data - replace with actual user data in production
const mockUser = {
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://i.pravatar.cc/300',
};

export const Navigation = ({ onSectionChange }: NavigationProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const {
    isOpen: isMenuOpen,
    onOpen: onMenuOpen,
    onClose: onMenuClose,
  } = useDisclosure();
  const {
    isOpen: isCartOpen,
    onOpen: onCartOpen,
    onClose: onCartClose,
  } = useDisclosure();
  const {
    isOpen: isCollectionOpen,
    onOpen: onCollectionOpen,
    onClose: onCollectionClose,
  } = useDisclosure();
  const {
    isOpen: isDashboardOpen,
    onOpen: onDashboardOpen,
    onClose: onDashboardClose,
  } = useDisclosure();
  const { state: cartState } = useCart();
  const [activeSection, setActiveSection] = useState('');

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
  };

  const handleMenuClick = (href: string) => {
    const section = href.replace('#', '');
    setActiveSection(section);
    onSectionChange(section);
    onMenuClose();
  };

  const bgColor = useColorModeValue('white', 'gray.800');
  const colorInvert = useColorModeValue('black', 'white');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const menuBgColor = useColorModeValue('gray.50', 'gray.700');

  return (
    <Box
      as="nav"
      position="sticky"
      top={0}
      zIndex="sticky"
      bg={bgColor}
      borderBottom="1px"
      borderColor={borderColor}
      boxShadow=""
      transition="all 0.2s"
    >
      <Container maxW="container.xl" py={1}>
        <Flex justify="space-between" align="center" gap={4}>
          {/* Logo */}
          <Box
            fontSize="2xl"
            fontWeight="bold"
            color={useColorModeValue('gray.800', 'white')}
            flexShrink={0}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="184"
              height="40"
              viewBox="0 0 184 40"
              fill="none"
            >
              <g clipPath="url(#clip0_566_19192)">
                <path
                  d="M12.369 27.2309L12.4811 27.1192L13.7565 25.7365L13.8126 25.6807L14.4924 24.9474L14.5204 24.9754C13.1609 23.6765 12.3129 21.847 12.3129 19.815C12.3129 15.8696 15.5366 12.6504 19.503 12.6504C20.8065 12.6504 22.0469 13.0135 23.0981 13.6071L24.5137 11.0443L24.5978 10.9047L26.0414 8.27905L26.1255 8.13939L27.5692 5.49284L27.6533 5.35318L28.4171 3.94261L28.9848 2.93008C26.2026 1.42874 23.0911 0.527932 19.7483 0.5H19.44C8.77392 0.5 0.112127 9.06813 0 19.6753V19.8708C0 25.4293 2.34765 30.4151 6.11091 33.9695L7.07099 32.929L8.03108 31.8885L8.14321 31.7768L10.1825 29.5772L10.2946 29.4654L12.362 27.2379L12.369 27.2309Z"
                  fill={colorInvert}
                />
                <path
                  d="M32.9918 5.9668L31.1207 7.97091L31.0086 8.08264L28.9413 10.2823L28.8291 10.394L26.7618 12.5937L26.6497 12.7054L25.9419 13.5503L24.6945 14.8771C25.9138 16.1759 26.6777 17.8937 26.6777 19.8141C26.6777 23.7595 23.4541 26.9786 19.4876 26.9786C18.2682 26.9786 17.1399 26.6644 16.1518 26.1616L14.7082 28.7244L12.6689 32.3346L11.5967 34.227L11.5126 34.3666L10.125 36.8456C12.9001 38.3679 16.0677 39.2128 19.4596 39.2407C30.2097 39.2407 38.8995 30.5539 38.8995 19.8699C38.8715 14.4302 36.636 9.49321 32.9848 5.9668"
                  fill={colorInvert}
                />
                <path
                  d="M19.4689 18.4609C18.705 18.4609 18.1094 19.0824 18.1094 19.8156C18.1094 20.5489 18.7331 21.1703 19.4689 21.1703C20.2047 21.1703 20.8284 20.5489 20.8284 19.8156C20.8565 19.0824 20.2328 18.4609 19.4689 18.4609Z"
                  fill={colorInvert}
                />
                <path
                  d="M176.221 33.9902C180.489 33.9902 184 30.9875 184 27.2656C184 22.3286 180.111 21.3789 177.293 20.6527C175.387 20.1569 173.558 19.7798 173.558 18.2226C173.558 16.9308 174.855 16.1696 176.375 16.1696C177.896 16.1696 179.2 16.9657 179.2 18.3693L183.965 18.4042C183.965 14.6823 180.531 11.8332 176.375 11.8332C172.22 11.8332 168.793 14.6473 168.793 18.2506C168.793 22.0842 171.61 23.7182 175.576 24.7098C177.483 25.2056 179.354 25.5827 179.354 27.3284C179.354 28.6971 178.169 29.6049 176.305 29.6049C174.553 29.6049 173.18 28.6203 173.138 27.2516H168.372C168.372 30.9387 171.729 33.9763 176.228 33.9763M154.567 27.915C151.406 27.915 149.079 25.5618 149.079 22.4054C149.079 19.2491 151.287 16.9378 154.686 16.8959C157.811 16.9378 160.138 19.291 160.138 22.4054C160.138 25.5199 157.776 27.915 154.574 27.915M145.078 39.4998H165.401V32.1327L161.589 31.0713C160.902 30.8828 160.18 30.806 159.262 30.806V30.5755C162.465 29.6608 164.903 26.3997 164.903 22.4054C164.903 19.6332 163.684 17.2031 161.778 15.5272H161.967C162.388 15.604 162.619 15.6808 163.074 15.6808H165.282V12.4128H154.686C148.778 12.4128 144.279 16.8191 144.279 22.4054C144.279 26.5813 146.718 30.6524 151.252 31.9791L159.753 34.3743C160.404 34.6047 161.084 34.7933 161.813 34.8282V35.5893H149.689V33.6481H145.078V39.4998ZM131.202 29.5071C127.656 29.5071 124.797 26.8466 124.797 22.9362C124.797 19.0257 127.656 16.3652 131.202 16.3652C134.748 16.3652 137.685 18.8721 137.685 22.9362C137.685 27.0003 134.79 29.5071 131.202 29.5071ZM131.202 33.9902C137.376 33.9902 142.408 28.9764 142.408 22.9362C142.408 16.8959 137.376 11.8821 131.202 11.8821C125.028 11.8821 119.997 16.7422 119.997 22.9362C119.997 29.1301 125.028 33.9902 131.202 33.9902ZM111.223 33.9902C114.313 33.9902 117.095 32.7752 119.114 30.7222L116.023 27.6078C114.839 28.7879 113.241 29.5071 111.223 29.5071C107.642 29.5071 104.782 26.6162 104.782 22.8244C104.782 19.0327 107.642 16.1766 111.223 16.1766C113.36 16.1766 115.112 17.0146 116.296 18.3413L119.387 15.185C117.369 13.0552 114.432 11.6935 111.23 11.6935C105.014 11.6935 99.982 16.6724 99.982 22.8244C99.982 28.9764 105.014 33.9902 111.23 33.9902M89.9537 33.9902C94.2215 33.9902 97.7325 30.9875 97.7325 27.2656C97.7325 22.3286 93.8431 21.3789 91.0259 20.6527C89.1197 20.1569 87.2906 19.7798 87.2906 18.2226C87.2906 16.9308 88.5871 16.1696 90.1148 16.1696C91.6426 16.1696 92.939 16.9657 92.939 18.3693L97.7044 18.4042C97.7044 14.6823 94.2705 11.8332 90.1148 11.8332C85.9591 11.8332 82.5253 14.6473 82.5253 18.2506C82.5253 22.0842 85.3495 23.7182 89.3089 24.7098C91.2151 25.2056 93.0862 25.5827 93.0862 27.3284C93.0862 28.6971 91.9019 29.6049 90.0378 29.6049C88.2858 29.6049 86.9122 28.6203 86.8772 27.2516H82.1118C82.1118 30.9387 85.4686 33.9763 89.9677 33.9763M73.6743 33.3827H78.4817V12.4128H73.6743V33.3827ZM76.071 9.03302C77.5987 9.03302 78.8181 7.77608 78.8181 6.26077C78.8181 4.74546 77.5987 3.52344 76.071 3.52344C74.5432 3.52344 73.2888 4.73848 73.2888 6.26077C73.2888 7.78306 74.5432 9.03302 76.071 9.03302ZM52.2861 28.9764V10.8905H56.3647C61.1721 10.8905 65.1316 14.8429 65.1316 19.9684C65.1316 25.0939 61.1651 28.9695 56.3647 28.9695H52.2861V28.9764ZM47.5978 33.4176H56.3647C63.8772 33.4176 69.8619 27.3773 69.8619 19.9684C69.8619 12.5594 63.8772 6.44233 56.3647 6.44233H47.5978V33.4106V33.4176Z"
                  fill={colorInvert}
                />
              </g>
              <defs>
                <clipPath id="clip0_566_19192">
                  <rect
                    width="184"
                    height="39"
                    fill="white"
                    transform="translate(0 0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
          </Box>

          {/* Search Bar */}
          <Box flex={1} maxW="600px">
            <SearchBar onSearch={handleSearch} />
          </Box>

          {/* Desktop Menu */}
          <HStack spacing={1} display={{ base: 'none', md: 'flex' }}>
            {menuItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                size="md"
                onClick={() => handleMenuClick(item.href)}
                color={activeSection === item.href.replace('#', '') ? 'brand.500' : undefined}
                fontWeight={activeSection === item.href.replace('#', '') ? 'semibold' : 'normal'}
                _hover={{
                  bg: menuBgColor,
                  transform: 'translateY(-2px)',
                }}
                transition="all 0.2s"
              >
                {item.label}
              </Button>
            ))}
          </HStack>

          {/* Right Section */}
          <HStack spacing={2}>
            <IconButton
              aria-label={`Switch to ${
                colorMode === 'light' ? 'dark' : 'light'
              } mode`}
              icon={
                colorMode === 'light' ? <Moon size={20} /> : <Sun size={20} />
              }
              variant="ghost"
              onClick={toggleColorMode}
              _hover={{
                bg: menuBgColor,
                transform: 'rotate(15deg)',
              }}
              transition="all 0.2s"
            />

            <IconButton
              aria-label="My Collection"
              icon={<Library size={20} />}
              variant="ghost"
              onClick={onCollectionOpen}
              _hover={{
                bg: menuBgColor,
                transform: 'translateY(-2px)',
              }}
              transition="all 0.2s"
            />

            <Box position="relative">
              <IconButton
                aria-label="Shopping cart"
                icon={<ShoppingCart size={20} />}
                variant="ghost"
                onClick={onCartOpen}
                _hover={{
                  bg: menuBgColor,
                  transform: 'translateY(-2px)',
                }}
                transition="all 0.2s"
              />
              {cartState.itemCount > 0 && (
                <Badge
                  position="absolute"
                  top="-2px"
                  right="-2px"
                  colorScheme="brand"
                  borderRadius="full"
                  fontSize="xs"
                  minW="1.5rem"
                  h="1.5rem"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  {cartState.itemCount}
                </Badge>
              )}
            </Box>

            <UserAvatar user={mockUser} onClick={onDashboardOpen} />

            {/* Mobile Menu Button */}
            <IconButton
              display={{ base: 'flex', md: 'none' }}
              aria-label="Open menu"
              icon={isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              variant="ghost"
              onClick={onMenuOpen}
            />
          </HStack>
        </Flex>
      </Container>

      {/* Mobile Menu Drawer */}
      <Drawer isOpen={isMenuOpen} placement="right" onClose={onMenuClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch" mt={4}>
              {menuItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  w="full"
                  justifyContent="flex-start"
                  onClick={() => handleMenuClick(item.href)}
                  _hover={{
                    bg: menuBgColor,
                    transform: 'translateX(4px)',
                  }}
                  transition="all 0.2s"
                >
                  {item.label}
                </Button>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={onCartClose} />

      {/* Collection Drawer */}
      <CollectionDrawer isOpen={isCollectionOpen} onClose={onCollectionClose} />

      {/* Dashboard Sidebar */}
      <DashboardSidebar
        isOpen={isDashboardOpen}
        onClose={onDashboardClose}
        user={mockUser}
      />
    </Box>
  );
};