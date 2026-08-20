// utils/firebase/orders.ts
import { db } from '../firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  doc, 
  updateDoc, 
  query, 
  where,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';

export interface OrderData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  items: any[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  deliveryMethod: 'ship' | 'pickup';
  pickupBranch?: string;
  paymentMethod: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  orderNumber: string;
}

// Save a new order
export const saveOrder = async (orderData: any) => {
  try {
    console.log('saveOrder called with:', orderData);
    
    // Generate order number
    const timestamp = Date.now().toString().slice(-6);
    const orderNumber = `FD-${timestamp}`;
    
    const orderDataWithMeta = {
      ...orderData,
      orderNumber,
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    console.log('Saving to Firebase:', orderDataWithMeta);
    
    const orderRef = await addDoc(collection(db, 'orders'), orderDataWithMeta);
    
    console.log('Order saved with ID:', orderRef.id);
    
    return { success: true, orderId: orderRef.id, orderNumber };
  } catch (error) {
    console.error('Error saving order:', error);
    console.error('Error details:', error instanceof Error ? error.message : 'Unknown error');
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

// Get all orders (admin)
export const getOrders = async () => {
  try {
    const q = query(
      collection(db, 'orders'),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const ordersList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return ordersList;
  } catch (error) {
    console.error('Error getting orders:', error);
    return [];
  }
};

// Get order by ID
export const getOrderById = async (orderId: string) => {
  try {
    const orderDoc = await getDoc(doc(db, 'orders', orderId));
    if (orderDoc.exists()) {
      return { id: orderDoc.id, ...orderDoc.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting order:', error);
    return null;
  }
};

// Update order status
export const updateOrderStatus = async (orderId: string, status: string) => {
  try {
    await updateDoc(doc(db, 'orders', orderId), {
      status,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating order:', error);
    return { success: false, error };
  }
};

// Get orders by email
export const getOrdersByEmail = async (email: string) => {
  try {
    const q = query(
      collection(db, 'orders'),
      where('customerEmail', '==', email),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const ordersList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return ordersList;
  } catch (error) {
    console.error('Error getting orders by email:', error);
    return [];
  }
};