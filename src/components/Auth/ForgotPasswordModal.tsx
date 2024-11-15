import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export const ForgotPasswordModal = ({
  isOpen,
  onClose,
  onSwitchToLogin,
}: ForgotPasswordModalProps) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const { resetPassword } = useAuth();
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      await resetPassword(email);
      toast({
        title: 'Password reset email sent',
        description: 'Check your inbox for further instructions',
        status: 'success',
        duration: 5000,
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Please try again',
        status: 'error',
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent bg={bgColor}>
        <ModalHeader>Reset Password</ModalHeader>
        <ModalCloseButton />

        <ModalBody pb={6}>
          <VStack spacing={4} as="form" onSubmit={handleSubmit}>
            <Text fontSize="sm" color="gray.500">
              Enter your email address and we'll send you instructions to reset your
              password.
            </Text>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormControl>

            <Button
              w="full"
              colorScheme="brand"
              type="submit"
              isLoading={loading}
            >
              Send Reset Link
            </Button>

            <Button
              variant="link"
              colorScheme="brand"
              onClick={onSwitchToLogin}
              size="sm"
            >
              Back to Sign In
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};