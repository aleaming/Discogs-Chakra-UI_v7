import { useDisclosure } from '@chakra-ui/react';
import { LoginModal } from './LoginModal';
import { SignupModal } from './SignupModal';
import { ForgotPasswordModal } from './ForgotPasswordModal';

interface AuthModalsProps {
  isLoginOpen: boolean;
  onLoginClose: () => void;
}

export const AuthModals = ({ isLoginOpen, onLoginClose }: AuthModalsProps) => {
  const {
    isOpen: isSignupOpen,
    onOpen: onSignupOpen,
    onClose: onSignupClose,
  } = useDisclosure();

  const {
    isOpen: isForgotPasswordOpen,
    onOpen: onForgotPasswordOpen,
    onClose: onForgotPasswordClose,
  } = useDisclosure();

  const handleSwitchToSignup = () => {
    onLoginClose();
    onSignupOpen();
  };

  const handleSwitchToLogin = () => {
    onSignupClose();
    onForgotPasswordClose();
    onLoginClose();
    setTimeout(() => {
      onLoginClose();
    }, 100);
  };

  const handleForgotPassword = () => {
    onLoginClose();
    onForgotPasswordOpen();
  };

  return (
    <>
      <LoginModal
        isOpen={isLoginOpen}
        onClose={onLoginClose}
        onSwitchToSignup={handleSwitchToSignup}
        onForgotPassword={handleForgotPassword}
      />

      <SignupModal
        isOpen={isSignupOpen}
        onClose={onSignupClose}
        onSwitchToLogin={handleSwitchToLogin}
      />

      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        onClose={onForgotPasswordClose}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </>
  );
};