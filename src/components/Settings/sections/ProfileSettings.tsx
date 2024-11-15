import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Avatar,
  HStack,
  Text,
  Textarea,
  Box,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
import { Upload } from 'lucide-react';

interface ProfileSettingsProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export const ProfileSettings = ({ user }: ProfileSettingsProps) => {
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <VStack spacing={8} align="start" maxW="800px" w="full">
      <Box w="full">
        <Text fontSize="2xl" fontWeight="bold" mb={6}>
          Profile Settings
        </Text>
        <Divider mb={6} />

        <VStack spacing={6} align="start">
          <HStack spacing={6} w="full">
            <Avatar
              size="xl"
              name={user?.name}
              src={user?.avatar}
              borderWidth="2px"
              borderColor={borderColor}
            />
            <VStack align="start" spacing={2}>
              <Button
                leftIcon={<Upload size={16} />}
                colorScheme="brand"
                size="sm"
              >
                Change Avatar
              </Button>
              <Text fontSize="sm" color="gray.500">
                Recommended size: 400x400px
              </Text>
            </VStack>
          </HStack>

          <FormControl>
            <FormLabel>Display Name</FormLabel>
            <Input defaultValue={user?.name} maxW="400px" />
          </FormControl>

          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input defaultValue={user?.email} maxW="400px" />
          </FormControl>

          <FormControl>
            <FormLabel>Bio</FormLabel>
            <Textarea
              placeholder="Tell us about yourself..."
              maxW="600px"
              rows={4}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Location</FormLabel>
            <Input placeholder="City, Country" maxW="400px" />
          </FormControl>

          <FormControl>
            <FormLabel>Website</FormLabel>
            <Input placeholder="https://" maxW="400px" />
          </FormControl>

          <Button colorScheme="brand" size="md">
            Save Changes
          </Button>
        </VStack>
      </Box>
    </VStack>
  );
};