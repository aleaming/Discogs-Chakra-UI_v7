import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  Switch,
  Select,
  Input,
  Button,
  Divider,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

export const AdminSettings = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <Box bg={bgColor} borderRadius="lg" shadow="sm" p={6}>
      <VStack spacing={6} align="stretch">
        <Box>
          <Text fontSize="lg" fontWeight="medium" mb={4}>
            User Registration
          </Text>
          <VStack spacing={4} align="stretch">
            <FormControl display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <FormLabel mb={0}>Allow New Registrations</FormLabel>
                <Text fontSize="sm" color={mutedColor}>
                  Enable or disable new user registrations
                </Text>
              </Box>
              <Switch defaultChecked colorScheme="brand" />
            </FormControl>

            <FormControl display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <FormLabel mb={0}>Email Verification Required</FormLabel>
                <Text fontSize="sm" color={mutedColor}>
                  Require email verification before account activation
                </Text>
              </Box>
              <Switch defaultChecked colorScheme="brand" />
            </FormControl>

            <FormControl>
              <FormLabel>Default User Role</FormLabel>
              <Select defaultValue="user">
                <option value="user">User</option>
                <option value="moderator">Moderator</option>
                <option value="admin">Admin</option>
              </Select>
            </FormControl>
          </VStack>
        </Box>

        <Divider />

        <Box>
          <Text fontSize="lg" fontWeight="medium" mb={4}>
            Security Settings
          </Text>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Minimum Password Length</FormLabel>
              <Input type="number" defaultValue={8} />
            </FormControl>

            <FormControl display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <FormLabel mb={0}>Two-Factor Authentication</FormLabel>
                <Text fontSize="sm" color={mutedColor}>
                  Require 2FA for admin accounts
                </Text>
              </Box>
              <Switch defaultChecked colorScheme="brand" />
            </FormControl>

            <FormControl display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <FormLabel mb={0}>Login Attempts Limit</FormLabel>
                <Text fontSize="sm" color={mutedColor}>
                  Lock account after multiple failed attempts
                </Text>
              </Box>
              <Switch defaultChecked colorScheme="brand" />
            </FormControl>
          </VStack>
        </Box>

        <Divider />

        <Box>
          <Text fontSize="lg" fontWeight="medium" mb={4}>
            Email Settings
          </Text>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Admin Email</FormLabel>
              <Input type="email" placeholder="admin@example.com" />
            </FormControl>

            <FormControl display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <FormLabel mb={0}>New User Notifications</FormLabel>
                <Text fontSize="sm" color={mutedColor}>
                  Receive email when new users register
                </Text>
              </Box>
              <Switch defaultChecked colorScheme="brand" />
            </FormControl>
          </VStack>
        </Box>

        <Button colorScheme="brand" alignSelf="flex-start">
          Save Settings
        </Button>
      </VStack>
    </Box>
  );
};