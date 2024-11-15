import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Image,
  useColorModeValue,
  Tag,
  Wrap,
  WrapItem,
  AspectRatio,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Collapse,
  Badge,
} from '@chakra-ui/react';
import { Play, Heart, Share2, UserPlus, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';
import { ArtistHeroProps } from './types';
import { useState, useEffect } from 'react';

export const ArtistHero = ({
  name,
  image,
  coverImage,
  monthlyListeners,
  genres = [],
  description,
  isVerified = false,
  isCompact = false,
  selectedTab = 0,
  onPlay,
  onFollow,
  onShare,
}: ArtistHeroProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const bgOverlay = useColorModeValue(
    'linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,1))',
    'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,1))'
  );

  const textColor = useColorModeValue('gray.800', 'white');
  const subTextColor = useColorModeValue('gray.600', 'gray.300');

  const shouldShowExtra = !isCompact || isExpanded;

  // Reset to compact view when tab changes
  useEffect(() => {
    if (isCompact && isExpanded) {
      setIsExpanded(false);
    }
  }, [selectedTab, isCompact]);

  return (
    <Box position="relative" width="full" overflow="hidden">
      <Container maxW="container.full" position="relative" zIndex={1} px="0">
        <HStack
          spacing={6}
          align="start"
          px={0}
          paddingBottom="8"
          flexDirection={{ base: 'column', md: 'row' }}
          width="100%"
          transition="all 0.3s ease-in-out"
        >
          <Box
            borderBottomRightRadius="48px"
            overflow="hidden"
            boxShadow="xl"
            width={{ base: '100%', md: isCompact && !isExpanded ? '30%' : '50%' }}
            mb={{ base: 4, md: 0 }}
            transition="all 0.3s ease-in-out"
          >
            <AspectRatio ratio={{ base: 16 / 9, md: 4 / 3 }}>
              <Image
                src={image}
                alt={name}
                width="100%"
                height="100%"
                objectFit="cover"
                transition="all 0.3s ease-in-out"
              />
            </AspectRatio>
          </Box>

          <VStack
            align="start"
            spacing={4}
            width={{ base: '100%', md: isCompact && !isExpanded ? '70%' : '50%' }}
            py={{ base: 1, md: isCompact && !isExpanded ? 4 : 8, lg: isCompact && !isExpanded ? 8 : 16 }}
            paddingRight={{ base: 6, md: 12 }}
            paddingLeft={{ base: 6, md: 0 }}
            transition="all 0.3s ease-in-out"
          >
            <HStack verticalAlign="middle" spacing={3}>
              <Heading
                as="h1"
                size={isCompact && !isExpanded ? 'xl' : '2xl'}
                color={textColor}
                fontWeight="bold"
                transition="all 0.3s ease-in-out"
              >
                {name}
              </Heading>
              {isVerified && (
                <Badge colorScheme="brand" display="flex" alignItems="center" px={2} py={1}>
                  <CheckCircle size={14} style={{ marginRight: '4px' }} />
                  Verified Artist
                </Badge>
              )}
              <Tag size="sm" colorScheme="yellow" verticalAlign="middle">
                [a1289]
              </Tag>
            </HStack>

            <Wrap spacing={2}>
              {genres.map((genre) => (
                <WrapItem key={genre}>
                  <Tag size="sm" variant="subtle" colorScheme="gray">
                    {genre}
                  </Tag>
                </WrapItem>
              ))}
            </Wrap>

            <Accordion
              defaultIndex={isCompact && !isExpanded ? [] : [0]}
              allowMultiple
              width="100%"
            >
              <AccordionItem borderTop="none" borderBottom="none">
                <AccordionButton px="0" py="1">
                  <Box as="span" flex="1" textAlign="left">
                    Profile
                  </Box>
                  <AccordionIcon />
                </AccordionButton>

                <AccordionPanel pb={4} px="0">
                  <Text
                    color={subTextColor}
                    fontSize="sm"
                    maxWidth="800px"
                    lineHeight="tall"
                    noOfLines={isCompact && !isExpanded ? 3 : undefined}
                  >
                    {description}
                  </Text>
                </AccordionPanel>
              </AccordionItem>

              <Collapse in={shouldShowExtra} animateOpacity>
                <AccordionItem borderTop="none" borderBottom="none">
                  <AccordionButton px="0" py="1">
                    <Box as="span" flex="1" textAlign="left">
                      Sites
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>

                  <AccordionPanel pb={4} px="0">
                    <Text
                      color={subTextColor}
                      fontSize="sm"
                      maxWidth="800px"
                      lineHeight="tall"
                    >
                      Wikipedia, Imdb, Lastfm, and other links
                    </Text>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem borderTop="none" borderBottom="none">
                  <AccordionButton px="0" py="1">
                    <Box as="span" flex="1" textAlign="left">
                      Aliases
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>

                  <AccordionPanel pb={4} px="0">
                    <Text
                      color={subTextColor}
                      fontSize="sm"
                      maxWidth="800px"
                      lineHeight="tall"
                    >
                      Wikipedia, Imdb, Lastfm, and other links
                    </Text>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem borderTop="none" borderBottom="none">
                  <AccordionButton px="0" py="1">
                    <Box as="span" flex="1" textAlign="left">
                      Members
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>

                  <AccordionPanel pb={4} px="0">
                    <Text
                      color={subTextColor}
                      fontSize="sm"
                      maxWidth="800px"
                      lineHeight="tall"
                    >
                      Wikipedia, Imdb, Lastfm, and other links
                    </Text>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem borderTop="none" borderBottom="none">
                  <AccordionButton px="0" py="1">
                    <Box as="span" flex="1" textAlign="left">
                      Variations
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>

                  <AccordionPanel pb={4} px="0">
                    <Text
                      color={subTextColor}
                      fontSize="sm"
                      maxWidth="800px"
                      lineHeight="tall"
                    >
                      Wikipedia, Imdb, Lastfm, and other links
                    </Text>
                  </AccordionPanel>
                </AccordionItem>
              </Collapse>
            </Accordion>

            <HStack spacing={4} pt={4}>
              {(!isCompact || isExpanded) && (
                <>
                  <Button
                    leftIcon={<Play size={20} />}
                    colorScheme="brand"
                    size={isCompact && !isExpanded ? 'sm' : 'md'}
                    onClick={onPlay}
                    aria-label="Play artist's popular tracks"
                  >
                    Play
                  </Button>
                  <Button
                    leftIcon={<UserPlus size={20} />}
                    variant="outline"
                    colorScheme="brand"
                    size={isCompact && !isExpanded ? 'sm' : 'md'}
                    onClick={onFollow}
                    aria-label="Follow artist"
                  >
                    Follow
                  </Button>
                  <Button
                    icon={<Share2 size={20} />}
                    variant="ghost"
                    colorScheme="brand"
                    size={isCompact && !isExpanded ? 'sm' : 'md'}
                    onClick={onShare}
                    aria-label="Share artist"
                  >
                    <Share2 />
                  </Button>
                </>
              )}
              {isCompact && (
                <Button
                  rightIcon={isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? 'View Less' : 'View More'}
                </Button>
              )}
            </HStack>
          </VStack>
        </HStack>
      </Container>
    </Box>
  );
};