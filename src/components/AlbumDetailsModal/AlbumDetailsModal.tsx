import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Image,
  Text,
  VStack,
  HStack,
  Badge,
  Divider,
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { MarketStats } from './MarketStats';
import type { AlbumDetailsModalProps } from './types';
import { MoreVertical, Library, Zap, List, DollarSign, Heart } from 'lucide-react';

export const AlbumDetailsModal = ({ isOpen, onClose, album }: AlbumDetailsModalProps) => {
  const bgColor = useColorModeValue('white', 'black');
  const colorInvert = useColorModeValue('black', 'white');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const menuBgColor = useColorModeValue('gray.50', 'gray.800');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl" scrollBehavior="inside">
      <ModalOverlay bg="blackAlpha.700" />
      <ModalContent bg={bgColor}>
        <ModalHeader p={0}>
          <Box p={6} borderBottom="1px" borderColor={borderColor}>
            <HStack spacing={6} align="start">
              <Image
                src={album.image}
                alt={album.title}
                boxSize="120px"
                objectFit="cover"
                borderRadius="md"
              />
              <VStack align="start" spacing={2} flex={1}>
                <Text fontSize="2xl" fontWeight="bold" color={colorInvert}>
                  {album.title}
                </Text>
                <Text fontSize="lg" color="brand.500">
                  {album.artist}
                </Text>
                <HStack spacing={4}>
                  <Text color={mutedColor}>
                    Released: {album.releaseYear}
                  </Text>
                  <Text color={mutedColor}>
                    Label: {album.label}
                  </Text>
                </HStack>
                {album.condition && (
                  <HStack spacing={2}>
                    <Badge variant="mint">
                      Media: {album.condition.media}
                    </Badge>
                    <Badge variant="nearMint">
                      Sleeve: {album.condition.sleeve}
                    </Badge>
                  </HStack>
                )}
                <HStack spacing="2" pt={2}>
                  <Button size="sm" colorScheme="brand" flex={1}>
                    Shop
                  </Button>
                  <Button size="sm" variant="outline" colorScheme="brand" flex={1}>
                    View
                  </Button>
                  <Menu>
                    <MenuButton
                      as={Button}
                      size="sm"
                      variant="outline"
                      colorScheme="brand"
                    >
                      <MoreVertical size={16} />
                    </MenuButton>
                    <MenuList bg={bgColor} borderColor={borderColor}>
                      <MenuItem 
                        icon={<Library size={16} />}
                        _hover={{ bg: menuBgColor }}
                      >
                        Add to Collection
                      </MenuItem>
                      <MenuItem 
                        icon={<Zap size={16} />}
                        _hover={{ bg: menuBgColor }}
                      >
                        Add to Wantlist
                      </MenuItem>
                      <MenuItem 
                        icon={<List size={16} />}
                        _hover={{ bg: menuBgColor }}
                      >
                        Add to List
                      </MenuItem>
                      <MenuItem 
                        icon={<DollarSign size={16} />}
                        _hover={{ bg: menuBgColor }}
                      >
                        Sell a copy
                      </MenuItem>
                      <MenuItem 
                        icon={<Heart size={16} />}
                        _hover={{ bg: menuBgColor }}
                      >
                        Follow artist
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </HStack>
              </VStack>
            </HStack>
          </Box>
        </ModalHeader>
        <ModalCloseButton color={colorInvert} />

        <ModalBody p={6}>
          <Tabs>
            <TabList mb={4}>
              <Tab color={colorInvert}>Market Statistics</Tab>
              <Tab color={colorInvert}>Release Details</Tab>
              <Tab color={colorInvert}>Reviews</Tab>
            </TabList>

            <TabPanels>
              <TabPanel p={0}>
                <MarketStats stats={album.marketStats} />
              </TabPanel>
              <TabPanel>
                <VStack align="start" spacing={4}>
                  <Box>
                    <Text fontWeight="bold" mb={2} color={colorInvert}>Format</Text>
                    <Text color={mutedColor}>{album.format}</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold" mb={2} color={colorInvert}>Release Information</Text>
                    <Text color={mutedColor}>More details about the release...</Text>
                  </Box>
                </VStack>
              </TabPanel>
              <TabPanel>
                <Text color={mutedColor}>Reviews and ratings will be displayed here...</Text>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};