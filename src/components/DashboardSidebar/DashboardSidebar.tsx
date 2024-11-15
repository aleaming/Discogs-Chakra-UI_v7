import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  HStack,
  Text,
  Avatar,
  Divider,
  Button,
  useColorModeValue,
  useDisclosure,
  Badge,
} from '@chakra-ui/react';
import {
  User,
  Settings,
  CreditCard,
  Heart,
  Bell,
  LogOut,
  Box as CollectionIcon,
} from 'lucide-react';
import { SettingsDrawer } from '../Settings';
import { AlertsDrawer } from '../Alerts/AlertsDrawer';
import { useAlerts } from '../../hooks/useAlerts';
import type { DashboardSidebarProps } from './types';

export const DashboardSidebar = ({ isOpen, onClose, user }: DashboardSidebarProps) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');

  const {
    isOpen: isSettingsOpen,
    onOpen: onSettingsOpen,
    onClose: onSettingsClose,
  } = useDisclosure();

  const {
    isOpen: isAlertsOpen,
    onOpen: onAlertsOpen,
    onClose: onAlertsClose,
  } = useDisclosure();

  const { alerts } = useAlerts();
  const unreadAlerts = alerts.filter(alert => !alert.isRead).length;

  const menuItems = [
    { icon: User, label: 'Profile', onClick: () => console.log('Profile') },
    { icon: CollectionIcon, label: 'Collection', onClick: () => console.log('Collection') },
    { icon: Heart, label: 'Wantlist', onClick: () => console.log('Wantlist') },
    { 
      icon: Bell, 
      label: 'Alerts', 
      onClick: onAlertsOpen,
      badge: unreadAlerts > 0 ? unreadAlerts : undefined 
    },
    { icon: CreditCard, label: 'Orders', onClick: () => console.log('Orders') },
    { icon: Settings, label: 'Settings', onClick: onSettingsOpen },
  ];

  return (
    <>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="sm">
        <DrawerOverlay />
        <DrawerContent bg={bgColor}>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" borderColor={borderColor}>
            <HStack spacing={4}>
              <Avatar
                size="md"
                name={user?.name || 'User'}
                src={user?.avatar}
              />
              <VStack align="start" spacing={0}>
                <Text fontWeight="medium">{user?.name || 'Guest User'}</Text>
                <Text fontSize="sm" color={mutedColor}>
                  {user?.email || 'Sign in to access all features'}
                </Text>
              </VStack>
            </HStack>
          </DrawerHeader>

          <DrawerBody p={4}>
            <VStack spacing={2} align="stretch">
              {menuItems.map((item) => (
                <Button
                  key={item.label}
                  leftIcon={<item.icon size={20} />}
                  variant="ghost"
                  justifyContent="start"
                  w="full"
                  py={6}
                  onClick={item.onClick}
                  _hover={{ bg: hoverBg }}
                  position="relative"
                >
                  {item.label}
                  {item.badge && (
                    <Badge
                      position="absolute"
                      right="4"
                      colorScheme="red"
                      borderRadius="full"
                      minW="5"
                      textAlign="center"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              ))}

              <Divider my={4} borderColor={borderColor} />

              <Button
                leftIcon={<LogOut size={20} />}
                variant="ghost"
                justifyContent="start"
                w="full"
                py={6}
                color="red.500"
                onClick={() => console.log('Logout')}
                _hover={{ bg: hoverBg }}
              >
                Sign Out
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <SettingsDrawer
        isOpen={isSettingsOpen}
        onClose={onSettingsClose}
        user={user}
      />

      <AlertsDrawer
        isOpen={isAlertsOpen}
        onClose={onAlertsClose}
      />
    </>
  );
};