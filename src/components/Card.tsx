import { Box, Image, Text, VStack, Button } from '@chakra-ui/react';
import { ArrowRight } from 'lucide-react';

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  onLearnMore: () => void;
}

export const Card = ({ title, description, imageUrl, onLearnMore }: CardProps) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      transition="all 0.2s"
      _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
    >
      <Image
        src={imageUrl}
        alt={title}
        h="200px"
        w="full"
        objectFit="cover"
      />
      <VStack p={6} align="start" spacing={4}>
        <Text fontSize="xl" fontWeight="bold">
          {title}
        </Text>
        <Text color="gray.600">
          {description}
        </Text>
        <Button
          rightIcon={<ArrowRight size={16} />}
          colorScheme="brand"
          onClick={onLearnMore}
        >
          Learn More
        </Button>
      </VStack>
    </Box>
  );
};