import { HStack, Input, Button, useColorModeValue } from '@chakra-ui/react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const colorInvert = useColorModeValue('black', 'white');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const menuBgColor = useColorModeValue('gray.50', 'gray.700');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements.namedItem('search') as HTMLInputElement;
    onSearch(input.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <HStack spacing={0} w="full" maxW="800px" mx="auto" p={4}>
        <Input
          name="search"
          placeholder="Search..."
          size="lg"
          variant="filled"
          borderTopLeftRadius="full"
          borderBottomLeftRadius="full"
          border="1px"
          borderColor={borderColor}
          _dark={{ bg: 'gray.800' }}
          _light={{ bg: menuBgColor }}
          _focus={{
            borderColor: borderColor,
            bg: bgColor,
          }}
          _hover={{
            borderColor: borderColor,
            bg: bgColor,
          }}
        />
        <Button
          type="submit"
          size="lg"
          colorScheme="brand"
          borderTopRightRadius="full"
          borderBottomRightRadius="full"
          pl="5"
          pr="4"
          leftIcon={<Search size={20} />}
        ></Button>
      </HStack>
    </form>
  );
};