import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Image,
  Text,
  VStack,
  HStack,
  Badge,
  Divider,
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Link,
  useToast,
} from '@chakra-ui/react';
import { MoreHorizontal, Library, Zap, List, Heart, ShoppingCart, MessageCircle, Share2, Flag, Check } from 'lucide-react';
import { useCart } from '../../../contexts/CartContext';
import type { ItemDetailsModalProps } from './types';

export const ItemDetailsModal = ({ isOpen, onClose, item }: ItemDetailsModalProps) => {
  const { dispatch, state } = useCart();
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const toast = useToast();
  
  const isInCart = Object.values(state.cartBySeller).some(
    sellerCart => sellerCart.items.some(cartItem => cartItem.id === item.id)
  );

  const getFormatString = (format: ItemDetailsModalProps['item']['format']) => {
    const details = [...format.details];
    if (format.weight) details.push(format.weight);
    if (format.speed) details.push(format.speed);
    return `${format.type}, ${details.join(', ')}`;
  };

  const handleAddToCart = () => {
    if (isInCart) return;
    
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader p={0}>
          <Box p={6}>
            <HStack spacing={6} align="start">
              <Image
                src={item.image}
                alt={item.title}
                boxSize="200px"
                objectFit="cover"
                borderRadius="md"
              />
              <VStack align="start" spacing={3} flex={1}>
                <VStack align="start" spacing={1}>
                  <Text fontSize="2xl" fontWeight="bold">
                    {item.title}
                  </Text>
                  <Link fontSize="xl" color="brand.500" fontWeight="semibold">
                    {item.artist}
                  </Link>
                </VStack>

                <Text fontSize="md" color={mutedColor}>
                  {getFormatString(item.format)}
                </Text>

                <HStack spacing={2}>
                  <Badge colorScheme="green">Media: {item.condition.media}</Badge>
                  <Badge colorScheme="blue">Sleeve: {item.condition.sleeve}</Badge>
                </HStack>

                <VStack align="start" spacing={1}>
                  <Text fontSize="sm" color={mutedColor}>
                    Seller: {item.seller.name}
                  </Text>
                  <Text fontSize="sm" color={mutedColor}>
                    Rating: {item.seller.rating}★ ({item.seller.totalRatings} ratings)
                  </Text>
                  <Text fontSize="sm" color={mutedColor}>
                    Ships from: {item.shipping.from}
                  </Text>
                </VStack>

                <HStack spacing={4} pt={2}>
                  <Text fontSize="2xl" fontWeight="bold" color="brand.500">
                    ${item.price}
                  </Text>
                  <Text fontSize="md" color={mutedColor}>
                    +${item.shipping.cost} shipping
                  </Text>
                </HStack>

                <HStack spacing="2" pt={2}>
                  <Button
                    leftIcon={isInCart ? <Check size={16} /> : <ShoppingCart size={16} />}
                    colorScheme={isInCart ? "green" : "brand"}
                    size="md"
                    onClick={handleAddToCart}
                    isDisabled={isInCart}
                    _disabled={{
                      opacity: 0.8,
                      cursor: 'not-allowed',
                    }}
                  >
                    {isInCart ? 'Added to Cart' : 'Add to Cart'}
                  </Button>
                  <Button
                    leftIcon={<MessageCircle size={16} />}
                    variant="outline"
                    colorScheme="brand"
                    size="md"
                  >
                    Contact Seller
                  </Button>
                  <Menu>
                    <MenuButton
                      as={Button}
                      size="md"
                      variant="outline"
                      colorScheme="brand"
                    >
                      <MoreHorizontal size={16} />
                    </MenuButton>
                    <MenuList>
                      <MenuItem icon={<Library size={16} />}>
                        Add to Collection
                      </MenuItem>
                      <MenuItem icon={<Zap size={16} />}>Add to Wantlist</MenuItem>
                      <MenuItem icon={<List size={16} />}>Add to List</MenuItem>
                      <MenuItem icon={<Share2 size={16} />}>Share</MenuItem>
                      <MenuItem icon={<Flag size={16} />}>Report Issue</MenuItem>
                    </MenuList>
                  </Menu>
                </HStack>
              </VStack>
            </HStack>
          </Box>
          <Divider borderColor={borderColor} />
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody p={6}>
          <Tabs>
            <TabList mb={4}>
              <Tab>Item Details</Tab>
              <Tab>Seller Information</Tab>
              <Tab>Shipping & Policies</Tab>
            </TabList>

            <TabPanels>
              <TabPanel p={0}>
                <VStack align="start" spacing={4}>
                  <Box>
                    <Text fontWeight="bold" mb={2}>Format Details</Text>
                    <Text>{getFormatString(item.format)}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" mb={2}>Condition</Text>
                    <VStack align="start" spacing={1}>
                      <Text>Media: {item.condition.media}</Text>
                      <Text>Sleeve: {item.condition.sleeve}</Text>
                    </VStack>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" mb={2}>Price Breakdown</Text>
                    <VStack align="start" spacing={1}>
                      <Text>Item Price: ${item.price}</Text>
                      <Text>Shipping: ${item.shipping.cost}</Text>
                      <Divider my={2} />
                      <Text fontWeight="bold">
                        Total: ${(parseFloat(item.price) + parseFloat(item.shipping.cost)).toFixed(2)}
                      </Text>
                    </VStack>
                  </Box>
                </VStack>
              </TabPanel>

              <TabPanel>
                <VStack align="start" spacing={4}>
                  <Box>
                    <Text fontWeight="bold" mb={2}>About the Seller</Text>
                    <VStack align="start" spacing={1}>
                      <Text>Name: {item.seller.name}</Text>
                      <Text>Rating: {item.seller.rating}★</Text>
                      <Text>Total Ratings: {item.seller.totalRatings}</Text>
                      <Text>Location: {item.shipping.from}</Text>
                    </VStack>
                  </Box>
                </VStack>
              </TabPanel>

              <TabPanel>
                <VStack align="start" spacing={4}>
                  <Box>
                    <Text fontWeight="bold" mb={2}>Shipping Information</Text>
                    <VStack align="start" spacing={1}>
                      <Text>Ships from: {item.shipping.from}</Text>
                      <Text>Shipping Cost: ${item.shipping.cost}</Text>
                    </VStack>
                  </Box>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};