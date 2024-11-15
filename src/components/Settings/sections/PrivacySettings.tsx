import {
  VStack,
  Text,
  Box,
  Divider,
  FormControl,
  FormLabel,
  Switch,
  SimpleGrid,
  Select,
  useColorModeValue,
} from '@chakra-ui/react';

export const PrivacySettings = () => {
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  const privacyOptions = [
    {
      id: 'profile_visibility',
      label: 'Profile Visibility',
      description: 'Who can see your profile',
      type: 'select',
      options: ['Everyone', 'Followers Only', 'Private'],
    },
    {
      id: 'collection_visibility',
      label: 'Collection Visibility',
      description: 'Who can see your collection',
      type: 'select',
      options: ['Everyone', 'Followers Only', 'Private'],
    },
    {
      id: 'activity_visibility',
      label: 'Activity Visibility',
      description: 'Show your activity in public feeds',
      type: 'switch',
    },
    {
      id: 'search_visibility',
      label: 'Search Engine Visibility',
      description: 'Allow search engines to index your profile',
      type: 'switch',
    },
    {
      id: 'messaging',
      label: 'Direct Messages',
      description: 'Who can send you direct messages',
      type: 'select',
      options: ['Everyone', 'Followers Only', 'Nobody'],
    },
  ];

  return (
    <VStack spacing={8} align="start" maxW="800px" w="full">
      <Box w="full">
        <Text fontSize="2xl" fontWeight="bold" mb={6}>
          Privacy Settings
        </Text>
        <Divider mb={6} />

        <SimpleGrid columns={1} spacing={6}>
          {privacyOptions.map((option) => (
            <FormControl
              key={option.id}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box flex="1" mr={4}>
                <FormLabel mb={0}>{option.label}</FormLabel>
                <Text fontSize="sm" color={mutedColor}>
                  {option.description}
                </Text>
              </Box>
              {option.type === 'switch' ? (
                <Switch colorScheme="brand" size="lg" />
              ) : (
                <Select maxW="200px" defaultValue={option.options[0]}>
                  {option.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </Select>
              )}
            </FormControl>
          ))}
        </SimpleGrid>
      </Box>
    </VStack>
  );
};