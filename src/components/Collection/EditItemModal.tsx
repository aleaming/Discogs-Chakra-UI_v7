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
  Select,
  Textarea,
  VStack,
  HStack,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import type { CollectionItem } from './types';

interface EditItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: CollectionItem;
  onSave: (updatedItem: CollectionItem) => void;
}

const conditionOptions = ['M', 'NM', 'VG+', 'VG', 'G+', 'G', 'F', 'P'];

export const EditItemModal = ({ isOpen, onClose, item, onSave }: EditItemModalProps) => {
  const [editedItem, setEditedItem] = useState<CollectionItem>(item);
  const toast = useToast();

  const bgColor = useColorModeValue('white', 'black');
  const colorInvert = useColorModeValue('black', 'white');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const menuBgColor = useColorModeValue('gray.50', 'gray.700');

  const handleSave = () => {
    onSave(editedItem);
    toast({
      title: 'Item updated',
      description: 'Your collection item has been successfully updated.',
      status: 'success',
      duration: 3000,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay bg="blackAlpha.700" />
      <ModalContent bg={bgColor}>
        <ModalHeader borderBottomWidth="1px" borderColor={borderColor} color={colorInvert}>
          Edit Collection Item
        </ModalHeader>
        <ModalCloseButton color={colorInvert} />

        <ModalBody py={6}>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel color={colorInvert}>Title</FormLabel>
              <Input
                value={editedItem.title}
                onChange={(e) => setEditedItem({ ...editedItem, title: e.target.value })}
                bg={bgColor}
                borderColor={borderColor}
                color={colorInvert}
              />
            </FormControl>

            <FormControl>
              <FormLabel color={colorInvert}>Artist</FormLabel>
              <Input
                value={editedItem.artist}
                onChange={(e) => setEditedItem({ ...editedItem, artist: e.target.value })}
                bg={bgColor}
                borderColor={borderColor}
                color={colorInvert}
              />
            </FormControl>

            <FormControl>
              <FormLabel color={colorInvert}>Release Year</FormLabel>
              <Input
                type="number"
                value={editedItem.releaseYear}
                onChange={(e) => setEditedItem({ ...editedItem, releaseYear: parseInt(e.target.value) })}
                bg={bgColor}
                borderColor={borderColor}
                color={colorInvert}
              />
            </FormControl>

            <HStack width="100%" spacing={4}>
              <FormControl>
                <FormLabel color={colorInvert}>Media Condition</FormLabel>
                <Select
                  value={editedItem.condition.media}
                  onChange={(e) => setEditedItem({
                    ...editedItem,
                    condition: { ...editedItem.condition, media: e.target.value }
                  })}
                  bg={bgColor}
                  borderColor={borderColor}
                  color={colorInvert}
                >
                  {conditionOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel color={colorInvert}>Sleeve Condition</FormLabel>
                <Select
                  value={editedItem.condition.sleeve}
                  onChange={(e) => setEditedItem({
                    ...editedItem,
                    condition: { ...editedItem.condition, sleeve: e.target.value }
                  })}
                  bg={bgColor}
                  borderColor={borderColor}
                  color={colorInvert}
                >
                  {conditionOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </Select>
              </FormControl>
            </HStack>

            <FormControl>
              <FormLabel color={colorInvert}>Notes</FormLabel>
              <Textarea
                value={editedItem.condition.notes || ''}
                onChange={(e) => setEditedItem({
                  ...editedItem,
                  condition: { ...editedItem.condition, notes: e.target.value }
                })}
                bg={bgColor}
                borderColor={borderColor}
                color={colorInvert}
              />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter borderTopWidth="1px" borderColor={borderColor}>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="brand" onClick={handleSave}>
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};