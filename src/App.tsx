import {
  ChakraProvider,
  Container,
  SimpleGrid,
  VStack,
  Heading,
  Divider,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  Text,
  Flex,
  Spacer,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Wrap,
  WrapItem,
  HStack,
  Box,
  useColorModeValue,
  ButtonGroup,
  Fade,
  Center,
  Icon,
  useColorMode,
} from '@chakra-ui/react';
import ReleaseAlbumBlock from './components/ReleaseAlbumBlock';
import MarketplaceAlbumBlock from './components/MarketplaceAlbumBlock';
import { ArtistHero } from './components/ArtistHero';
import { Navigation } from './components/Navigation';
import { FilterDrawer } from './components/FilterDrawer';
import MarketplaceResults from './components/MarketplaceResults';
import { DiscographyGridView } from './components/AlbumGrid';
import { ListsGrid } from './components/Lists';
import { CartProvider } from './contexts/CartContext';
import { ReviewsGrid } from './components/Reviews';
import { VideosGrid } from './components/Videos';
import { TourGrid } from './components/Tour';
import { DiscussGrid } from './components/Discuss';
import { FeaturedMarketplace } from './components/FeaturedMarketplace';
import { discography } from './data/discography';
import theme from './theme';
import { useState } from 'react';
import { MarketplaceAll } from './components/MarketplaceAll';

