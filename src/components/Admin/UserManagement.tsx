import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Badge,
  Avatar,
  HStack,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Box,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react';
import { MoreVertical, Search, Shield, Ban, Mail, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useAdmin } from '../../hooks/useAdmin';

export const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { users, updateUserRole, deleteUser, banUser } = useAdmin();
  const toast = useToast();

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const filteredUsers = users.filter(
    user =>
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.displayName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUpdateRole = async (userId: string, role: string) => {
    try {
      await updateUserRole(userId, role);
      toast({
        title: 'Role updated',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Error updating role',
        description: error instanceof Error ? error.message : 'Please try again',
        status: 'error',
        duration: 5000,
      });
    }
  };

  const handleBanUser = async (userId: string) => {
    try {
      await banUser(userId);
      toast({
        title: 'User banned',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Error banning user',
        description: error instanceof Error ? error.message : 'Please try again',
        status: 'error',
        duration: 5000,
      });
    }
  };

  return (
    <Box bg={bgColor} borderRadius="lg" shadow="sm">
      <Box p={4} borderBottom="1px" borderColor={borderColor}>
        <InputGroup maxW="300px">
          <InputLeftElement>
            <Search size={20} />
          </InputLeftElement>
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>
      </Box>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>User</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Status</Th>
            <Th>Joined</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredUsers.map((user) => (
            <Tr key={user.uid}>
              <Td>
                <HStack>
                  <Avatar size="sm" name={user.displayName || ''} src={user.photoURL || ''} />
                  <Text>{user.displayName}</Text>
                </HStack>
              </Td>
              <Td>{user.email}</Td>
              <Td>
                <Badge
                  colorScheme={
                    user.role === 'admin'
                      ? 'red'
                      : user.role === 'moderator'
                      ? 'purple'
                      : 'green'
                  }
                >
                  {user.role}
                </Badge>
              </Td>
              <Td>
                <Badge
                  colorScheme={user.isBanned ? 'red' : 'green'}
                >
                  {user.isBanned ? 'Banned' : 'Active'}
                </Badge>
              </Td>
              <Td>{new Date(user.createdAt).toLocaleDateString()}</Td>
              <Td>
                <Menu>
                  <MenuButton
                    as={Button}
                    variant="ghost"
                    size="sm"
                    rightIcon={<MoreVertical size={16} />}
                  >
                    Actions
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      icon={<Shield size={16} />}
                      onClick={() => handleUpdateRole(user.uid, 'admin')}
                    >
                      Make Admin
                    </MenuItem>
                    <MenuItem
                      icon={<Shield size={16} />}
                      onClick={() => handleUpdateRole(user.uid, 'moderator')}
                    >
                      Make Moderator
                    </MenuItem>
                    <MenuItem icon={<Mail size={16} />}>
                      Send Email
                    </MenuItem>
                    <MenuItem icon={<Edit size={16} />}>
                      Edit Profile
                    </MenuItem>
                    <MenuItem
                      icon={<Ban size={16} />}
                      onClick={() => handleBanUser(user.uid)}
                    >
                      {user.isBanned ? 'Unban User' : 'Ban User'}
                    </MenuItem>
                    <MenuItem icon={<Trash2 size={16} />} color="red.500">
                      Delete Account
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};