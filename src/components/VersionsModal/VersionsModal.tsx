import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  HStack,
  Text,
  Badge,
  Box,
  Image,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { ExternalLink, ShoppingCart } from 'lucide-react';

interface Version {
  id: string;
  year: number;
  format: string;
  country: string;
  label: string;
  catNo: string;
  notes?: string;
  price?: string;
}

interface VersionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  album: {
    title: string;
    artwork: string;
    versions: Version[];
  };
}

export const VersionsModal = ({ isOpen, onClose, album }: VersionsModalProps) => {
  const headerBg = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent maxH="85vh">
        <ModalHeader borderBottomWidth="1px" py={4}>
          <Flex align="center" gap={4}>
            <Image
              src={album.artwork}
              alt={album.title}
              boxSize="50px"
              objectFit="cover"
              borderRadius="md"
            />
            <Box>
              <Text fontSize="lg" fontWeight="bold">
                {album.title} Versions
              </Text>
              <Text fontSize="sm" color="gray.500">
                {album.versions.length} versions found
              </Text>
            </Box>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody p={0}>
          <Box overflowX="auto">
            <Table variant="simple" size="sm">
              <Thead
                position="sticky"
                top={0}
                zIndex="docked"
                bg={headerBg}
                borderBottomWidth="1px"
                borderColor={borderColor}
              >
                <Tr>
                  <Th>Format</Th>
                  <Th>Year</Th>
                  <Th>Country</Th>
                  <Th>Label</Th>
                  <Th>Cat#</Th>
                  <Th>Notes</Th>
                  <Th>Price</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {album.versions.map((version) => (
                  <Tr
                    key={version.id}
                    _hover={{ bg: hoverBg }}
                    transition="background-color 0.2s"
                  >
                    <Td>
                      <Badge colorScheme="purple" fontSize="xs">
                        {version.format}
                      </Badge>
                    </Td>
                    <Td>{version.year}</Td>
                    <Td>{version.country}</Td>
                    <Td>{version.label}</Td>
                    <Td>
                      <Text fontFamily="mono" fontSize="xs">
                        {version.catNo}
                      </Text>
                    </Td>
                    <Td>
                      <Text fontSize="sm" noOfLines={2}>
                        {version.notes || '-'}
                      </Text>
                    </Td>
                    <Td>
                      {version.price ? (
                        <Text fontWeight="bold" color="brand.500">
                          {version.price}
                        </Text>
                      ) : (
                        '-'
                      )}
                    </Td>
                    <Td>
                      <HStack spacing={2}>
                        <Button
                          size="xs"
                          leftIcon={<ExternalLink size={14} />}
                          variant="ghost"
                          colorScheme="brand"
                        >
                          View
                        </Button>
                        <Button
                          size="xs"
                          leftIcon={<ShoppingCart size={14} />}
                          colorScheme="brand"
                        >
                          Shop
                        </Button>
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};