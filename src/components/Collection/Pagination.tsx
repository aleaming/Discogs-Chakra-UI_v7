import {
  HStack,
  Button,
  Select,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

export const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <HStack spacing={4} justify="space-between" w="full" py={4}>
      <HStack spacing={2}>
        <Text fontSize="sm" color={mutedColor}>
          Show
        </Text>
        <Select
          size="sm"
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          width="auto"
        >
          <option value={12}>12</option>
          <option value={24}>24</option>
          <option value={48}>48</option>
          <option value={96}>96</option>
        </Select>
        <Text fontSize="sm" color={mutedColor}>
          items per page
        </Text>
      </HStack>

      <HStack spacing={2}>
        <Text fontSize="sm" color={mutedColor}>
          {`${(currentPage - 1) * itemsPerPage + 1}-${Math.min(
            currentPage * itemsPerPage,
            totalItems
          )} of ${totalItems} items`}
        </Text>
        <Button
          size="sm"
          variant="ghost"
          isDisabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          leftIcon={<ChevronLeft size={16} />}
        >
          Previous
        </Button>
        <Button
          size="sm"
          variant="ghost"
          isDisabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          rightIcon={<ChevronRight size={16} />}
        >
          Next
        </Button>
      </HStack>
    </HStack>
  );
};