import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  VStack,
  HStack,
  Select,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  useColorModeValue,
  Text,
  Box,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { Search, Plus, Grid, List, Table as TableIcon, Download, Upload, Box as CrateIcon } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { CollectionGrid } from './CollectionGrid';
import { CollectionList } from './CollectionList';
import { CollectionTable } from './CollectionTable';
import { RecordCrateView } from './RecordCrateView';
import { EditItemModal } from './EditItemModal';
import { AddItemModal } from './AddItemModal';
import { exportToCSV, importFromCSV } from '../../utils/csvHelpers';
import type { ViewMode, CollectionItem } from './types';
import { mockCollection } from '../../data/collection';

interface CollectionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CollectionDrawer = ({ isOpen, onClose }: CollectionDrawerProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState('dateAdded');
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<CollectionItem[]>(mockCollection);
  const [selectedItem, setSelectedItem] = useState<CollectionItem | null>(null);
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageLoadErrors, setImageLoadErrors] = useState<Set<string>>(new Set());
  const toastShownRef = useRef(false);
  const toast = useToast();

  const bgColor = useColorModeValue('white', 'gray.800');
  const colorInvert = useColorModeValue('black', 'white');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const menuBgColor = useColorModeValue('gray.50', 'gray.700');

  // Reset error tracking when drawer opens
  useEffect(() => {
    if (isOpen) {
      setImageLoadErrors(new Set());
      toastShownRef.current = false;
    }
  }, [isOpen]);

  const handleImageError = (itemTitle: string) => {
    setImageLoadErrors(prev => new Set(prev).add(itemTitle));
  };

  // Show consolidated toast when all items are loaded
  useEffect(() => {
    if (imageLoadErrors.size > 0 && !toastShownRef.current) {
      toast({
        title: 'Image Loading Issues',
        description: `Failed to load cover art for ${imageLoadErrors.size} item${imageLoadErrors.size > 1 ? 's' : ''}. Using fallback images.`,
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      });
      toastShownRef.current = true;
    }
  }, [imageLoadErrors, toast]);

  const handleEditItem = (item: CollectionItem) => {
    setSelectedItem(item);
    onEditOpen();
  };

  const handleSaveItem = (updatedItem: CollectionItem) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === updatedItem.id ? updatedItem : item
      )
    );
  };

  const handleAddItem = (newItem: CollectionItem) => {
    setItems(prevItems => [...prevItems, newItem]);
  };

  const handleExportCSV = () => {
    exportToCSV(items);
    toast({
      title: 'Export successful',
      description: 'Your collection has been exported to CSV',
      status: 'success',
      duration: 3000,
    });
  };

  const handleImportCSV = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const importedItems = await importFromCSV(file);
        setItems(importedItems);
        toast({
          title: 'Import successful',
          description: `Imported ${importedItems.length} items`,
          status: 'success',
          duration: 3000,
        });
      } catch (error) {
        toast({
          title: 'Import failed',
          description: error instanceof Error ? error.message : 'Failed to import CSV',
          status: 'error',
          duration: 3000,
        });
      }
    }
  };

  const ViewComponent = {
    grid: CollectionGrid,
    list: CollectionList,
    table: CollectionTable,
    crate: RecordCrateView,
  }[viewMode];

  return (
    <>
      <Drawer 
        isOpen={isOpen} 
        onClose={onClose} 
        size="full" 
        placement="bottom"
      >
        <DrawerOverlay />
        <DrawerContent bg={bgColor}>
          <DrawerCloseButton color={colorInvert} />
          <DrawerHeader borderBottomWidth="1px" borderColor={borderColor}>
            <HStack justify="space-between">
              <Text fontSize="2xl" color={colorInvert}>My Collection</Text>
              <HStack spacing={2}>
                <Button
                  leftIcon={<Download size={20} />}
                  variant="outline"
                  size="sm"
                  onClick={handleExportCSV}
                  _hover={{ bg: menuBgColor }}
                >
                  Export CSV
                </Button>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleImportCSV}
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                />
                <Button
                  leftIcon={<Upload size={20} />}
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  _hover={{ bg: menuBgColor }}
                >
                  Import CSV
                </Button>
              </HStack>
            </HStack>
          </DrawerHeader>

          <DrawerBody>
            <VStack spacing={6} align="stretch" py={4}>
              <HStack spacing={4}>
                <InputGroup maxW="400px">
                  <InputLeftElement>
                    <Search size={20} />
                  </InputLeftElement>
                  <Input
                    placeholder="Search collection..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    bg={bgColor}
                    borderColor={borderColor}
                    color={colorInvert}
                  />
                </InputGroup>

                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  maxW="200px"
                  bg={bgColor}
                  borderColor={borderColor}
                  color={colorInvert}
                >
                  <option value="dateAdded">Date Added</option>
                  <option value="artist">Artist</option>
                  <option value="title">Title</option>
                  <option value="rating">Rating</option>
                  <option value="releaseYear">Release Year</option>
                </Select>

                <HStack>
                  <Button
                    leftIcon={<Grid size={20} />}
                    variant={viewMode === 'grid' ? 'solid' : 'ghost'}
                    onClick={() => setViewMode('grid')}
                    colorScheme={viewMode === 'grid' ? 'brand' : undefined}
                    _hover={{ bg: menuBgColor }}
                  >
                    Grid
                  </Button>
                  <Button
                    leftIcon={<List size={20} />}
                    variant={viewMode === 'list' ? 'solid' : 'ghost'}
                    onClick={() => setViewMode('list')}
                    colorScheme={viewMode === 'list' ? 'brand' : undefined}
                    _hover={{ bg: menuBgColor }}
                  >
                    List
                  </Button>
                  <Button
                    leftIcon={<TableIcon size={20} />}
                    variant={viewMode === 'table' ? 'solid' : 'ghost'}
                    onClick={() => setViewMode('table')}
                    colorScheme={viewMode === 'table' ? 'brand' : undefined}
                    _hover={{ bg: menuBgColor }}
                  >
                    Table
                  </Button>
                  <Button
                    leftIcon={<CrateIcon size={20} />}
                    variant={viewMode === 'crate' ? 'solid' : 'ghost'}
                    onClick={() => setViewMode('crate')}
                    colorScheme={viewMode === 'crate' ? 'brand' : undefined}
                    _hover={{ bg: menuBgColor }}
                  >
                    Crate
                  </Button>
                </HStack>

                <Button
                  leftIcon={<Plus size={20} />}
                  colorScheme="brand"
                  onClick={onAddOpen}
                >
                  Add Item
                </Button>
              </HStack>

              <Box flex={1} overflowY="auto">
                <ViewComponent 
                  items={items} 
                  onEdit={handleEditItem}
                  onImageError={handleImageError}
                  onSelect={() => {}}
                />
              </Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {selectedItem && (
        <EditItemModal
          isOpen={isEditOpen}
          onClose={onEditClose}
          item={selectedItem}
          onSave={handleSaveItem}
        />
      )}

      <AddItemModal
        isOpen={isAddOpen}
        onClose={onAddClose}
        onAdd={handleAddItem}
      />
    </>
  );
};