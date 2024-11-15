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
import { Facebook, Twitter, Instagram, Youtube, Globe } from 'lucide-react';

export const SocialSettings = () => {
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const bgColor = useColorModeValue('gray.50', 'gray.700');

  const socialAccounts = [
    { name: 'Facebook', icon: Facebook, connected: true },
    { name: 'Twitter', icon: Twitter, connected: false },
    { name: 'Instagram', icon: Instagram, connected: true },
    { name: 'YouTube', icon: Youtube, connected: false },
    { name: 'Website', icon: Globe, connected: false },
  ];

  return (
    <VStack spacing={8} align="start" maxW="800px" w="full">
      <Box w="full">
        <Text fontSize="2xl" fontWeight="bold" mb={6}>
          Connected Accounts
        </Text>
        <Divider mb={6} />

        <SimpleGrid columns={1} spacing={4}>
          {socialAccounts.map((account) => (
            <Box
              key={account.name}
              p={4}
              borderRadius="md"
              bg={bgColor}
              w="full"
            >
              <HStack justify="space-between">
                <HStack spacing={4}>
                  <Icon as={account.icon} boxSize={5} />
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="medium">{account.name}</Text>
                    <Text fontSize="sm" color={mutedColor}>
                      {account.connected ? 'Connected' : 'Not connected'}
                    </Text>
                  </VStack>
                </HStack>
                <Button
                  size="sm"
                  colorScheme={account.connected ? 'red' : 'brand'}
                  variant={account.connected ? 'outline' : 'solid'}
                >
                  {account.connected ? 'Disconnect' : 'Connect'}
                </Button>
              </HStack>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </VStack>
  );
};