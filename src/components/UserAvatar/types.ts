export interface UserAvatarProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  onClick?: () => void;
}