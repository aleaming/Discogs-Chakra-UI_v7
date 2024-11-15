import {
  VStack,
  Text,
  Box,
  Divider,
  FormControl,
  FormLabel,
  Switch,
  Select,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';

export const PlaybackSettings = () => {
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <VStack spacing={8} align="start" maxW="800px" w="full">
      <Box w="full">
        <Text fontSize="2xl" fontWeight="bold" mb={6}>
          Playback Settings
        </Text>
        <Divider mb={6} />

        <SimpleGrid columns={1} spacing={6}>
          <FormControl>
            <FormLabel>Audio Quality</FormLabel>
            <Text fontSize="sm" color={mutedColor} mb={2}>
              Select your preferred streaming quality
            </Text>
            <Select maxW="400px">
              <option value="auto">Automatic</option>
              <option value="high">High Quality (320kbps)</option>
              <option value="medium">Medium Quality (160kbps)</option>
              <option value="low">Low Quality (96kbps)</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Default Volume</FormLabel>
            <Text fontSize="sm" color={mutedColor} mb={4}>
              Set the default volume level for playback
            </Text>
            <Box px={4} maxW="400px">
              <Slider defaultValue={70} min={0} max={100}>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Box>
          </FormControl>

          <FormControl display="flex" alignItems="center" justifyContent="space-between">
            <Box>
              <FormLabel mb={0}>Crossfade</FormLabel>
              <Text fontSize="sm" color={mutedColor}>
                Enable smooth transitions between tracks
              </Text>
            </Box>
            <Switch colorScheme="brand" size="lg" />
          </FormControl>

          <FormControl display="flex" alignItems="center" justifyContent="space-between">
            <Box>
              <FormLabel mb={0}>Autoplay</FormLabel>
              <Text fontSize="sm" color={mutedColor}>
                Automatically play similar tracks when playlist ends
              </Text>
            </Box>
            <Switch colorScheme="brand" size="lg" />
          </FormControl>
        </SimpleGrid>
      </Box>
    </VStack>
  );
};