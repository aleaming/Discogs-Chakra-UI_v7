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
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';

export const AppearanceSettings = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <VStack spacing={8} align="start" maxW="800px" w="full">
      <Box w="full">
        <Text fontSize="2xl" fontWeight="bold" mb={6}>
          Appearance Settings
        </Text>
        <Divider mb={6} />

        <SimpleGrid columns={1} spacing={6}>
          <FormControl display="flex" alignItems="center" justifyContent="space-between">
            <Box>
              <FormLabel mb={0}>Dark Mode</FormLabel>
              <Text fontSize="sm" color={mutedColor}>
                Toggle between light and dark theme
              </Text>
            </Box>
            <Switch
              colorScheme="brand"
              size="lg"
              isChecked={colorMode === 'dark'}
              onChange={toggleColorMode}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Font Size</FormLabel>
            <Text fontSize="sm" color={mutedColor} mb={2}>
              Adjust the text size throughout the app
            </Text>
            <Select maxW="400px">
              <option value="sm">Small</option>
              <option value="md">Medium</option>
              <option value="lg">Large</option>
              <option value="xl">Extra Large</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Grid Density</FormLabel>
            <Text fontSize="sm" color={mutedColor} mb={2}>
              Adjust the spacing between items in grid views
            </Text>
            <Select maxW="400px">
              <option value="compact">Compact</option>
              <option value="comfortable">Comfortable</option>
              <option value="relaxed">Relaxed</option>
            </Select>
          </FormControl>

          <FormControl display="flex" alignItems="center" justifyContent="space-between">
            <Box>
              <FormLabel mb={0}>Animations</FormLabel>
              <Text fontSize="sm" color={mutedColor}>
                Enable interface animations
              </Text>
            </Box>
            <Switch colorScheme="brand" size="lg" defaultChecked />
          </FormControl>
        </SimpleGrid>
      </Box>
    </VStack>
  );
};