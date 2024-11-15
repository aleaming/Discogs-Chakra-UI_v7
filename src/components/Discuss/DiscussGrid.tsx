import {
  Container,
  SimpleGrid,
  VStack,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
  InputGroup,
  InputLeftElement,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  Search,
  TrendingUp,
  Clock,
  MessageSquare,
  Eye,
  ChevronDown,
  Plus,
} from 'lucide-react';
import { ThreadCard } from './ThreadCard';
import { CommentCard } from './CommentCard';
import { mockThreads, mockComments } from '../../data/discussData';
import { useState } from 'react';
import type { Thread, Category } from './types';

export const DiscussGrid = () => {
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'commented'>('recent');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const categories: { value: Category | 'all'; label: string }[] = [
    { value: 'all', label: 'All Categories' },
    { value: 'general', label: 'General Discussion' },
    { value: 'albums', label: 'Albums' },
    { value: 'tours', label: 'Tours & Events' },
    { value: 'news', label: 'News & Announcements' },
    { value: 'gear', label: 'Gear & Production' },
    { value: 'help', label: 'Help & Support' },
  ];

  const filteredThreads = mockThreads
    .filter(
      (thread) => activeCategory === 'all' || thread.category === activeCategory
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'popular':
          return b.likes - a.likes;
        case 'commented':
          return b.commentCount - a.commentCount;
        default:
          return 0;
      }
    });

  const handleThreadClick = (thread: Thread) => {
    setSelectedThread(thread);
    onOpen();
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={6} align="stretch">
        <HStack justify="space-between" wrap="wrap" spacing={4}>
          <InputGroup maxW="400px">
            <InputLeftElement>
              <Search size={20} />
            </InputLeftElement>
            <Input placeholder="Search discussions..." />
          </InputGroup>

          <HStack spacing={4}>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDown />}>
                Sort by
              </MenuButton>
              <MenuList>
                <MenuItem
                  icon={<Clock size={16} />}
                  onClick={() => setSortBy('recent')}
                >
                  Most Recent
                </MenuItem>
                <MenuItem
                  icon={<TrendingUp size={16} />}
                  onClick={() => setSortBy('popular')}
                >
                  Most Popular
                </MenuItem>
                <MenuItem
                  icon={<MessageSquare size={16} />}
                  onClick={() => setSortBy('commented')}
                >
                  Most Commented
                </MenuItem>
              </MenuList>
            </Menu>
            <Button
              leftIcon={<Plus size={16} />}
              colorScheme="brand"
              onClick={() => console.log('New thread')}
            >
              New Discussion
            </Button>
          </HStack>
        </HStack>

        <Tabs>
          <TabList>
            {categories.map((category) => (
              <Tab
                key={category.value}
                onClick={() => setActiveCategory(category.value)}
              >
                {category.label}
              </Tab>
            ))}
          </TabList>

          <TabPanels>
            <TabPanel p={0} pt={6}>
              <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
                {filteredThreads.map((thread) => (
                  <ThreadCard
                    key={thread.id}
                    thread={thread}
                    onClick={() => handleThreadClick(thread)}
                  />
                ))}
              </SimpleGrid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose} size="4xl" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontSize="2xl">{selectedThread?.title}</Text>
            <Text fontSize="sm" color="gray.500" mt={1}>
              Started by {selectedThread?.author.name} •{' '}
              {new Date(selectedThread?.createdAt || '').toLocaleDateString()}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack align="stretch" spacing={6}>
              <Text>{selectedThread?.content}</Text>

              <HStack spacing={4} color="gray.500">
                <HStack>
                  <Eye size={16} />
                  <Text>{selectedThread?.viewCount} views</Text>
                </HStack>
                <HStack>
                  <MessageSquare size={16} />
                  <Text>{selectedThread?.commentCount} comments</Text>
                </HStack>
              </HStack>

              <Button
                leftIcon={<MessageSquare size={16} />}
                colorScheme="brand"
                alignSelf="start"
              >
                Add Comment
              </Button>

              <VStack align="stretch" spacing={6}>
                {selectedThread &&
                  mockComments[selectedThread.id]?.map((comment) => (
                    <CommentCard
                      key={comment.id}
                      comment={comment}
                      onReply={() => console.log('Reply to:', comment.id)}
                      onLike={() => console.log('Like:', comment.id)}
                      onEdit={() => console.log('Edit:', comment.id)}
                    />
                  ))}
              </VStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};