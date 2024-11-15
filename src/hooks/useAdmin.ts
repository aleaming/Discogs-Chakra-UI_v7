import { useState, useEffect } from 'react';
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../config/firebase';

interface AdminUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: 'admin' | 'moderator' | 'user';
  isBanned: boolean;
  createdAt: string;
  lastLogin: string;
}

export const useAdmin = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, 'users');
        const querySnapshot = await getDocs(usersRef);
        const fetchedUsers = querySnapshot.docs.map(doc => ({
          uid: doc.id,
          ...doc.data()
        })) as AdminUser[];
        setUsers(fetchedUsers);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const updateUserRole = async (userId: string, role: string) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, { role });
      setUsers(users.map(user => 
        user.uid === userId ? { ...user, role: role as AdminUser['role'] } : user
      ));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update role');
    }
  };

  const banUser = async (userId: string) => {
    try {
      const userRef = doc(db, 'users', userId);
      const user = users.find(u => u.uid === userId);
      const newBanStatus = !user?.isBanned;
      await updateDoc(userRef, { isBanned: newBanStatus });
      setUsers(users.map(user => 
        user.uid === userId ? { ...user, isBanned: newBanStatus } : user
      ));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to ban user');
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      const userRef = doc(db, 'users', userId);
      await deleteDoc(userRef);
      setUsers(users.filter(user => user.uid !== userId));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete user');
    }
  };

  return {
    users,
    loading,
    error,
    updateUserRole,
    banUser,
    deleteUser,
  };
};