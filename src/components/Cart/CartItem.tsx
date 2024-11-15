import {
  HStack,
  Image,
  VStack,
  Text,
  IconButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import { Trash2 } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

interface CartItemProps {
  item: {
    id: string;
    title: string;
    artist: string;
    price: string;
    image: string;
    quantity: number;
  };
  sellerId: string;
}

export const CartItem = ({ item, sellerId }: CartItemProps) => {
  const { dispatch } = useCart();
  const bgColor = useColorModeValue('white', 'gray.800');
  const colorInvert = useColorModeValue('black', 'white');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const menuBgColor = useColorModeValue('gray.50', 'gray.700');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  const handleQuantityChange = (value: string) => {
    const quantity = parseInt(value, 10);
    if (quantity > 0) {
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { sellerId, itemId: item.id, quantity },
      });
    }
  };

  const handleRemove = () => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: { sellerId, itemId: item.id },
    });
  };

  return (
    <HStack spacing={4} align="start">
      <Image
        src={item.image}
        alt={item.title}
        boxSize="80px"
        objectFit="cover"
        borderRadius="md"
      />
      <VStack flex={1} align="start" spacing={1}>
        <Text fontWeight="medium" color={colorInvert}>{item.title}</Text>
        <Link color="brand.500" fontSize="sm">
          {item.artist}
        </Link>
        <Text color={mutedColor} fontSize="sm">
          ${item.price} each
        </Text>
      </VStack>
      <NumberInput
        size="sm"
        maxW={20}
        min={1}
        max={99}
        value={item.quantity}
        onChange={handleQuantityChange}
        borderColor={borderColor}
        _hover={{ borderColor: borderColor }}
      >
        <NumberInputField bg={bgColor} color={colorInvert} />
        <NumberInputStepper>
          <NumberIncrementStepper borderColor={borderColor} />
          <NumberDecrementStepper borderColor={borderColor} />
        </NumberInputStepper>
      </NumberInput>
      <IconButton
        aria-label="Remove item"
        icon={<Trash2 size={16} />}
        variant="ghost"
        colorScheme="red"
        size="sm"
        onClick={handleRemove}
        _hover={{ bg: menuBgColor }}
      />
    </HStack>
  );
};