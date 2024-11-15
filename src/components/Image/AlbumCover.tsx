import {
  Box,
  Text,
  VStack,
  useColorModeValue,
  BoxProps,
  Spinner,
} from '@chakra-ui/react';
import { Disc, Music, CircleSlash2 } from 'lucide-react';
import { ResponsiveImage } from './ResponsiveImage';
import { useCoverArt } from '../../hooks/useCoverArt';
import { FALLBACK_IMAGES } from '../../utils/discogsApi';

interface AlbumCoverProps extends BoxProps {
  src?: string;
  alt: string;
  title: string;
  artist: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'vinyl' | 'cd' | 'generic';
  fetchFromDiscogs?: boolean;
  onError?: (title: string) => void;
}

export const AlbumCover = ({
  src,
  alt,
  title,
  artist,
  size = 'md',
  variant = 'vinyl',
  fetchFromDiscogs = true,
  onError,
  ...props
}: AlbumCoverProps) => {
  const bgColor = useColorModeValue('gray.100', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Only fetch from Discogs if no src is provided and fetchFromDiscogs is true
  const { coverUrl, loading, error } = useCoverArt(
    !src && fetchFromDiscogs ? artist : '', 
    !src && fetchFromDiscogs ? title : ''
  );

  const sizes = {
    sm: { box: '100px', icon: 24, fontSize: 'xs' },
    md: { box: '200px', icon: 32, fontSize: 'sm' },
    lg: { box: '300px', icon: 48, fontSize: 'md' },
  };

  const icons = {
    vinyl: Disc,
    cd: CircleSlash2,
    generic: Music,
  };

  const Icon = icons[variant];

  // Use the first available image source
  const imageSource = src || coverUrl || FALLBACK_IMAGES[variant.toUpperCase() as keyof typeof FALLBACK_IMAGES];

  if (loading) {
    return (
      <Box
        width={sizes[size].box}
        height={sizes[size].box}
        borderRadius="md"
        bg={bgColor}
        display="flex"
        alignItems="center"
        justifyContent="center"
        {...props}
      >
        <Spinner size="xl" color="brand.500" />
      </Box>
    );
  }

  return (
    <Box
      width={sizes[size].box}
      height={sizes[size].box}
      borderRadius="md"
      overflow="hidden"
      position="relative"
      boxShadow="md"
      {...props}
    >
      <ResponsiveImage
        src={imageSource}
        alt={alt}
        width="100%"
        height="100%"
        objectFit="cover"
        onError={() => {
          if (onError) {
            onError(title);
          }
        }}
        fallback={
          <VStack
            width="100%"
            height="100%"
            bg={bgColor}
            color={textColor}
            justify="center"
            align="center"
            spacing={2}
            p={4}
            borderWidth={1}
            borderColor={borderColor}
          >
            <Icon size={sizes[size].icon} />
            <VStack spacing={0}>
              <Text
                fontSize={sizes[size].fontSize}
                fontWeight="bold"
                textAlign="center"
                noOfLines={2}
              >
                {title}
              </Text>
              <Text fontSize={sizes[size].fontSize} textAlign="center" noOfLines={1}>
                {artist}
              </Text>
            </VStack>
          </VStack>
        }
      />
    </Box>
  );
};