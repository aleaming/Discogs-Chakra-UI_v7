import {
  Box,
  HStack,
  VStack,
  Text,
  Avatar,
  IconButton,
  Button,
  useColorModeValue,
  Divider,
  Wrap,
  WrapItem,
  Badge,
} from '@chakra-ui/react';
import {
  ThumbsUp,
  MessageSquare,
  MoreHorizontal,
  Edit2,
} from 'lucide-react';
import type { Comment } from './types';

interface CommentCardProps {
  comment: Comment;
  onReply?: () => void;
  onLike?: () => void;
  onEdit?: () => void;
  depth?: number;
}

export const CommentCard = ({
  comment,
  onReply,
  onLike,
  onEdit,
  depth = 0,
}: CommentCardProps) => {
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const replyBg = useColorModeValue('gray.50', 'gray.700');

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <VStack align="stretch" spacing={4}>
      <Box
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="lg"
        p={4}
        ml={depth * 4}
        bg={depth > 0 ? replyBg : 'inherit'}
      >
        <VStack align="stretch" spacing={3}>
          <HStack justify="space-between">
            <HStack spacing={3}>
              <Avatar
                size="sm"
                name={comment.author.name}
                src={comment.author.avatar}
              />
              <VStack spacing={0} align="start">
                <HStack>
                  <Text fontWeight="medium">{comment.author.name}</Text>
                  <Text fontSize="sm" color={mutedColor}>
                    • {comment.author.reputation} rep
                  </Text>
                </HStack>
                <Wrap spacing={1}>
                  {comment.author.badges.map((badge) => (
                    <WrapItem key={badge}>
                      <Badge
                        size="sm"
                        variant="subtle"
                        colorScheme="brand"
                        fontSize="xs"
                      >
                        {badge}
                      </Badge>
                    </WrapItem>
                  ))}
                </Wrap>
              </VStack>
            </HStack>
            <Text fontSize="sm" color={mutedColor}>
              {formatDate(comment.createdAt)}
              {comment.isEdited && ' (edited)'}
            </Text>
          </HStack>

          <Text>{comment.content}</Text>

          <HStack>
            <Button
              leftIcon={<ThumbsUp size={16} />}
              size="sm"
              variant="ghost"
              onClick={onLike}
            >
              {comment.likes}
            </Button>
            <Button
              leftIcon={<MessageSquare size={16} />}
              size="sm"
              variant="ghost"
              onClick={onReply}
            >
              Reply
            </Button>
            <Button
              leftIcon={<Edit2 size={16} />}
              size="sm"
              variant="ghost"
              onClick={onEdit}
            >
              Edit
            </Button>
            <IconButton
              icon={<MoreHorizontal size={16} />}
              aria-label="More options"
              size="sm"
              variant="ghost"
            />
          </HStack>
        </VStack>
      </Box>

      {comment.replies && comment.replies.length > 0 && (
        <VStack align="stretch" spacing={4} pl={4}>
          {comment.replies.map((reply) => (
            <CommentCard
              key={reply.id}
              comment={reply}
              onReply={onReply}
              onLike={onLike}
              onEdit={onEdit}
              depth={depth + 1}
            />
          ))}
        </VStack>
      )}
    </VStack>
  );
};