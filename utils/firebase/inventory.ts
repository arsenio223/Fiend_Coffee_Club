// utils/firebase/inventory.ts
import { db } from '../firebase';
import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  updateDoc, 
  addDoc,
  serverTimestamp,
  query,
  where
} from 'firebase/firestore';

// Get all inventory
export const getInventory = async () => {
  try {
    const inventoryCollection = collection(db, 'inventory');
    const inventorySnapshot = await getDocs(inventoryCollection);
    const inventoryList = inventorySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return inventoryList;
  } catch (error) {
    console.error('Error getting inventory:', error);
    return [];
  }
};

// Update stock for a product
export const updateStock = async (productId: string, newStock: number) => {
  try {
    await updateDoc(doc(db, 'inventory', productId), {
      stock: newStock,
      lastUpdated: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating stock:', error);
    return { success: false, error };
  }
};

// Check if inventory exists for a product
export const checkInventoryExists = async (productId: string) => {
  try {
    const docRef = doc(db, 'inventory', productId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  } catch (error) {
    console.error('Error checking inventory:', error);
    return false;
  }
};

// Get inventory by product ID
export const getInventoryByProductId = async (productId: string) => {
  try {
    const q = query(
      collection(db, 'inventory'),
      where('productId', '==', productId)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting inventory by product:', error);
    return null;
  }
};