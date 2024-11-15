import {
  Box,
  Container,
  Heading,
  HStack,
  Text,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { ArrowRight } from 'lucide-react';
import { GridView } from '../MarketplaceGrid/GridView';
import { mockItems } from '../../data/marketplace';

interface FeaturedMarketplaceProps {
  onViewAll?: () => void;
}

export const FeaturedMarketplace = ({ onViewAll }: FeaturedMarketplaceProps) => {
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleViewDetails = (item: any) => {
    console.log('View details:', item);
  };

  return (
    <Box py={8} borderTop="1px" borderColor={borderColor}>
      <Container maxW="container.xl">
        <HStack justify="space-between" mb={6}>
          <Box>
            <Heading size="lg" mb={2}>Featured in Marketplace</Heading>
            <Text color="gray.600">Handpicked items from our community</Text>
          </Box>
          <Button
            variant="ghost"
            rightIcon={<ArrowRight size={16} />}
            colorScheme="brand"
            onClick={onViewAll}
          >
            View All
          </Button>
        </HStack>

        <GridView
          items={mockItems.slice(0, 4)}
          onViewDetails={handleViewDetails}
        />
      </Container>
    </Box>
  );
};