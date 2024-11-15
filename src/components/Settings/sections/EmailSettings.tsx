import {
  VStack,
  Text,
  Box,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Button,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';

export const EmailSettings = () => {
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <VStack spacing={8} align="start" maxW="800px" w="full">
      <Box w="full">
        <Text fontSize="2xl" fontWeight="bold" mb={6}>
          Email Settings
        </Text>
        <Divider mb={6} />

        <SimpleGrid columns={1} spacing={6}>
          <FormControl>
            <FormLabel>Primary Email</FormLabel>
            <Text fontSize="sm" color={mutedColor} mb={2}>
              Your main email address for account notifications
            </Text>
            <Input maxW="400px" type="email" defaultValue="user@example.com" />
          </FormControl>

          <FormControl>
            <FormLabel>Recovery Email</FormLabel>
            <Text fontSize="sm" color={mutedColor} mb={2}>
              Secondary email for account recovery
            </Text>
            <Input maxW="400px" type="email" placeholder="Enter recovery email" />
          </FormControl>

          <Box>
            <Button colorScheme="brand" size="md">
              Update Email Settings
            </Button>
          </Box>
        </SimpleGrid>
      </Box>
    </VStack>
  );
};