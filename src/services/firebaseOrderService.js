import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy 
} from 'firebase/firestore';
import { db } from '../config/firebase';

const ORDERS_COLLECTION = 'orders';

// Save order to Firestore
export const saveOrderToFirebase = async (orderData) => {
  try {
    const newOrder = {
      ...orderData,
      createdAt: new Date().toISOString(),
      status: 'pending',
      updatedAt: new Date().toISOString()
    };
    
    const docRef = await addDoc(collection(db, ORDERS_COLLECTION), newOrder);
    
    console.log('Order saved to Firebase with ID:', docRef.id);
    return { success: true, order: { ...newOrder, id: docRef.id } };
  } catch (error) {
    console.error('Failed to save order to Firebase:', error);
    return { success: false, error: error.message };
  }
};

// Get all orders from Firestore
export const getOrdersFromFirebase = async () => {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, ORDERS_COLLECTION), orderBy('createdAt', 'desc'))
    );
    
    const orders = [];
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });
    
    return orders;
  } catch (error) {
    console.error('Failed to get orders from Firebase:', error);
    return [];
  }
};

// Update order status in Firestore
export const updateOrderStatusInFirebase = async (orderId, newStatus) => {
  try {
    const orderRef = doc(db, ORDERS_COLLECTION, orderId);
    await updateDoc(orderRef, {
      status: newStatus,
      updatedAt: new Date().toISOString()
    });
    
    return { success: true };
  } catch (error) {
    console.error('Failed to update order status in Firebase:', error);
    return { success: false, error: error.message };
  }
};

// Delete order from Firestore
export const deleteOrderFromFirebase = async (orderId) => {
  try {
    await deleteDoc(doc(db, ORDERS_COLLECTION, orderId));
    return { success: true };
  } catch (error) {
    console.error('Failed to delete order from Firebase:', error);
    return { success: false, error: error.message };
  }
};

// Get orders by status from Firestore
export const getOrdersByStatusFromFirebase = async (status) => {
  try {
    const q = query(
      collection(db, ORDERS_COLLECTION),
      where('status', '==', status),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const orders = [];
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });
    
    return orders;
  } catch (error) {
    console.error('Failed to get orders by status from Firebase:', error);
    return [];
  }
};

// Get order statistics from Firestore
export const getOrderStatsFromFirebase = async () => {
  try {
    const orders = await getOrdersFromFirebase();
    
    const stats = {
      total: orders.length,
      pending: orders.filter(order => order.status === 'pending').length,
      confirmed: orders.filter(order => order.status === 'confirmed').length,
      delivered: orders.filter(order => order.status === 'delivered').length,
    };
    
    return stats;
  } catch (error) {
    console.error('Failed to get order stats from Firebase:', error);
    return {
      total: 0,
      pending: 0,
      confirmed: 0,
      delivered: 0
    };
  }
};

// Format price helper
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0,
  }).format(price);
};

// Export orders to CSV from Firebase
export const exportOrdersToCSVFromFirebase = async () => {
  try {
    const orders = await getOrdersFromFirebase();
    if (orders.length === 0) return null;
    
    const headers = [
      'Order ID',
      'Customer Name',
      'Email',
      'Phone',
      'Address',
      'City',
      'Items',
      'Subtotal',
      'Shipping',
      'Total',
      'Status',
      'Order Date',
      'Notes'
    ];
    
    const csvContent = [
      headers.join(','),
      ...orders.map(order => [
        order.orderId,
        `${order.customerInfo.firstName} ${order.customerInfo.lastName}`,
        order.customerInfo.email,
        order.customerInfo.phone,
        `"${order.customerInfo.address}"`,
        order.customerInfo.city,
        `"${order.items.map(item => `${item.name} x${item.quantity}`).join('; ')}"`,
        order.subtotal,
        order.shipping,
        order.total,
        order.status,
        new Date(order.createdAt).toLocaleDateString('en-PK'),
        `"${order.customerInfo.notes || 'None'}"`
      ].join(','))
    ].join('\n');
    
    return csvContent;
  } catch (error) {
    console.error('Failed to export orders from Firebase:', error);
    return null;
  }
};
