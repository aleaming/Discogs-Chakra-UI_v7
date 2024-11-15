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
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  useColorModeValue,
  Icon,
  Divider,
} from '@chakra-ui/react';
import {
  User,
  Bell,
  Shield,
  Globe,
  Mail,
  Share2,
  Database,
  Wallet,
  Headphones,
  Layout,
  Settings as SettingsIcon,
} from 'lucide-react';
import { ProfileSettings } from './sections/ProfileSettings';
import { NotificationSettings } from './sections/NotificationSettings';
import { PrivacySettings } from './sections/PrivacySettings';
import { RegionalSettings } from './sections/RegionalSettings';
import { EmailSettings } from './sections/EmailSettings';
import { SocialSettings } from './sections/SocialSettings';
import { CollectionSettings } from './sections/CollectionSettings';
import { PaymentSettings } from './sections/PaymentSettings';
import { PlaybackSettings } from './sections/PlaybackSettings';
import { AppearanceSettings } from './sections/AppearanceSettings';
import type { SettingsDrawerProps, SettingsSection } from './types';

const sections: SettingsSection[] = [
  { id: 'profile', label: 'Profile', icon: User, description: 'Manage your personal information and preferences' },
  { id: 'notifications', label: 'Notifications', icon: Bell, description: 'Control how you receive notifications' },
  { id: 'privacy', label: 'Privacy', icon: Shield, description: 'Manage your privacy settings and data' },
  { id: 'regional', label: 'Regional', icon: Globe, description: 'Set your language, currency, and location' },
  { id: 'email', label: 'Email Settings', icon: Mail, description: 'Configure your email preferences' },
  { id: 'social', label: 'Social', icon: Share2, description: 'Manage connected accounts and sharing' },
  { id: 'collection', label: 'Collection', icon: Database, description: 'Customize your collection settings' },
  { id: 'payment', label: 'Payment', icon: Wallet, description: 'Manage payment methods and billing' },
  { id: 'playback', label: 'Playback', icon: Headphones, description: 'Configure audio playback settings' },
  { id: 'appearance', label: 'Appearance', icon: Layout, description: 'Customize the look and feel' },
];

export const SettingsDrawer = ({ isOpen, onClose, user }: SettingsDrawerProps) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      size="full"
    >
      <DrawerOverlay />
      <DrawerContent bg={bgColor}>
        <DrawerCloseButton />
        <DrawerHeader
          borderBottomWidth="1px"
          borderColor={borderColor}
          py={4}
        >
          <HStack spacing={2}>
            <SettingsIcon size={20} />
            <Text>Settings</Text>
          </HStack>
        </DrawerHeader>

        <DrawerBody p={0}>
          <Tabs
            orientation="vertical"
            variant="line"
            display="flex"
            minH="100%"
          >
            <TabList
              borderRight="1px"
              borderColor={borderColor}
              w="300px"
              py={4}
            >
              {sections.map((section) => (
                <Tab
                  key={section.id}
                  py={4}
                  px={6}
                  justifyContent="start"
                  _selected={{
                    color: 'brand.500',
                    borderRight: '2px solid',
                    borderColor: 'brand.500',
                    bg: hoverBg,
                  }}
                >
                  <HStack spacing={3}>
                    <Icon as={section.icon} boxSize={5} />
                    <VStack align="start" spacing={0}>
                      <Text fontWeight="medium">{section.label}</Text>
                      {section.description && (
                        <Text fontSize="xs" color={mutedColor}>
                          {section.description}
                        </Text>
                      )}
                    </VStack>
                  </HStack>
                </Tab>
              ))}
            </TabList>

            <TabPanels flex={1}>
              <TabPanel>
                <ProfileSettings user={user} />
              </TabPanel>
              <TabPanel>
                <NotificationSettings />
              </TabPanel>
              <TabPanel>
                <PrivacySettings />
              </TabPanel>
              <TabPanel>
                <RegionalSettings />
              </TabPanel>
              <TabPanel>
                <EmailSettings />
              </TabPanel>
              <TabPanel>
                <SocialSettings />
              </TabPanel>
              <TabPanel>
                <CollectionSettings />
              </TabPanel>
              <TabPanel>
                <PaymentSettings />
              </TabPanel>
              <TabPanel>
                <PlaybackSettings />
              </TabPanel>
              <TabPanel>
                <AppearanceSettings />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};