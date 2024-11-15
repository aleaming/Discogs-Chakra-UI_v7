import { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  HStack,
  Spacer,
  useDisclosure,
  Fade,
} from '@chakra-ui/react';
import { GridView } from './GridView';
import { RowView } from './RowView';
import { TableView } from './TableView';
import { LayoutSwitcher, LayoutType } from './LayoutSwitcher';
import { FilterDrawer } from '../FilterDrawer';
import { ItemDetailsModal } from './ItemDetailsModal';
import type { MarketplaceItem } from './types';
import { mockItems } from '../../data/marketplace';

export const MarketplaceGridView = () => {
  const [layout, setLayout] = useState<LayoutType>('grid');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(
    null
  );

  const handleViewDetails = (item: MarketplaceItem) => {
    setSelectedItem(item);
    onOpen();
  };

  const ViewComponent = {
    grid: GridView,
    row: RowView,
    table: TableView,
  }[layout];

  return (
    <Container maxW="container.xl" py={8}>
      <HStack mb={6} spacing={4}>
        <Heading size="xl">Marketplace</Heading>
        <Spacer />
        <HStack spacing={3}>
          <FilterDrawer />
          <LayoutSwitcher currentLayout={layout} onLayoutChange={setLayout} />
        </HStack>
      </HStack>

      <Fade in={true} transition={{ enter: { duration: 0.8 } }}>
        <Box mb={8}>
          <ViewComponent items={mockItems} onViewDetails={handleViewDetails} />
        </Box>
      </Fade>

      {selectedItem && (
        <ItemDetailsModal
          isOpen={isOpen}
          onClose={onClose}
          item={selectedItem}
        />
      )}
    </Container>
  );
};

export type { MarketplaceItem };
