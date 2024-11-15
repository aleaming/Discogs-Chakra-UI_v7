// src/components/Pagination.tsx
import { Box, Button, HStack } from '@chakra-ui/react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <HStack spacing={4} mt={8} justify="center">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        isDisabled={currentPage === 1}
        colorScheme="teal"
        variant="outline"
      >
        Previous
      </Button>
      <Box>
        Page {currentPage} of {totalPages}
      </Box>
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        isDisabled={currentPage === totalPages}
        colorScheme="teal"
        variant="outline"
      >
        Next
      </Button>
    </HStack>
  );
};

export default Pagination;