const App = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isShopTabActive, setIsShopTabActive] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const artistData = {
    name: 'Daft Punk',
    image:
      'https://i.discogs.com/sP_wDoC5MsG9lZUfb9thLbpmMmL__nuVnGMNpwgjirE/rs:fit/g:sm/q:90/h:438/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTEyODkt/MTYxNTQ4NDUyOS00/Mjg0LmpwZWc.jpeg',
    coverImage:
      'https://i.discogs.com/05Lpu5qKFGNpuIqA1fztJdlAyiciD7P_63QJtxhdliw/rs:fit/g:sm/q:90/h:382/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTEyODkt/MTYyMDQ3MTUxMS0z/NDIwLmpwZWc.jpeg',
    monthlyListeners: 1234567,
    genres: ['Electronic', 'Contemporary', 'Orchestral', 'Ambient'],
    description:
      "Daft Punk were a French electronic music duo formed in 1993 by Thomas Bangalter (born January 3, 1975) and Guy-Manuel de Homem-Christo (born February 8, 1974). Bangalter and de Homem-Christo were previously in the rock band Darlin' with Laurent Brancowitz. After Brancowitz left the group to join his brother's band, Phoenix, the remaining duo formed Daft Punk. On February 22, 2021, it was announced that they had disbanded for unknown reasons.",
    isVerified: true,
  };

  const handleTabChange = (index: number) => {
    setSelectedTab(index);
    if (index === 7) {
      setIsShopTabActive(true);
      setTimeout(() => setIsShopTabActive(false), 200);
    }
  };

  const handleViewAll = () => {
    handleTabChange(7); // Switch to Shop All tab (index 7)
  };

  return (
    <ChakraProvider theme={theme}>
      <CartProvider>
        <Navigation onSectionChange={setActiveSection} />

        {activeSection === 'marketplace' ? (
          <MarketplaceAll />
        ) : (
          <VStack spacing={0} w="full">
            <Wrap
              w="full"
              py="4"
              _dark={{ bg: 'var(--chakra-colors-gray-900)' }}
              _light={{ bg: 'gray.25' }}
            >
              <Container maxW="container.xl">
                <Breadcrumb fontWeight="medium" fontSize="sm">
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Home</BreadcrumbLink>
                  </BreadcrumbItem>

                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">About</BreadcrumbLink>
                  </BreadcrumbItem>

                  <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink href="#">Current</BreadcrumbLink>
                  </BreadcrumbItem>
                </Breadcrumb>
              </Container>
            </Wrap>
            <ArtistHero
              {...artistData}
              onPlay={() => console.log('Play clicked')}
              onFollow={() => console.log('Follow clicked')}
              onShare={() => console.log('Share clicked')}
              isCompact={selectedTab !== 0}
              selectedTab={selectedTab}
            />
          </VStack>
        )}

        <Tabs
          variant="enclosed"
          width="full"
          px={4}
          onChange={handleTabChange}
          index={selectedTab}
        >
          <Container maxW="container.xl" px={0}>
            <TabList
              overflowX={{ base: 'scroll', md: 'auto' }}
              whiteSpace={{ base: 'nowrap', md: 'normal' }}
              display="flex"
              gap={2}
            >
              {['Featured', 'Discography', 'Reviews', 'Videos', 'Lists', 'Tour', 'Discuss'].map((tab) => (
                <Tab
                  key={tab}
                  _selected={{
                    color: 'white',
                    bg: 'gray.800',
                    fontWeight: 'semibold',
                  }}
                >
                  {tab}
                </Tab>
              ))}
              <Spacer />
              <Tab
                bg="teal.500"
                color="white"
                _hover={{
                  background: 'gray.800',
                  color: 'white',
                }}
                transform={isShopTabActive ? 'scale(0.95)' : 'scale(1)'}
                transition="transform 0.2s"
              >
                Shop All Daft Punk
              </Tab>
            </TabList>
          </Container>
          <TabPanels>
            <TabPanel
              _dark={{ bg: 'var(--chakra-colors-gray-800)' }}
              _light={{ bg: 'white' }}
            >
              <Container maxW="container.xl" py={4} px="0">
                <Box w="full">
                  <Heading size="lg" mb={6}>Most Collected Albums</Heading>
                  <HStack spacing={6} overflowX="auto" pb={4} w="full">
                    {discography.slice(0, 4).map((album, index) => (
                      <Box key={index} minW="300px">
                        <ReleaseAlbumBlock
                          title={album.title}
                          artist="Daft Punk"
                          price={album.versionsList[0]?.price?.replace('$', '') || '0.00'}
                          image={album.artwork}
                          label={album.versionsList[0]?.label}
                          releaseYear={album.releaseYear}
                        />
                      </Box>
                    ))}
                  </HStack>
                </Box>

                <FeaturedMarketplace onViewAll={handleViewAll} />
              </Container>
            </TabPanel>

            <TabPanel
              _dark={{ bg: 'var(--chakra-colors-gray-800)' }}
              _light={{ bg: 'white' }}
            >
              <Container maxW="container.xl" py={4} px="0">
                <DiscographyGridView />
              </Container>
            </TabPanel>

            <TabPanel
              _dark={{ bg: 'var(--chakra-colors-gray-800)' }}
              _light={{ bg: 'white' }}
            >
              <ReviewsGrid />
            </TabPanel>

            <TabPanel
              _dark={{ bg: 'var(--chakra-colors-gray-800)' }}
              _light={{ bg: 'white' }}
            >
              <VideosGrid />
            </TabPanel>

            <TabPanel
              _dark={{ bg: 'var(--chakra-colors-gray-800)' }}
              _light={{ bg: 'white' }}
            >
              <Container maxW="container.xl" py={4} px="0">
                <ListsGrid />
              </Container>
            </TabPanel>

            <TabPanel
              _dark={{ bg: 'var(--chakra-colors-gray-800)' }}
              _light={{ bg: 'white' }}
            >
              <TourGrid />
            </TabPanel>

            <TabPanel
              _dark={{ bg: 'var(--chakra-colors-gray-800)' }}
              _light={{ bg: 'white' }}
            >
              <DiscussGrid />
            </TabPanel>

            <TabPanel
              _dark={{ bg: 'var(--chakra-colors-gray-800)' }}
              _light={{ bg: 'white' }}
            >
              <Container maxW="container.xl" py={4} px="0">
                <MarketplaceResults />
              </Container>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </CartProvider>
    </ChakraProvider>
  );
};

export default App;