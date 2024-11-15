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
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
  Badge,
} from '@chakra-ui/react';
import { Bell, ChevronDown, Search, Settings } from 'lucide-react';
import { AlertsList } from './AlertsList';
import { SavedSearches } from './SavedSearches';
import { useAlerts } from '../../hooks/useAlerts';

interface AlertsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AlertsDrawer = ({ isOpen, onClose }: AlertsDrawerProps) => {
  const { alerts, savedSearches, markAllRead, clearAll } = useAlerts();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.100', 'gray.700');

  const unreadCount = alerts.filter(alert => !alert.isRead).length;

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent bg={bgColor}>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px" borderColor={borderColor}>
          <HStack justify="space-between">
            <HStack>
              <Bell size={20} />
              <Text>Alerts</Text>
              {unreadCount > 0 && (
                <Badge colorScheme="red" borderRadius="full">
                  {unreadCount}
                </Badge>
              )}
            </HStack>
            <Menu>
              <MenuButton
                as={Button}
                variant="ghost"
                size="sm"
                rightIcon={<ChevronDown size={16} />}
              >
                Actions
              </MenuButton>
              <MenuList>
                <MenuItem onClick={markAllRead}>Mark all as read</MenuItem>
                <MenuItem onClick={clearAll}>Clear all</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </DrawerHeader>

        <DrawerBody p={0}>
          <Tabs>
            <TabList px={4}>
              <Tab>
                <HStack>
                  <Bell size={16} />
                  <Text>Notifications</Text>
                </HStack>
              </Tab>
              <Tab>
                <HStack>
                  <Search size={16} />
                  <Text>Saved Searches</Text>
                </HStack>
              </Tab>
              <Tab>
                <HStack>
                  <Settings size={16} />
                  <Text>Settings</Text>
                </HStack>
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel p={4}>
                <AlertsList alerts={alerts} />
              </TabPanel>
              <TabPanel p={4}>
                <SavedSearches searches={savedSearches} />
              </TabPanel>
              <TabPanel p={4}>
                <Text>Alert settings will go here...</Text>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};