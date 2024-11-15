import {
  Image as ChakraImage,
  ImageProps as ChakraImageProps,
  Box,
  Text,
  Center,
  useColorModeValue,
} from '@chakra-ui/react';
import { Disc } from 'lucide-react';
import { useState } from 'react';

interface ResponsiveImageProps extends Omit<ChakraImageProps, 'fallback'> {
  fallbackText?: string;
  onError?: () => void;
}

export const ResponsiveImage = ({
  src,
  alt,
  fallbackText,
  onError,
  ...props
}: ResponsiveImageProps) => {
  const [hasError, setHasError] = useState(false);
  const bgColor = useColorModeValue('gray.100', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.400');

  const handleError = () => {
    setHasError(true);
    if (onError) {
      onError();
    }
  };

  if (!src || hasError) {
    return (
      <Center
        bg={bgColor}
        borderRadius={props.borderRadius || 'md'}
        height={props.height || props.boxSize || '100%'}
        width={props.width || props.boxSize || '100%'}
        p={4}
      >
        <Box textAlign="center">
          <Disc size={32} color={textColor} style={{ margin: '0 auto 8px' }} />
          <Text fontSize="sm" color={textColor}>
            {fallbackText || 'No image available'}
          </Text>
        </Box>
      </Center>
    );
  }

  return (
    <ChakraImage
      src={src}
      alt={alt}
      onError={handleError}
      fallback={
        <Center
          bg={bgColor}
          borderRadius={props.borderRadius || 'md'}
          height={props.height || props.boxSize || '100%'}
          width={props.width || props.boxSize || '100%'}
          p={4}
        >
          <Box textAlign="center">
            <Disc size={32} color={textColor} style={{ margin: '0 auto 8px' }} />
            <Text fontSize="sm" color={textColor}>
              Loading...
            </Text>
          </Box>
        </Center>
      }
      {...props}
    />
  );
};