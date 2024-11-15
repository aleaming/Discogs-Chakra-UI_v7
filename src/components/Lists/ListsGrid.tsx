import {
  SimpleGrid,
  Box,
  Container,
  HStack,
  Heading,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
} from '@chakra-ui/react';
import { ChevronDown, TrendingUp, Clock, Star } from 'lucide-react';
import { ListCard } from './ListCard';

const mockLists = [
  {
    id: '1',
    title: 'French Electronic Music Artists',
    creator: {
      name: 'psyance_QL',
      avatar: 'https://i.pravatar.cc/150?u=psyance_QL',
    },
    description: 'A curated collection of the best French electronic music artists, from pioneers to modern innovators.',
    itemCount: 42,
    likes: 1234,
    coverImages: [
      'https://i.discogs.com/zFVZE4s0zSXUIM7OMl2UDckSq0zlopdHBHRz23zqMJk/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQ1NzAz/NjYtMTUzOTI5NTA5/Mi02MDg3LnBuZw.jpeg',
      'https://i.discogs.com/6gMPje3DUKa1LMojsHtGTE5o4fIQon5lYaIJvALlvVM/rs:fit/g:sm/q:90/h:600/w:592/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI4Nzkt/MTIzNjAzNTQ3Mi5q/cGVn.jpeg',
      'https://i.discogs.com/Tgzu71VlahJ9X8cu0eaqutNNlPWJOqelug4Czwwa6BM/rs:fit/g:sm/q:90/h:600/w:589/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI5NDc2/NTUtMTY3MDAwMjM2/NC01MjE4LmpwZWc.jpeg',
      'https://i.discogs.com/FEWXTwkcL0-QDeeH_uXA7HwRqjXBujz-6Mic0gx6Ds8/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQxNzY4/Ni0xMzQ3NTc0NzU3/LTgwNDguanBlZw.jpeg',
    ],
  },
  {
    id: '2',
    title: 'Favorite Composers',
    creator: {
      name: 'psyance_QL',
    },
    description: 'My personal collection of favorite classical and contemporary composers.',
    itemCount: 28,
    likes: 856,
    coverImages: [
      'https://i.discogs.com/3z9ppYLGHqhSzWWAw2FrUxxCAgA-dn_vOpvNEwGX6xc/rs:fit/g:sm/q:90/h:523/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTExNDEx/MjMtMTE5NTgyMzE2/My5qcGVn.jpeg',
      'https://i.discogs.com/Ie-ZAT_Lbvc1dGud11MDw3RKO65NQrzPKkBvqVVk7Hg/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTgwODk5/NDctMTQ1NTM2MDIz/OC0zNDgwLmpwZWc.jpeg',
      'https://i.discogs.com/Q8J5LXD_MqyGZHmLGQwLEwE8vJchs4tWB_KqFM-dKVE/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTU2NzE4/OTAtMTUwMDMwNzE1/OS05ODk4LmpwZWc.jpeg',
      'https://i.discogs.com/05Lpu5qKFGNpuIqA1fztJdlAyiciD7P_63QJtxhdliw/rs:fit/g:sm/q:90/h:382/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTEyODkt/MTYyMDQ3MTUxMS0z/NDIwLmpwZWc.jpeg',
    ],
  },
];

export const ListsGrid = () => {
  const buttonHoverBg = useColorModeValue('gray.100', 'gray.700');

  return (
    <Container maxW="container.xl" py={8}>
      <HStack mb={8} justify="space-between" wrap="wrap" spacing={4}>
        <Heading size="lg">Lists</Heading>
        <HStack spacing={4}>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDown />}
              variant="ghost"
              _hover={{ bg: buttonHoverBg }}
            >
              Sort by
            </MenuButton>
            <MenuList>
              <MenuItem icon={<TrendingUp size={16} />}>Most Popular</MenuItem>
              <MenuItem icon={<Clock size={16} />}>Recently Added</MenuItem>
              <MenuItem icon={<Star size={16} />}>Highest Rated</MenuItem>
            </MenuList>
          </Menu>
          <Button colorScheme="brand">Create List</Button>
        </HStack>
      </HStack>

      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
        spacing={6}
        pb={8}
      >
        {mockLists.map((list) => (
          <ListCard
            key={list.id}
            {...list}
            onLike={() => console.log('Liked:', list.title)}
            onShare={() => console.log('Shared:', list.title)}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
};