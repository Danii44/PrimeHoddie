'use client';

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { Product, Order, StoreUser } from './db-types';

// Product functions
export async function addProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) {
  try {
    const docRef = doc(collection(db, 'products'));
    await setDoc(docRef, {
      ...product,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
}

export async function updateProduct(id: string, updates: Partial<Product>) {
  try {
    await updateDoc(doc(db, 'products', id), {
      ...updates,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
}

export async function deleteProduct(id: string) {
  try {
    await deleteDoc(doc(db, 'products', id));
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}

export async function getProduct(id: string) {
  try {
    const docSnap = await getDoc(doc(db, 'products', id));
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Product;
    }
    return null;
  } catch (error) {
    console.error('Error getting product:', error);
    throw error;
  }
}

export async function getAllProducts() {
  try {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Product[];
  } catch (error) {
    console.error('Error getting products:', error);
    throw error;
  }
}

// Order functions
export async function getOrders(userId?: string) {
  try {
    let q;
    if (userId) {
      q = query(
        collection(db, 'orders'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
    } else {
      q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    }
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Order[];
  } catch (error) {
    console.error('Error getting orders:', error);
    throw error;
  }
}

export async function updateOrderStatus(orderId: string, status: Order['status']) {
  try {
    await updateDoc(doc(db, 'orders', orderId), {
      status,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
}

// User functions
export async function createStoreUser(userId: string, user: Omit<StoreUser, 'id'>) {
  try {
    await setDoc(doc(db, 'users', userId), {
      ...user,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function getStoreUser(userId: string) {
  try {
    const docSnap = await getDoc(doc(db, 'users', userId));
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as StoreUser;
    }
    return null;
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
}
