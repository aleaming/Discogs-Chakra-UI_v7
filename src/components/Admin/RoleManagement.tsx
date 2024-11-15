import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Switch,
  useColorModeValue,
  IconButton,
} from '@chakra-ui/react';
import { Plus, Edit, Trash2 } from 'lucide-react';

const defaultPermissions = [
  { name: 'View marketplace', key: 'marketplace.view' },
  { name: 'Create listings', key: 'marketplace.create' },
  { name: 'Edit own listings', key: 'marketplace.edit.own' },
  { name: 'Delete own listings', key: 'marketplace.delete.own' },
  { name: 'Moderate listings', key: 'marketplace.moderate' },
  { name: 'Ban users', key: 'users.ban' },
  { name: 'Edit users', key: 'users.edit' },
  { name: 'Delete users', key: 'users.delete' },
  { name: 'Access admin panel', key: 'admin.access' },
];

export const RoleManagement = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box bg={bgColor} borderRadius="lg" shadow="sm">
      <Box p={4} borderBottom="1px" borderColor={borderColor}>
        <HStack justify="space-between">
          <Text fontSize="lg" fontWeight="medium">Role Permissions</Text>
          <Button leftIcon={<Plus size={16} />} colorScheme="brand" size="sm">
            Add Role
          </Button>
        </HStack>
      </Box>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Permission</Th>
            <Th>Admin</Th>
            <Th>Moderator</Th>
            <Th>User</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {defaultPermissions.map((permission) => (
            <Tr key={permission.key}>
              <Td>{permission.name}</Td>
              <Td>
                <Switch defaultChecked isDisabled colorScheme="brand" />
              </Td>
              <Td>
                <Switch
                  defaultChecked={permission.key.includes('moderate')}
                  colorScheme="brand"
                />
              </Td>
              <Td>
                <Switch
                  defaultChecked={permission.key.includes('view') || permission.key.includes('own')}
                  colorScheme="brand"
                />
              </Td>
              <Td>
                <HStack spacing={2}>
                  <IconButton
                    aria-label="Edit permission"
                    icon={<Edit size={16} />}
                    size="sm"
                    variant="ghost"
                  />
                  <IconButton
                    aria-label="Delete permission"
                    icon={<Trash2 size={16} />}
                    size="sm"
                    variant="ghost"
                    colorScheme="red"
                  />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};