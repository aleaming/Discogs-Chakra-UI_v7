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
  Box,
  Image,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useCoverArt } from '../../hooks/useCoverArt';
import type { CollectionItem } from './types';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: CollectionItem) => void;
}

const conditionOptions = ['M', 'NM', 'VG+', 'VG', 'G+', 'G', 'F', 'P'];
const formatTypes = ['Vinyl', 'CD', 'Cassette', 'Digital', 'Box Set'];

export const AddItemModal = ({ isOpen, onClose, onAdd }: AddItemModalProps) => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [releaseYear, setReleaseYear] = useState(new Date().getFullYear());
  const [formatType, setFormatType] = useState('Vinyl');
  const [formatDetails, setFormatDetails] = useState('');
  const [mediaCondition, setMediaCondition] = useState('NM');
  const [sleeveCondition, setSleeveCondition] = useState('NM');
  const [notes, setNotes] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const { coverUrl, loading: coverLoading } = useCoverArt(
    isSearching ? artist : '',
    isSearching ? title : ''
  );

  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleSubmit = () => {
    if (!title || !artist) {
      toast({
        title: 'Required Fields Missing',
        description: 'Please fill in all required fields',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    const newItem: CollectionItem = {
      id: Date.now().toString(),
      title,
      artist,
      releaseYear,
      format: {
        type: formatType,
        details: formatDetails.split(',').map(d => d.trim()),
      },
      condition: {
        media: mediaCondition,
        sleeve: sleeveCondition,
        notes: notes || undefined,
      },
      image: coverUrl || '',
      dateAdded: new Date().toISOString(),
      tags: [],
      rating: 0,
    };

    onAdd(newItem);
    toast({
      title: 'Item Added',
      description: 'The item has been added to your collection',
      status: 'success',
      duration: 3000,
    });
    handleClose();
  };

  const handleClose = () => {
    setTitle('');
    setArtist('');
    setReleaseYear(new Date().getFullYear());
    setFormatType('Vinyl');
    setFormatDetails('');
    setMediaCondition('NM');
    setSleeveCondition('NM');
    setNotes('');
    setIsSearching(false);
    onClose();
  };

  const handleSearch = () => {
    if (title && artist) {
      setIsSearching(true);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="xl">
      <ModalOverlay />
      <ModalContent bg={bgColor}>
        <ModalHeader borderBottomWidth="1px" borderColor={borderColor}>
          Add to Collection
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <VStack spacing={4} align="stretch">
            <HStack spacing={4} align="start">
              <VStack flex={1} spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Title</FormLabel>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Album title"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Artist</FormLabel>
                  <Input
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                    placeholder="Artist name"
                  />
                </FormControl>

                <Button
                  colorScheme="brand"
                  isLoading={coverLoading}
                  onClick={handleSearch}
                  isDisabled={!title || !artist}
                >
                  Search Cover Art
                </Button>
              </VStack>

              <Box width="150px" height="150px" borderRadius="md" overflow="hidden" borderWidth="1px" borderColor={borderColor}>
                {coverUrl ? (
                  <Image src={coverUrl} alt="Album cover" width="100%" height="100%" objectFit="cover" />
                ) : (
                  <Box width="100%" height="100%" bg="gray.100" display="flex" alignItems="center" justifyContent="center">
                    <Text color="gray.500" fontSize="sm" textAlign="center">
                      {coverLoading ? 'Searching...' : 'No cover art'}
                    </Text>
                  </Box>
                )}
              </Box>
            </HStack>

            <FormControl>
              <FormLabel>Release Year</FormLabel>
              <Input
                type="number"
                value={releaseYear}
                onChange={(e) => setReleaseYear(parseInt(e.target.value))}
              />
            </FormControl>

            <HStack spacing={4}>
              <FormControl>
                <FormLabel>Format</FormLabel>
                <Select
                  value={formatType}
                  onChange={(e) => setFormatType(e.target.value)}
                >
                  {formatTypes.map(format => (
                    <option key={format} value={format}>{format}</option>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Format Details</FormLabel>
                <Input
                  value={formatDetails}
                  onChange={(e) => setFormatDetails(e.target.value)}
                  placeholder="e.g., 2xLP, Album, 180g"
                />
              </FormControl>
            </HStack>

            <HStack spacing={4}>
              <FormControl>
                <FormLabel>Media Condition</FormLabel>
                <Select
                  value={mediaCondition}
                  onChange={(e) => setMediaCondition(e.target.value)}
                >
                  {conditionOptions.map(condition => (
                    <option key={condition} value={condition}>{condition}</option>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Sleeve Condition</FormLabel>
                <Select
                  value={sleeveCondition}
                  onChange={(e) => setSleeveCondition(e.target.value)}
                >
                  {conditionOptions.map(condition => (
                    <option key={condition} value={condition}>{condition}</option>
                  ))}
                </Select>
              </FormControl>
            </HStack>

            <FormControl>
              <FormLabel>Notes</FormLabel>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any notes about condition or pressing..."
              />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter borderTopWidth="1px" borderColor={borderColor}>
          <Button variant="ghost" mr={3} onClick={handleClose}>
            Cancel
          </Button>
          <Button colorScheme="brand" onClick={handleSubmit}>
            Add to Collection
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};