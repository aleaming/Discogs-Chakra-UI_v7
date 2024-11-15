import {
  VStack,
  Text,
  Box,
  Divider,
  Button,
  SimpleGrid,
  HStack,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { CreditCard, Wallet, DollarSign, Smartphone } from 'lucide-react';

export const PaymentSettings = () => {
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const bgColor = useColorModeValue('gray.50', 'gray.700');

  const paymentMethods = [
    { name: 'Credit Card', icon: CreditCard, connected: true, last4: '4242' },
    { name: 'PayPal', icon: Wallet, connected: false },
    { name: 'Apple Pay', icon: DollarSign, connected: false },
    { name: 'Google Pay', icon: Smartphone, connected: false },
  ];

  return (
    <VStack spacing={8} align="start" maxW="800px" w="full">
      <Box w="full">
        <Text fontSize="2xl" fontWeight="bold" mb={6}>
          Payment Methods
        </Text>
        <Divider mb={6} />

        <SimpleGrid columns={1} spacing={4}>
          {paymentMethods.map((method) => (
            <Box
              key={method.name}
              p={4}
              borderRadius="md"
              bg={bgColor}
              w="full"
            >
              <HStack justify="space-between">
                <HStack spacing={4}>
                  <Icon as={method.icon} boxSize={5} />
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="medium">{method.name}</Text>
                    {method.connected && method.last4 && (
                      <Text fontSize="sm" color={mutedColor}>
                        •••• {method.last4}
                      </Text>
                    )}
                  </VStack>
                </HStack>
                <Button
                  size="sm"
                  colorScheme={method.connected ? 'red' : 'brand'}
                  variant={method.connected ? 'outline' : 'solid'}
                >
                  {method.connected ? 'Remove' : 'Add'}
                </Button>
              </HStack>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </VStack>
  );
};