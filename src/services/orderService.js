// Order Management Service
// This service handles storing and retrieving order data

const ORDER_STORAGE_KEY = 'oleo_organics_orders';

// Save order to localStorage
export const saveOrder = (orderData) => {
  try {
    const existingOrders = getOrders();
    const newOrder = {
      ...orderData,
      createdAt: new Date().toISOString(),
      status: 'pending', // pending, confirmed, shipped, delivered, cancelled
      updatedAt: new Date().toISOString()
    };
    
    const updatedOrders = [newOrder, ...existingOrders];
    localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(updatedOrders));
    
    
    return { success: true, order: newOrder };
  } catch (error) {
    console.error('Failed to save order:', error);
    return { success: false, error };
  }
};

// Get all orders
export const getOrders = () => {
  try {
    const orders = localStorage.getItem(ORDER_STORAGE_KEY);
    return orders ? JSON.parse(orders) : [];
  } catch (error) {
    console.error('Failed to get orders:', error);
    return [];
  }
};

// Get order by ID
export const getOrderById = (orderId) => {
  const orders = getOrders();
  return orders.find(order => order.orderId === orderId);
};

// Update order status
export const updateOrderStatus = (orderId, newStatus) => {
  try {
    const orders = getOrders();
    const orderIndex = orders.findIndex(order => order.orderId === orderId);
    
    if (orderIndex === -1) {
      return { success: false, error: 'Order not found' };
    }
    
    orders[orderIndex] = {
      ...orders[orderIndex],
      status: newStatus,
      updatedAt: new Date().toISOString()
    };
    
    localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(orders));
    return { success: true, order: orders[orderIndex] };
  } catch (error) {
    console.error('Failed to update order status:', error);
    return { success: false, error };
  }
};

// Delete order
export const deleteOrder = (orderId) => {
  try {
    const orders = getOrders();
    const filteredOrders = orders.filter(order => order.orderId !== orderId);
    localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(filteredOrders));
    return { success: true };
  } catch (error) {
    console.error('Failed to delete order:', error);
    return { success: false, error };
  }
};

// Get orders by status
export const getOrdersByStatus = (status) => {
  const orders = getOrders();
  return orders.filter(order => order.status === status);
};

// Get orders statistics
export const getOrderStats = () => {
  const orders = getOrders();
  return {
    total: orders.length,
    pending: orders.filter(order => order.status === 'pending').length,
    confirmed: orders.filter(order => order.status === 'confirmed').length,
    shipped: orders.filter(order => order.status === 'shipped').length,
    delivered: orders.filter(order => order.status === 'delivered').length,
    cancelled: orders.filter(order => order.status === 'cancelled').length,
  };
};

// Format price helper
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0,
  }).format(price);
};

// Export orders to CSV (for download)
export const exportOrdersToCSV = () => {
  const orders = getOrders();
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
};
