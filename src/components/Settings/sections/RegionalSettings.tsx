import {
  VStack,
  Text,
  Box,
  Divider,
  FormControl,
  FormLabel,
  Select,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';

export const RegionalSettings = () => {
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <VStack spacing={8} align="start" maxW="800px" w="full">
      <Box w="full">
        <Text fontSize="2xl" fontWeight="bold" mb={6}>
          Regional Settings
        </Text>
        <Divider mb={6} />

        <SimpleGrid columns={1} spacing={6}>
          <FormControl>
            <FormLabel>Language</FormLabel>
            <Text fontSize="sm" color={mutedColor} mb={2}>
              Select your preferred language
            </Text>
            <Select maxW="400px" defaultValue="en">
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="it">Italiano</option>
              <option value="ja">日本語</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Currency</FormLabel>
            <Text fontSize="sm" color={mutedColor} mb={2}>
              Choose your preferred currency for prices
            </Text>
            <Select maxW="400px" defaultValue="usd">
              <option value="usd">USD - US Dollar</option>
              <option value="eur">EUR - Euro</option>
              <option value="gbp">GBP - British Pound</option>
              <option value="jpy">JPY - Japanese Yen</option>
              <option value="aud">AUD - Australian Dollar</option>
              <option value="cad">CAD - Canadian Dollar</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Time Zone</FormLabel>
            <Text fontSize="sm" color={mutedColor} mb={2}>
              Set your local time zone
            </Text>
            <Select maxW="400px" defaultValue="utc">
              <option value="utc">UTC - Universal Time Coordinated</option>
              <option value="est">EST - Eastern Standard Time</option>
              <option value="pst">PST - Pacific Standard Time</option>
              <option value="gmt">GMT - Greenwich Mean Time</option>
              <option value="cet">CET - Central European Time</option>
              <option value="jst">JST - Japan Standard Time</option>
            </Select>
          </FormControl>
        </SimpleGrid>
      </Box>
    </VStack>
  );
};