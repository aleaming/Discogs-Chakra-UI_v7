import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Select,
  Stack,
  useDisclosure,
  VStack,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Text,
  Divider,
  Switch,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Checkbox,
  CheckboxGroup,
} from '@chakra-ui/react';
import { SlidersHorizontal } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Filter, FilterState } from '../MarketplaceAll/types';

interface FilterDrawerProps {
  onApplyFilters: (filters: Filter[]) => void;
  initialFilters?: FilterState;
}

const formatOptions = [
  'Vinyl',
  'CD',
  'Cassette',
  'Digital',
  'Box Set',
];

const conditionOptions = [
  'Mint',
  'Near Mint',
  'Very Good Plus',
  'Very Good',
  'Good',
  'Fair',
  'Poor',
];

const locationOptions = [
  'United States',
  'United Kingdom',
  'Germany',
  'Japan',
  'France',
  'Canada',
];

export const FilterDrawer = ({ onApplyFilters, initialFilters }: FilterDrawerProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [yearRange, setYearRange] = useState([1950, 2024]);

  useEffect(() => {
    if (initialFilters) {
      setSelectedFormats(initialFilters.format);
      setSelectedConditions(initialFilters.condition);
      setSelectedLocations(initialFilters.location);
      setPriceRange(initialFilters.price);
      setYearRange(initialFilters.year);
    }
  }, [initialFilters]);

  const handleApply = () => {
    const filters: Filter[] = [
      ...selectedFormats.map(format => ({
        category: 'Format',
        value: format,
      })),
      ...selectedConditions.map(condition => ({
        category: 'Condition',
        value: condition,
      })),
      ...selectedLocations.map(location => ({
        category: 'Location',
        value: location,
      })),
    ];

    if (priceRange[0] !== 0 || priceRange[1] !== 1000) {
      filters.push({
        category: 'Price',
        value: `$${priceRange[0]} - $${priceRange[1]}`,
      });
    }

    if (yearRange[0] !== 1950 || yearRange[1] !== 2024) {
      filters.push({
        category: 'Year',
        value: `${yearRange[0]} - ${yearRange[1]}`,
      });
    }

    onApplyFilters(filters);
    onClose();
  };

  const handleClear = () => {
    setSelectedFormats([]);
    setSelectedConditions([]);
    setSelectedLocations([]);
    setPriceRange([0, 1000]);
    setYearRange([1950, 2024]);
  };

  return (
    <>
      <Button
        leftIcon={<SlidersHorizontal size={20} />}
        onClick={onOpen}
        variant="solid"
        size="sm"
        borderRadius="md"
        px={6}
      >
        Filters
      </Button>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="sm">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Filter Results</DrawerHeader>

          <DrawerBody>
            <VStack spacing={6} align="stretch" py={4}>
              <Accordion allowMultiple defaultIndex={[0, 1]}>
                <AccordionItem>
                  <AccordionButton>
                    <Box flex="1" textAlign="left" fontWeight="semibold">
                      Format
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel>
                    <CheckboxGroup
                      value={selectedFormats}
                      onChange={(values) => setSelectedFormats(values as string[])}
                    >
                      <Stack spacing={2}>
                        {formatOptions.map((format) => (
                          <Checkbox key={format} value={format}>
                            {format}
                          </Checkbox>
                        ))}
                      </Stack>
                    </CheckboxGroup>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <AccordionButton>
                    <Box flex="1" textAlign="left" fontWeight="semibold">
                      Condition
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel>
                    <CheckboxGroup
                      value={selectedConditions}
                      onChange={(values) => setSelectedConditions(values as string[])}
                    >
                      <Stack spacing={2}>
                        {conditionOptions.map((condition) => (
                          <Checkbox key={condition} value={condition}>
                            {condition}
                          </Checkbox>
                        ))}
                      </Stack>
                    </CheckboxGroup>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <AccordionButton>
                    <Box flex="1" textAlign="left" fontWeight="semibold">
                      Location
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel>
                    <CheckboxGroup
                      value={selectedLocations}
                      onChange={(values) => setSelectedLocations(values as string[])}
                    >
                      <Stack spacing={2}>
                        {locationOptions.map((location) => (
                          <Checkbox key={location} value={location}>
                            {location}
                          </Checkbox>
                        ))}
                      </Stack>
                    </CheckboxGroup>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <AccordionButton>
                    <Box flex="1" textAlign="left" fontWeight="semibold">
                      Price Range
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel>
                    <Box px={2}>
                      <RangeSlider
                        value={priceRange}
                        min={0}
                        max={1000}
                        step={10}
                        onChange={setPriceRange}
                      >
                        <RangeSliderTrack>
                          <RangeSliderFilledTrack />
                        </RangeSliderTrack>
                        <RangeSliderThumb index={0} />
                        <RangeSliderThumb index={1} />
                      </RangeSlider>
                      <Text mt={2} fontSize="sm">
                        ${priceRange[0]} - ${priceRange[1]}
                      </Text>
                    </Box>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <AccordionButton>
                    <Box flex="1" textAlign="left" fontWeight="semibold">
                      Year Range
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel>
                    <Box px={2}>
                      <RangeSlider
                        value={yearRange}
                        min={1950}
                        max={2024}
                        step={1}
                        onChange={setYearRange}
                      >
                        <RangeSliderTrack>
                          <RangeSliderFilledTrack />
                        </RangeSliderTrack>
                        <RangeSliderThumb index={0} />
                        <RangeSliderThumb index={1} />
                      </RangeSlider>
                      <Text mt={2} fontSize="sm">
                        {yearRange[0]} - {yearRange[1]}
                      </Text>
                    </Box>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </VStack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={handleClear}>
              Clear All
            </Button>
            <Button colorScheme="brand" onClick={handleApply}>
              Apply Filters
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};