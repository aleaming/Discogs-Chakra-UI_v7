import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  VStack,
  Text,
  Divider,
  Button,
  useColorModeValue,
  Box,
  HStack,
} from '@chakra-ui/react';
import { useCart } from '../../contexts/CartContext';
import { SellerCartSection } from './SellerCartSection';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { state } = useCart();
  const bgColor = useColorModeValue('white', 'gray.800');
  const colorInvert = useColorModeValue('black', 'white');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const menuBgColor = useColorModeValue('gray.50', 'gray.700');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  const sellerCarts = Object.entries(state.cartBySeller);
  const isEmpty = sellerCarts.length === 0;

  const calculateTotal = () => {
    return sellerCarts.reduce((total, [_, sellerCart]) => {
      const itemsTotal = sellerCart.items.reduce(
        (sum, item) => sum + parseFloat(item.price) * item.quantity,
        0
      );
      const shippingCost = parseFloat(sellerCart.shipping.cost);
      return total + itemsTotal + shippingCost;
    }, 0);
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} size="md" placement="right">
      <DrawerOverlay />
      <DrawerContent bg={bgColor}>
        <DrawerCloseButton color={colorInvert} />
        <DrawerHeader 
          borderBottomWidth="1px" 
          borderColor={borderColor}
          color={colorInvert}
        >
          Shopping Cart ({state.itemCount} items)
        </DrawerHeader>

        <DrawerBody>
          {isEmpty ? (
            <VStack spacing={4} py={8}>
              <Text color={colorInvert}>Your cart is empty</Text>
              <Button 
                colorScheme="brand" 
                onClick={onClose}
                _hover={{ bg: menuBgColor }}
              >
                Continue Shopping
              </Button>
            </VStack>
          ) : (
            <VStack spacing={6} align="stretch" py={4}>
              {sellerCarts.map(([sellerId, sellerCart]) => (
                <SellerCartSection
                  key={sellerId}
                  sellerId={sellerId}
                  sellerCart={sellerCart}
                />
              ))}

              <Box 
                position="sticky" 
                bottom={0} 
                bg={bgColor} 
                pt={4}
                borderTopWidth="1px"
                borderColor={borderColor}
              >
                <VStack spacing={4} align="stretch">
                  <HStack justify="space-between">
                    <Text color={mutedColor}>Subtotal:</Text>
                    <Text color={colorInvert} fontWeight="bold">
                      ${calculateTotal().toFixed(2)}
                    </Text>
                  </HStack>
                  <Button 
                    colorScheme="brand" 
                    size="lg"
                    _hover={{ bg: menuBgColor }}
                  >
                    Proceed to Checkout
                  </Button>
                </VStack>
              </Box>
            </VStack>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};