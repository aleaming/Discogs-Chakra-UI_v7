import {
  Box,
  Image,
  Text,
  VStack,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Badge,
  Button,
  useColorModeValue,
  Link,
  useToast,
} from '@chakra-ui/react';
import { Heart, Share2, MoreHorizontal, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import type { MarketplaceItem } from './types';

interface RowViewProps {
  items: MarketplaceItem[];
  onViewDetails: (item: MarketplaceItem) => void;
}

export const RowView = ({ items, onViewDetails }: RowViewProps) => {
  const { dispatch, state } = useCart();
  const toast = useToast();

  const bgColor = useColorModeValue('white', 'gray.800');
  const colorInvert = useColorModeValue('black', 'white');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const menuBgColor = useColorModeValue('gray.50', 'gray.700');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  const isItemInCart = (itemId: string) => {
    return Object.values(state.cartBySeller).some(
      sellerCart => sellerCart.items.some(cartItem => cartItem.id === itemId)
    );
  };

  const handleAddToCart = (item: MarketplaceItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isItemInCart(item.id)) return;
    
    dispatch({ type: 'ADD_ITEM', payload: item });
    
    toast({
      title: 'Added to cart',
      description: `${item.title} has been added to your cart`,
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'bottom',
    });
  };

  const getFormatString = (format: MarketplaceItem['format']) => {
    const details = [...format.details];
    if (format.weight) details.push(format.weight);
    if (format.speed) details.push(format.speed);
    return `${format.type}, ${details.join(', ')}`;
  };

  return (
    <VStack spacing={2} align="stretch">
      {items.map((item) => (
        <Box
          key={item.id}
          borderWidth="1px"
          borderColor={borderColor}
          borderRadius="lg"
          boxShadow="md"
          p={3}
          _hover={{ bg: menuBgColor }}
          transition="all 0.2s"
          cursor="pointer"
          onClick={() => onViewDetails(item)}
          bg={bgColor}
        >
          <HStack spacing={6} align="start">
            <Image
              src={item.image}
              alt={item.title}
              boxSize="128px"
              objectFit="cover"
              borderRadius="md"
            />
            <HStack align="start" flex={1} spacing={3}>
              <VStack align="start" spacing={0} width="50%">
                <Text fontSize="xl" fontWeight="bold" color={colorInvert}>
                  {item.title}
                </Text>
                <Link color="brand.500" fontWeight="medium">
                  {item.artist}
                </Link>
                <Text fontSize="sm" color={mutedColor}>
                  {getFormatString(item.format)}
                </Text>
              </VStack>
              <VStack align="start" spacing={1} width="28%">
                <HStack spacing={2}>
                  <Badge fontSize="0.8em" pt="0.05em" pb="0.1em" variant="mint">
                    Media: {item.condition.media}
                  </Badge>
                  <Badge fontSize="0.8em" pt="0.05em" pb="0.1em" variant="nearMint">
                    Sleeve: {item.condition.sleeve}
                  </Badge>
                </HStack>

                <Text fontSize="xs" color={mutedColor}>
                  Seller: {item.seller.name} • {item.seller.rating}★ ({item.seller.totalRatings})
                </Text>
              </VStack>
              <HStack spacing={4}>
                <Text fontSize="xl" fontWeight="bold" color="brand.500">
                  ${item.price}
                </Text>
                <Text fontSize="sm" color={mutedColor}>
                  +${item.shipping.cost} shipping from {item.shipping.from}
                </Text>
              </HStack>
            </HStack>

            <VStack spacing={2} minW="200px">
              <Button
                leftIcon={isItemInCart(item.id) ? <Check size={16} /> : <ShoppingCart size={16} />}
                colorScheme={isItemInCart(item.id) ? "green" : "brand"}
                width="full"
                size="sm"
                onClick={(e) => handleAddToCart(item, e)}
                isDisabled={isItemInCart(item.id)}
                _disabled={{
                  opacity: 0.8,
                  cursor: 'not-allowed',
                }}
              >
                {isItemInCart(item.id) ? 'Added to Cart' : 'Add to Cart'}
              </Button>
              <Button
                variant="outline"
                colorScheme="brand"
                width="full"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewDetails(item);
                }}
              >
                View Details
              </Button>
              <HStack>
                <IconButton
                  aria-label="Add to wantlist"
                  icon={<Heart size={16} />}
                  variant="ghost"
                  onClick={(e) => e.stopPropagation()}
                  _hover={{ bg: menuBgColor }}
                />
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="More options"
                    icon={<MoreHorizontal size={16} />}
                    variant="ghost"
                    onClick={(e) => e.stopPropagation()}
                    _hover={{ bg: menuBgColor }}
                  />
                  <MenuList onClick={(e) => e.stopPropagation()}>
                    <MenuItem icon={<Share2 size={16} />}>Share</MenuItem>
                    <MenuItem>Add to List</MenuItem>
                    <MenuItem>Contact Seller</MenuItem>
                  </MenuList>
                </Menu>
              </HStack>
            </VStack>
          </HStack>
        </Box>
      ))}
    </VStack>
  );
};