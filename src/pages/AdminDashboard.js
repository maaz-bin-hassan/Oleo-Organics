import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
  getOrdersFromFirebase, 
  getOrderStatsFromFirebase, 
  updateOrderStatusInFirebase, 
  deleteOrderFromFirebase, 
  exportOrdersToCSVFromFirebase,
  formatPrice 
} from '../services/firebaseOrderService';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({});
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessionTimeLeft, setSessionTimeLeft] = useState(null);
  
  const { currentUser, logout, sessionStartTime, isSessionValid } = useContext(AuthContext);
  const navigate = useNavigate();

  // Session timeout warning
  const SESSION_TIMEOUT = 15 * 60 * 1000; // 15 minutes
  const WARNING_TIME = 2 * 60 * 1000; // Show warning 2 minutes before timeout

  useEffect(() => {
    // Check session validity on component mount
    if (!isSessionValid()) {
      handleLogout();
      return;
    }

    loadOrders();
    loadStats();
  }, []);

  // Update session timer
  useEffect(() => {
    const updateTimer = () => {
      if (sessionStartTime) {
        const elapsed = Date.now() - sessionStartTime;
        const remaining = SESSION_TIMEOUT - elapsed;
        setSessionTimeLeft(remaining);

        // Auto logout when session expires
        if (remaining <= 0) {
          alert('Your admin session has expired. You will be logged out for security.');
          handleLogout();
        } 
        // Show warning when 2 minutes left
        else if (remaining <= WARNING_TIME && remaining > WARNING_TIME - 1000) {
          alert('Your admin session will expire in 2 minutes. Please save any work.');
        }
      }
    };

    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [sessionStartTime]);

  const formatTimeLeft = (milliseconds) => {
    if (!milliseconds || milliseconds <= 0) return '00:00';
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    loadOrders();
    loadStats();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const allOrders = await getOrdersFromFirebase();
      setOrders(allOrders);
    } catch (error) {
      console.error('Failed to load orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const orderStats = await getOrderStatsFromFirebase();
      setStats(orderStats);
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    const result = await updateOrderStatusInFirebase(orderId, newStatus);
    if (result.success) {
      await loadOrders();
      await loadStats();
      alert(`Order ${orderId.substring(0, 8)}... status updated to ${newStatus}`);
    } else {
      alert('Failed to update order status: ' + (result.error || 'Unknown error'));
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm(`Are you sure you want to delete order ${orderId.substring(0, 8)}...?`)) {
      const result = await deleteOrderFromFirebase(orderId);
      if (result.success) {
        await loadOrders();
        await loadStats();
        alert('Order deleted successfully');
      } else {
        alert('Failed to delete order: ' + (result.error || 'Unknown error'));
      }
    }
  };

  const handleExportCSV = async () => {
    const csvContent = await exportOrdersToCSVFromFirebase();
    if (!csvContent) {
      alert('No orders to export');
      return;
    }
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `oleo-organics-orders-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    const matchesSearch = searchTerm === '' || 
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerInfo.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerInfo.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerInfo.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerInfo.phone.includes(searchTerm);
    
    return matchesStatus && matchesSearch;
  });

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin-login');
    } catch (error) {
      console.error('Logout error:', error);
      // Force navigation even if logout fails
      navigate('/admin-login');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#f39c12';
      case 'confirmed': return '#3498db';
      case 'shipped': return '#9b59b6';
      case 'delivered': return '#27ae60';
      case 'cancelled': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading orders from Firebase...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="container">
        <div className="admin-header">
          <div className="admin-title">
            <h1>🌿 Oleo Organics - Admin Dashboard</h1>
            <p>Manage orders and track customer information</p>
          </div>
          <div className="admin-user-info">
            <div className="session-info">
              <span>Welcome, {currentUser?.email}</span>
              <div className="session-timer">
                Session: {formatTimeLeft(sessionTimeLeft)}
                {sessionTimeLeft && sessionTimeLeft <= WARNING_TIME && (
                  <span className="session-warning">⚠️</span>
                )}
              </div>
            </div>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Orders</h3>
            <div className="stat-number">{stats.total || 0}</div>
          </div>
          <div className="stat-card pending">
            <h3>Pending</h3>
            <div className="stat-number">{stats.pending || 0}</div>
          </div>
          <div className="stat-card confirmed">
            <h3>Confirmed</h3>
            <div className="stat-number">{stats.confirmed || 0}</div>
          </div>
          <div className="stat-card shipped">
            <h3>Shipped</h3>
            <div className="stat-number">{stats.shipped || 0}</div>
          </div>
          <div className="stat-card delivered">
            <h3>Delivered</h3>
            <div className="stat-number">{stats.delivered || 0}</div>
          </div>
          <div className="stat-card cancelled">
            <h3>Cancelled</h3>
            <div className="stat-number">{stats.cancelled || 0}</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="admin-controls">
          <div className="search-filter">
            <input
              type="text"
              placeholder="Search orders (ID, name, email, phone)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="status-filter"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          
          <button onClick={handleExportCSV} className="export-btn">
            📊 Export CSV
          </button>
        </div>

        {/* Orders Table */}
        <div className="orders-table-container">
          {filteredOrders.length === 0 ? (
            <div className="no-orders">
              <h3>No orders found</h3>
              <p>No orders match your current filters.</p>
            </div>
          ) : (
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Contact</th>
                  <th>Address</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => (
                  <tr key={order.orderId}>
                    <td className="order-id">{order.orderId}</td>
                    <td>
                      <div className="customer-info">
                        <strong>{order.customerInfo.firstName} {order.customerInfo.lastName}</strong>
                        <div className="email">{order.customerInfo.email}</div>
                      </div>
                    </td>
                    <td>
                      <div className="contact-info">
                        <div>📱 {order.customerInfo.phone}</div>
                      </div>
                    </td>
                    <td>
                      <div className="address-info">
                        <div>{order.customerInfo.address}</div>
                        <div>{order.customerInfo.city} {order.customerInfo.postalCode}</div>
                      </div>
                    </td>
                    <td>
                      <div className="items-info">
                        {order.items.map(item => (
                          <div key={item.id}>
                            {item.name} x{item.quantity}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div className="price-info">
                        <div>Subtotal: {formatPrice(order.subtotal)}</div>
                        <div>Shipping: {formatPrice(order.shipping)}</div>
                        <strong>Total: {formatPrice(order.total)}</strong>
                      </div>
                    </td>
                    <td>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className="status-select"
                        style={{ backgroundColor: getStatusColor(order.status) }}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td>
                      <div className="date-info">
                        {new Date(order.createdAt).toLocaleDateString('en-PK')}
                        <div className="time">
                          {new Date(order.createdAt).toLocaleTimeString('en-PK', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="view-btn"
                          title="View Details"
                        >
                          👁️
                        </button>
                        <button
                          onClick={() => handleDeleteOrder(order.id)}
                          className="delete-btn"
                          title="Delete Order"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Order Details - {selectedOrder.orderId}</h2>
                <button onClick={() => setSelectedOrder(null)} className="close-btn">✕</button>
              </div>
              <div className="modal-body">
                <div className="order-details">
                  <div className="detail-section">
                    <h3>Customer Information</h3>
                    <p><strong>Name:</strong> {selectedOrder.customerInfo.firstName} {selectedOrder.customerInfo.lastName}</p>
                    <p><strong>Email:</strong> {selectedOrder.customerInfo.email}</p>
                    <p><strong>Phone:</strong> {selectedOrder.customerInfo.phone}</p>
                    <p><strong>Address:</strong> {selectedOrder.customerInfo.address}, {selectedOrder.customerInfo.city} {selectedOrder.customerInfo.postalCode}</p>
                    {selectedOrder.customerInfo.notes && (
                      <p><strong>Notes:</strong> {selectedOrder.customerInfo.notes}</p>
                    )}
                  </div>
                  
                  <div className="detail-section">
                    <h3>Order Items</h3>
                    {selectedOrder.items.map(item => (
                      <div key={item.id} className="order-item-detail">
                        <span>{item.name}</span>
                        <span>Quantity: {item.quantity}</span>
                        <span>Price: {formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="detail-section">
                    <h3>Order Summary</h3>
                    <p><strong>Subtotal:</strong> {formatPrice(selectedOrder.subtotal)}</p>
                    <p><strong>Shipping:</strong> {formatPrice(selectedOrder.shipping)}</p>
                    <p><strong>Total:</strong> {formatPrice(selectedOrder.total)}</p>
                    <p><strong>Status:</strong> {selectedOrder.status}</p>
                    <p><strong>Order Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString('en-PK')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
