export interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export interface SettingsSection {
  id: string;
  label: string;
  icon: React.ComponentType;
  description?: string;
}