import emailjs from '@emailjs/browser';

// EmailJS configuration - Use environment variables
const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

// Validate that environment variables are set
const isConfigured = SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY && 
  !SERVICE_ID.includes('your_') && 
  !TEMPLATE_ID.includes('your_') && 
  !PUBLIC_KEY.includes('your_');

// Initialize EmailJS if properly configured
if (isConfigured) {
  emailjs.init(PUBLIC_KEY);
  console.log('EmailJS initialized successfully');
} else {
  console.warn('EmailJS not configured. Please set environment variables in .env file');
}

export const sendOrderConfirmationEmail = async (orderData) => {
 
  // Check if EmailJS is properly configured
  if (!isConfigured) {
    console.warn('EmailJS not configured, using demo mode');
    return sendOrderConfirmationEmailDemo(orderData);
  }

  const { orderId, customerInfo, items, subtotal, shipping, total } = orderData;
  
  // Format items for email
  const itemsList = items.map(item => 
    `${item.name} x ${item.quantity} = ${formatPrice(item.price * item.quantity)}`
  ).join('\n');
  
  // Prepare email template parameters
  const templateParams = {
    email: customerInfo.email,  // Changed from to_email to user_email
    to_name: `${customerInfo.firstName} ${customerInfo.lastName}`,  // Added to_name
    customer_name: `${customerInfo.firstName} ${customerInfo.lastName}`,
    order_id: orderId,
    order_items: itemsList,
    order_subtotal: formatPrice(subtotal),
    order_shipping: formatPrice(shipping),
    order_total: formatPrice(total),
    customer_phone: customerInfo.phone,
    customer_address: `${customerInfo.address}, ${customerInfo.city}${customerInfo.postalCode ? ', ' + customerInfo.postalCode : ''}`,
    order_notes: customerInfo.notes || 'None',
    order_date: new Date().toLocaleDateString('en-PK', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  };
  
  console.log('📧 Template parameters:', templateParams);
  
  try {
    console.log('Sending email with EmailJS...');
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams
    );
    
    console.log('Email sent successfully:', response);
    return { success: true, response };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
};

// Helper function to format price
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0,
  }).format(price);
};

// Demo function for testing without EmailJS setup
export const sendOrderConfirmationEmailDemo = async (orderData) => {
  const { orderId, customerInfo, items, subtotal, shipping, total } = orderData;
  
  console.log('=== ORDER CONFIRMATION EMAIL (DEMO) ===');
  console.log(`To: ${customerInfo.email}`);
  console.log(`Customer: ${customerInfo.firstName} ${customerInfo.lastName}`);
  console.log(`Order ID: ${orderId}`);
  console.log(`Order Date: ${new Date().toLocaleDateString('en-PK')}`);
  console.log('--- Order Items ---');
  items.forEach(item => {
    console.log(`${item.name} x ${item.quantity} = ${formatPrice(item.price * item.quantity)}`);
  });
  console.log(`Subtotal: ${formatPrice(subtotal)}`);
  console.log(`Shipping: ${formatPrice(shipping)}`);
  console.log(`Total: ${formatPrice(total)}`);
  console.log(`Delivery Address: ${customerInfo.address}, ${customerInfo.city}`);
  console.log('=====================================');
  
  // Simulate email sending delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return { success: true, demo: true };
};
