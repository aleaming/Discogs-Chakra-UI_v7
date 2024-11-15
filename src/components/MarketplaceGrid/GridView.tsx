import {
  SimpleGrid,
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
  Flex,
  Spacer,
  Link,
  useToast,
} from '@chakra-ui/react';
import { Heart, Share2, MoreHorizontal, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import type { MarketplaceItem } from './types';

interface GridViewProps {
  items: MarketplaceItem[];
  onViewDetails: (item: MarketplaceItem) => void;
  isCarousel?: boolean;
}

export const GridView = ({ items, onViewDetails, isCarousel = false }: GridViewProps) => {
  const { dispatch, state } = useCart();
  const bgColor = useColorModeValue('white', 'gray.800');
  const colorInvert = useColorModeValue('black', 'white');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const menuBgColor = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const toast = useToast();

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

  const GridContainer = isCarousel ? Box : SimpleGrid;
  const gridProps = isCarousel ? {} : {
    columns: { base: 1, sm: 2, lg: 3, xl: 4 },
    spacing: 6
  };

  return (
    <GridContainer {...gridProps}>
      {items.map((item) => (
        <Box
          key={item.id}
          borderRadius="lg"
          overflow="hidden"
          bg={bgColor}
          boxShadow="lg"
          transition="all 0.2s"
          _hover={{ transform: 'translateY(-4px)' }}
          borderWidth="1px"
          borderColor={borderColor}
          onClick={() => onViewDetails(item)}
          cursor="pointer"
          display={isCarousel ? 'inline-block' : 'block'}
          width={isCarousel ? '300px' : 'auto'}
          height="full"
        >
          <Flex direction="column" height="full">
            <Box position="relative">
              <Image
                src={item.image}
                alt={item.title}
                width="100%"
                height="auto"
                aspectRatio={1}
                objectFit="cover"
              />
              <HStack position="absolute" top={2} right={2} spacing={2}>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="More options"
                    icon={<MoreHorizontal size={24} />}
                    size="sm"
                    variant="solid"
                    isRound
                    bg={menuBgColor}
                    color={colorInvert}
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
            </Box>

            <VStack p={4} align="stretch" spacing={2} flex="1">
              <VStack align="start" spacing={0}>
                <Text fontSize="lg" fontWeight="bold" color={textColor}>
                  {item.title}
                </Text>
                <Link color="brand.500" fontWeight="bold">
                  {item.artist}
                </Link>
                <Text fontSize="sm" color={mutedColor}>
                  {getFormatString(item.format)}
                </Text>
              </VStack>

              <HStack>
                <Badge fontSize="0.8em" pt="0.1em" pb="0.2em" variant="mint">
                  Media: {item.condition.media}
                </Badge>
                <Badge fontSize="0.8em" pt="0.1em" pb="0.2em" variant="nearMint">
                  Sleeve: {item.condition.sleeve}
                </Badge>
              </HStack>

              <VStack align="start" spacing={0}>
                <Text fontSize="sm" color={mutedColor}>
                  Seller: {item.seller.name}
                </Text>
                <Text fontSize="sm" color={mutedColor}>
                  Rating: {item.seller.rating}★ ({item.seller.totalRatings})
                </Text>
              </VStack>

              <Spacer />

              <Flex align="center">
                <Text fontSize="2xl" fontWeight="bold" color="brand.500" mr="2">
                  ${item.price}
                </Text>

                <Text fontSize="sm" color={mutedColor}>
                  +${item.shipping.cost} shipping
                </Text>
              </Flex>

              <HStack spacing="0" mt="auto">
                <Button
                  leftIcon={isItemInCart(item.id) ? <Check size={16} /> : <ShoppingCart size={16} />}
                  colorScheme={isItemInCart(item.id) ? "green" : "brand"}
                  borderRadius="40px 0 0 40px"
                  flex={1}
                  onClick={(e) => handleAddToCart(item, e)}
                  isDisabled={isItemInCart(item.id)}
                  _disabled={{
                    opacity: 0.8,
                    cursor: 'not-allowed',
                  }}
                >
                  {isItemInCart(item.id) ? 'Added' : 'Add to Cart'}
                </Button>
                <Button
                  variant="outline"
                  colorScheme="brand"
                  borderRadius="0 40px 40px 0"
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewDetails(item);
                  }}
                >
                  Details
                </Button>
              </HStack>
            </VStack>
          </Flex>
        </Box>
      ))}
    </GridContainer>
  );
};