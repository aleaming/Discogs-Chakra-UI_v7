import {
  Avatar,
  AvatarBadge,
  Box,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import type { UserAvatarProps } from './types';

export const UserAvatar = ({ user, onClick }: UserAvatarProps) => {
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box position="relative">
      <IconButton
        aria-label="Open user menu"
        icon={
          <Avatar
            size="sm"
            name={user?.name || 'User'}
            src={user?.avatar}
            cursor="pointer"
            borderWidth="2px"
            borderColor={borderColor}
          >
            <AvatarBadge boxSize="1.25em" bg="green.500" />
          </Avatar>
        }
        variant="ghost"
        onClick={onClick}
        _hover={{ bg: 'transparent' }}
      />
    </Box>
  );
};