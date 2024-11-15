import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Add a custom hook to check if user is admin
export const useIsAdmin = () => {
  const { user } = useAuth();
  return user?.role === 'admin';
};