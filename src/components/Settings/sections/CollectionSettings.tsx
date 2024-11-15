import {
  VStack,
  Text,
  Box,
  Divider,
  FormControl,
  FormLabel,
  Switch,
  Select,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';

export const CollectionSettings = () => {
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <VStack spacing={8} align="start" maxW="800px" w="full">
      <Box w="full">
        <Text fontSize="2xl" fontWeight="bold" mb={6}>
          Collection Settings
        </Text>
        <Divider mb={6} />

        <SimpleGrid columns={1} spacing={6}>
          <FormControl>
            <FormLabel>Default View</FormLabel>
            <Text fontSize="sm" color={mutedColor} mb={2}>
              Choose how your collection is displayed by default
            </Text>
            <Select maxW="400px">
              <option value="grid">Grid View</option>
              <option value="list">List View</option>
              <option value="table">Table View</option>
              <option value="crate">Crate View</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Default Sort</FormLabel>
            <Text fontSize="sm" color={mutedColor} mb={2}>
              Choose how your collection is sorted by default
            </Text>
            <Select maxW="400px">
              <option value="artist">Artist Name</option>
              <option value="title">Album Title</option>
              <option value="year">Release Year</option>
              <option value="dateAdded">Date Added</option>
              <option value="rating">Rating</option>
            </Select>
          </FormControl>

          <FormControl display="flex" alignItems="center" justifyContent="space-between">
            <Box>
              <FormLabel mb={0}>Auto-fetch Cover Art</FormLabel>
              <Text fontSize="sm" color={mutedColor}>
                Automatically fetch cover art when adding items
              </Text>
            </Box>
            <Switch colorScheme="brand" size="lg" />
          </FormControl>

          <FormControl display="flex" alignItems="center" justifyContent="space-between">
            <Box>
              <FormLabel mb={0}>Public Collection</FormLabel>
              <Text fontSize="sm" color={mutedColor}>
                Allow others to view your collection
              </Text>
            </Box>
            <Switch colorScheme="brand" size="lg" />
          </FormControl>
        </SimpleGrid>
      </Box>
    </VStack>
  );
};