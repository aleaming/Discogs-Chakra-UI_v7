import {
  VStack,
  HStack,
  Text,
  Button,
  Divider,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import { Trash2 } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { CartItem } from './CartItem';

interface SellerCartSectionProps {
  sellerId: string;
  sellerCart: {
    items: any[];
    seller: {
      name: string;
      rating: number;
      totalRatings: number;
    };
    shipping: {
      cost: string;
      from: string;
    };
  };
}

export const SellerCartSection = ({
  sellerId,
  sellerCart,
}: SellerCartSectionProps) => {
  const { dispatch } = useCart();
  const bgColor = useColorModeValue('white', 'gray.800');
  const colorInvert = useColorModeValue('black', 'white');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const menuBgColor = useColorModeValue('gray.50', 'gray.700');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  const calculateSubtotal = () => {
    return sellerCart.items.reduce(
      (sum, item) => sum + parseFloat(item.price) * item.quantity,
      0
    );
  };

  const handleClearSellerCart = () => {
    dispatch({ type: 'CLEAR_SELLER_CART', payload: { sellerId } });
  };

  return (
    <Box 
      borderWidth="1px" 
      borderColor={borderColor} 
      borderRadius="lg" 
      p={4}
      bg={bgColor}
    >
      <VStack spacing={4} align="stretch">
        <HStack justify="space-between">
          <VStack align="start" spacing={0}>
            <Text fontWeight="bold" color={colorInvert}>{sellerCart.seller.name}</Text>
            <Text fontSize="sm" color={mutedColor}>
              {sellerCart.seller.rating}★ ({sellerCart.seller.totalRatings} ratings)
            </Text>
          </VStack>
          <Button
            leftIcon={<Trash2 size={16} />}
            variant="ghost"
            colorScheme="red"
            size="sm"
            onClick={handleClearSellerCart}
            _hover={{ bg: menuBgColor }}
          >
            Clear
          </Button>
        </HStack>

        <Divider borderColor={borderColor} />

        <VStack spacing={4} align="stretch">
          {sellerCart.items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              sellerId={sellerId}
            />
          ))}
        </VStack>

        <Divider borderColor={borderColor} />

        <VStack spacing={2} align="stretch">
          <HStack justify="space-between">
            <Text color={mutedColor}>Subtotal:</Text>
            <Text color={colorInvert}>${calculateSubtotal().toFixed(2)}</Text>
          </HStack>
          <HStack justify="space-between">
            <Text color={mutedColor}>Shipping:</Text>
            <Text color={colorInvert}>${sellerCart.shipping.cost}</Text>
          </HStack>
          <HStack justify="space-between" fontWeight="bold">
            <Text color={colorInvert}>Total:</Text>
            <Text color={colorInvert}>
              ${(calculateSubtotal() + parseFloat(sellerCart.shipping.cost)).toFixed(2)}
            </Text>
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
};