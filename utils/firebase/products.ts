// utils/firebase/products.ts
import { db } from '../firebase';
import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore';

// Get all products
export const getProducts = async () => {
  try {
    const productsCollection = collection(db, 'products');
    const productsSnapshot = await getDocs(productsCollection);
    const productsList = productsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return productsList;
  } catch (error) {
    console.error('Error getting products:', error);
    return [];
  }
};

// Get a single product by ID
export const getProductById = async (productId: string) => {
  try {
    const productDoc = await getDoc(doc(db, 'products', productId));
    if (productDoc.exists()) {
      return { id: productDoc.id, ...productDoc.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting product:', error);
    return null;
  }
};

// Get products by category
export const getProductsByCategory = async (category: string) => {
  try {
    const q = query(
      collection(db, 'products'),
      where('category', '==', category)
    );
    const querySnapshot = await getDocs(q);
    const productsList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return productsList;
  } catch (error) {
    console.error('Error getting products by category:', error);
    return [];
  }
};

// Add a new product (admin)
export const addProduct = async (productData: any) => {
  try {
    const docRef = await addDoc(collection(db, 'products'), productData);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding product:', error);
    return { success: false, error };
  }
};

// Update a product (admin)
export const updateProduct = async (productId: string, productData: any) => {
  try {
    await updateDoc(doc(db, 'products', productId), productData);
    return { success: true };
  } catch (error) {
    console.error('Error updating product:', error);
    return { success: false, error };
  }
};

// Delete a product (admin)
export const deleteProduct = async (productId: string) => {
  try {
    await deleteDoc(doc(db, 'products', productId));
    return { success: true };
  } catch (error) {
    console.error('Error deleting product:', error);
    return { success: false, error };
  }
};