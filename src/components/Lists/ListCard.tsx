import {
  Box,
  HStack,
  VStack,
  Text,
  Image,
  Link,
  useColorModeValue,
  Icon,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { Heart, MoreHorizontal, Share2, User2, ListMusic } from 'lucide-react';

interface ListCardProps {
  title: string;
  creator: {
    name: string;
    avatar?: string;
  };
  description?: string;
  itemCount: number;
  likes: number;
  coverImages: string[];
  onLike?: () => void;
  onShare?: () => void;
}

export const ListCard = ({
  title,
  creator,
  description,
  itemCount,
  likes,
  coverImages,
  onLike,
  onShare,
}: ListCardProps) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');

  return (
    <Box
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      bg={cardBg}
      overflow="hidden"
      transition="all 0.2s"
      _hover={{
        transform: 'translateY(-4px)',
        shadow: 'lg',
        borderColor: 'brand.500',
      }}
    >
      <Box position="relative" height="160px">
        <Flex wrap="wrap" height="100%">
          {coverImages.slice(0, 4).map((image, index) => (
            <Box
              key={index}
              width="50%"
              height="50%"
              overflow="hidden"
              borderWidth={index > 0 ? '0 0 0 1px' : '0'}
              borderColor={borderColor}
            >
              <Image
                src={image}
                alt={`Cover ${index + 1}`}
                width="100%"
                height="100%"
                objectFit="cover"
                transition="transform 0.3s"
                _hover={{ transform: 'scale(1.1)' }}
              />
            </Box>
          ))}
        </Flex>
      </Box>

      <VStack p={4} align="stretch" spacing={3}>
        <HStack justify="space-between">
          <Text
            fontSize="lg"
            fontWeight="bold"
            noOfLines={1}
            _hover={{ color: 'brand.500' }}
          >
            <Link>{title}</Link>
          </Text>
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<MoreHorizontal size={16} />}
              variant="ghost"
              size="sm"
              aria-label="More options"
            />
            <MenuList>
              <MenuItem icon={<Share2 size={16} />} onClick={onShare}>
                Share
              </MenuItem>
              <MenuItem icon={<ListMusic size={16} />}>Add to My Lists</MenuItem>
            </MenuList>
          </Menu>
        </HStack>

        <HStack fontSize="sm" color={textColor} spacing={4}>
          <HStack>
            {creator.avatar ? (
              <Image
                src={creator.avatar}
                alt={creator.name}
                boxSize="20px"
                borderRadius="full"
              />
            ) : (
              <Icon as={User2} boxSize={4} />
            )}
            <Link>{creator.name}</Link>
          </HStack>
          <Text>{itemCount} items</Text>
        </HStack>

        {description && (
          <Text fontSize="sm" color={textColor} noOfLines={2}>
            {description}
          </Text>
        )}

        <HStack pt={2}>
          <IconButton
            icon={<Heart size={16} />}
            aria-label="Like list"
            variant="ghost"
            size="sm"
            onClick={onLike}
            _hover={{ bg: hoverBg }}
          />
          <Text fontSize="sm" color={textColor}>
            {likes}
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
};