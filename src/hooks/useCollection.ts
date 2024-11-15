import { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { CollectionItem } from '../components/Collection/types';

export const useCollection = (userId: string) => {
  const [items, setItems] = useState<CollectionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const collectionRef = collection(db, `users/${userId}/collection`);
    
    const unsubscribe = onSnapshot(collectionRef, 
      (snapshot) => {
        const newItems = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as CollectionItem[];
        setItems(newItems);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  const addItem = async (item: Omit<CollectionItem, 'id'>) => {
    const collectionRef = collection(db, `users/${userId}/collection`);
    const newDocRef = doc(collectionRef);
    await setDoc(newDocRef, {
      ...item,
      dateAdded: new Date().toISOString(),
      lastModified: new Date().toISOString()
    });
  };

  const updateItem = async (itemId: string, updates: Partial<CollectionItem>) => {
    const itemRef = doc(db, `users/${userId}/collection/${itemId}`);
    await updateDoc(itemRef, {
      ...updates,
      lastModified: new Date().toISOString()
    });
  };

  const deleteItem = async (itemId: string) => {
    const itemRef = doc(db, `users/${userId}/collection/${itemId}`);
    await deleteDoc(itemRef);
  };

  return {
    items,
    loading,
    error,
    addItem,
    updateItem,
    deleteItem
  };
};