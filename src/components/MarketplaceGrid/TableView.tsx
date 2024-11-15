import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Text,
  HStack,
  VStack,
  Badge,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Box,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { Heart, Share2, MoreHorizontal, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import type { MarketplaceItem } from './MarketplaceGridView';

interface TableViewProps {
  items: MarketplaceItem[];
  onViewDetails: (item: MarketplaceItem) => void;
}

export const TableView = ({ items, onViewDetails }: TableViewProps) => {
  const { dispatch, state } = useCart();
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
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

  return (
    <Box overflowX="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Item</Th>
            <Th>Format</Th>
            <Th>Condition</Th>
            <Th>Seller</Th>
            <Th>Price</Th>
            <Th>Shipping</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map((item) => (
            <Tr
              key={item.id}
              _hover={{ bg: hoverBg }}
              cursor="pointer"
              onClick={() => onViewDetails(item)}
            >
              <Td>
                <HStack spacing={4}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    boxSize="72px"
                    objectFit="cover"
                    borderRadius="md"
                    boxShadow="md"
                  />
                  <Box>
                    <Text fontWeight="bold">{item.title}</Text>
                    <Text color="brand.500" fontSize="sm">
                      {item.artist}
                    </Text>
                  </Box>
                </HStack>
              </Td>
              <Td>
                <Text fontSize="sm" color={mutedColor}>
                  {getFormatString(item.format)}
                </Text>
              </Td>
              <Td>
                <VStack align="start" spacing={1}>
                  <Badge fontSize="0.8em" pt="0.05em" pb="0.1em" variant="mint">
                    Media: {item.condition.media}
                  </Badge>
                  <Badge fontSize="0.8em" pt="0.05em" pb="0.1em" variant="nearMint">
                    Sleeve: {item.condition.sleeve}
                  </Badge>
                </VStack>
              </Td>
              <Td>
                <Text>{item.seller.name}</Text>
                <Text fontSize="sm" color="gray.600">
                  {item.seller.rating}★ ({item.seller.totalRatings})
                </Text>
              </Td>
              <Td>
                <Text fontWeight="bold" color="brand.500">
                  ${item.price}
                </Text>
              </Td>
              <Td>
                <Text>${item.shipping.cost}</Text>
                <Text fontSize="sm" color="gray.600">
                  from {item.shipping.from}
                </Text>
              </Td>
              <Td onClick={(e) => e.stopPropagation()}>
                <HStack spacing={2}>
                  <Button
                    leftIcon={isItemInCart(item.id) ? <Check size={16} /> : <ShoppingCart size={16} />}
                    colorScheme={isItemInCart(item.id) ? "green" : "brand"}
                    size="sm"
                    onClick={(e) => handleAddToCart(item, e)}
                    isDisabled={isItemInCart(item.id)}
                    _disabled={{
                      opacity: 0.8,
                      cursor: 'not-allowed',
                    }}
                  >
                    {isItemInCart(item.id) ? 'Added' : 'Add to Cart'}
                  </Button>
                  <IconButton
                    aria-label="Add to wantlist"
                    icon={<Heart size={16} />}
                    variant="ghost"
                    size="sm"
                  />
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      aria-label="More options"
                      icon={<MoreHorizontal size={16} />}
                      variant="ghost"
                      size="sm"
                    />
                    <MenuList>
                      <MenuItem icon={<Share2 size={16} />}>Share</MenuItem>
                      <MenuItem>Add to List</MenuItem>
                      <MenuItem>Contact Seller</MenuItem>
                    </MenuList>
                  </Menu>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};