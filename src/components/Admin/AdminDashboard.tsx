import {
  Box,
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { Users, Settings, Shield } from 'lucide-react';
import { UserManagement } from './UserManagement';
import { AdminSettings } from './AdminSettings';
import { RoleManagement } from './RoleManagement';

export const AdminDashboard = () => {
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      <Container maxW="container.xl" py={8}>
        <Heading mb={8}>Admin Dashboard</Heading>
        
        <Tabs variant="enclosed">
          <TabList borderBottomColor={borderColor}>
            <Tab>
              <HStack spacing={2}>
                <Users size={16} />
                <span>Users</span>
              </HStack>
            </Tab>
            <Tab>
              <HStack spacing={2}>
                <Shield size={16} />
                <span>Roles</span>
              </HStack>
            </Tab>
            <Tab>
              <HStack spacing={2}>
                <Settings size={16} />
                <span>Settings</span>
              </HStack>
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <UserManagement />
            </TabPanel>
            <TabPanel>
              <RoleManagement />
            </TabPanel>
            <TabPanel>
              <AdminSettings />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  );
};