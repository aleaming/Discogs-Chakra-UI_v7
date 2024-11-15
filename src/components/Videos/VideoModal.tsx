import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  AspectRatio,
  Box,
} from '@chakra-ui/react';
import type { Video } from './types';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: Video | null;
}

export const VideoModal = ({ isOpen, onClose, video }: VideoModalProps) => {
  if (!video) return null;

  const getEmbedUrl = (video: Video) => {
    if (video.source.platform === 'youtube') {
      return `https://www.youtube.com/embed/${video.source.id}?autoplay=1`;
    }
    if (video.source.platform === 'vimeo') {
      return `https://player.vimeo.com/video/${video.source.id}?autoplay=1`;
    }
    return '';
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl" isCentered>
      <ModalOverlay />
      <ModalContent bg="black">
        <ModalHeader color="white">{video.title}</ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody p={0}>
          <AspectRatio ratio={16 / 9}>
            <Box
              as="iframe"
              src={getEmbedUrl(video)}
              allowFullScreen
              border="none"
            />
          </AspectRatio>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};