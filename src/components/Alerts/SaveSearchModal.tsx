import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Switch,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { FilterDrawer } from '../FilterDrawer';
import { SavedSearch } from './types';
import { useState } from 'react';

interface SaveSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedSearch?: SavedSearch | null;
}

export const SaveSearchModal = ({
  isOpen,
  onClose,
  savedSearch,
}: SaveSearchModalProps) => {
  const [name, setName] = useState(savedSearch?.name || '');
  const [notificationEnabled, setNotificationEnabled] = useState(
    savedSearch?.notificationEnabled ?? true
  );
  const [emailEnabled, setEmailEnabled] = useState(
    savedSearch?.emailEnabled ?? false
  );

  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  const handleSave = () => {
    // Save logic will be implemented with context/state management
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {savedSearch ? 'Edit Search Alert' : 'Create Search Alert'}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <VStack spacing={6}>
            <FormControl>
              <FormLabel>Alert Name</FormLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Give your search a name"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Search Criteria</FormLabel>
              <FilterDrawer
                onApplyFilters={() => {}}
                initialFilters={savedSearch?.criteria}
              />
            </FormControl>

            <FormControl>
              <FormLabel mb={4}>Notification Settings</FormLabel>
              <VStack align="start" spacing={4}>
                <FormControl display="flex" alignItems="center">
                  <Switch
                    id="notifications"
                    isChecked={notificationEnabled}
                    onChange={(e) => setNotificationEnabled(e.target.checked)}
                    colorScheme="brand"
                  />
                  <FormLabel htmlFor="notifications" mb={0} ml={3}>
                    Show notifications
                  </FormLabel>
                </FormControl>

                <FormControl display="flex" alignItems="center">
                  <Switch
                    id="email"
                    isChecked={emailEnabled}
                    onChange={(e) => setEmailEnabled(e.target.checked)}
                    colorScheme="brand"
                  />
                  <FormLabel htmlFor="email" mb={0} ml={3}>
                    Send email notifications
                  </FormLabel>
                </FormControl>
              </VStack>
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="brand" onClick={handleSave}>
            Save Alert
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};