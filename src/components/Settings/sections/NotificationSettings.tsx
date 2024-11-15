import {
  VStack,
  Text,
  Box,
  Divider,
  FormControl,
  FormLabel,
  Switch,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';

export const NotificationSettings = () => {
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  const notifications = [
    {
      id: 'collection_updates',
      label: 'Collection Updates',
      description: 'Notify me about changes to my collection',
    },
    {
      id: 'price_alerts',
      label: 'Price Alerts',
      description: 'Notify me when items in my wantlist change price',
    },
    {
      id: 'marketplace_activity',
      label: 'Marketplace Activity',
      description: 'Updates about your buying and selling activity',
    },
    {
      id: 'messages',
      label: 'Messages',
      description: 'Notify me when I receive new messages',
    },
    {
      id: 'community',
      label: 'Community Activity',
      description: 'Updates about comments and forum activity',
    },
    {
      id: 'newsletter',
      label: 'Newsletter',
      description: 'Receive our weekly newsletter',
    },
  ];

  return (
    <VStack spacing={8} align="start" maxW="800px" w="full">
      <Box w="full">
        <Text fontSize="2xl" fontWeight="bold" mb={6}>
          Notification Preferences
        </Text>
        <Divider mb={6} />

        <SimpleGrid columns={1} spacing={6}>
          {notifications.map((notification) => (
            <FormControl
              key={notification.id}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <FormLabel mb={0}>{notification.label}</FormLabel>
                <Text fontSize="sm" color={mutedColor}>
                  {notification.description}
                </Text>
              </Box>
              <Switch colorScheme="brand" size="lg" />
            </FormControl>
          ))}
        </SimpleGrid>
      </Box>
    </VStack>
  );
};