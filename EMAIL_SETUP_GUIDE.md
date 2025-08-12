# Email Configuration Setup Guide

## EmailJS Setup for Order Confirmation Emails

This guide will help you set up EmailJS to send real order confirmation emails to customers.

### Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com](https://www.emailjs.com)
2. Sign up for a free account
3. Verify your email address

### Step 2: Create Email Service

1. In your EmailJS dashboard, click "Add New Service"
2. Choose your email provider (Gmail, Outlook, Yahoo, etc.)
3. Follow the setup instructions for your chosen provider
4. Note down your **Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Template

1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. **Subject Line:** `Order Confirmation - {{order_id}} | Oleo Organics`
4. **Message Body:** Use this HTML template structure:

```html
<div style="font-family: system-ui, sans-serif, Arial; font-size: 14px; color: #333; padding: 14px 8px; background-color: #f5f5f5;">
  <div style="max-width: 600px; margin: auto; background-color: #fff;">
    
    <!-- Header Section -->
    <div style="border-top: 6px solid #789963; padding: 16px; background: linear-gradient(135deg, #f8f9f5 0%, #ffffff 100%);">
      <div style="text-align: center;">
        <h1 style="color: #2c3e20; margin: 0; font-size: 24px; font-weight: 700;">🌿 Oleo Organics</h1>
        <p style="color: #789963; margin: 8px 0 0 0; font-size: 16px; font-weight: 600;">Premium Organic Hair Oils</p>
      </div>
    </div>
    
    <!-- Main Content -->
    <div style="padding: 24px 16px;">
      
      <!-- Thank You Message -->
      <div style="text-align: center; margin-bottom: 24px;">
        <h2 style="color: #2c3e20; margin: 0 0 8px 0; font-size: 20px;">Thank You for Your Order!</h2>
        <p style="color: #666; margin: 0; font-size: 16px;">Dear {{customer_name}}, we're excited to provide you with our premium organic hair oils.</p>
      </div>
      
      <!-- Order Info Header -->
      <div style="text-align: left; font-size: 16px; padding: 12px 0; border-bottom: 2px solid #789963; margin-bottom: 20px;">
        <strong style="color: #2c3e20;">Order #{{order_id}}</strong>
        <div style="font-size: 14px; color: #666; margin-top: 4px;">Order Date: {{order_date}}</div>
      </div>
      
      <!-- Order Items -->
      <div style="margin-bottom: 24px;">
        <h3 style="color: #2c3e20; margin: 0 0 16px 0; font-size: 18px;">Order Items:</h3>
        <div style="background: #f8f9f5; padding: 16px; border-radius: 8px; border-left: 4px solid #789963;">
          <pre style="font-family: system-ui, sans-serif; margin: 0; white-space: pre-line; color: #2c3e20; font-size: 14px; line-height: 1.6;">{{order_items}}</pre>
        </div>
      </div>
      
      <!-- Order Total -->
      <div style="margin-bottom: 24px;">
        <table style="border-collapse: collapse; width: 100%; text-align: right;">
          <tbody>
            <tr>
              <td style="width: 60%; padding: 8px 0;">&nbsp;</td>
              <td style="width: 20%; padding: 8px; color: #666;">Subtotal:</td>
              <td style="padding: 8px; white-space: nowrap; color: #2c3e20; font-weight: 600;">{{order_subtotal}}</td>
            </tr>
            <tr>
              <td style="width: 60%; padding: 8px 0;">&nbsp;</td>
              <td style="width: 20%; padding: 8px; color: #666;">Shipping:</td>
              <td style="padding: 8px; white-space: nowrap; color: #2c3e20; font-weight: 600;">{{order_shipping}}</td>
            </tr>
            <tr>
              <td style="width: 60%; padding: 8px 0;">&nbsp;</td>
              <td style="width: 20%; padding: 8px; color: #666;">Payment Method:</td>
              <td style="padding: 8px; white-space: nowrap; color: #2c3e20; font-weight: 600;">Cash on Delivery</td>
            </tr>
            <tr>
              <td style="width: 60%;">&nbsp;</td>
              <td style="border-top: 2px solid #789963; padding: 16px 8px; color: #2c3e20; font-weight: 700; font-size: 16px;">Order Total:</td>
              <td style="padding: 16px 8px; border-top: 2px solid #789963; white-space: nowrap; color: #789963; font-weight: 700; font-size: 18px;">{{order_total}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Delivery Information -->
      <div style="background: #f0f8f0; padding: 16px; border-radius: 8px; margin-bottom: 24px; border: 1px solid #9cb36d;">
        <h3 style="color: #2c3e20; margin: 0 0 12px 0; font-size: 16px;">📦 Delivery Information:</h3>
        <div style="color: #2c3e20; line-height: 1.6;">
          <strong>Name:</strong> {{customer_name}}<br>
          <strong>Phone:</strong> {{customer_phone}}<br>
          <strong>Address:</strong> {{customer_address}}<br>
          <strong>Special Notes:</strong> {{order_notes}}
        </div>
      </div>
      
      <!-- What's Next Section -->
      <div style="background: linear-gradient(135deg, #e8f5e8, #f0f8f0); padding: 16px; border-radius: 8px; margin-bottom: 24px; border: 1px solid #9cb36d;">
        <h3 style="color: #2c3e20; margin: 0 0 12px 0; font-size: 16px;">🚀 What's Next?</h3>
        <ol style="color: #2c3e20; margin: 0; padding-left: 20px; line-height: 1.8;">
          <li>We will call you within 24 hours to confirm your order</li>
          <li>Your order will be prepared and dispatched within 2-3 business days</li>
          <li>You will pay cash on delivery when you receive your products</li>
          <li>Delivery typically takes 3-5 business days in major cities</li>
        </ol>
      </div>
      
      <!-- Contact Information -->
      <div style="text-align: center; padding: 16px; border-top: 1px solid #e0e0e0;">
        <h3 style="color: #2c3e20; margin: 0 0 12px 0; font-size: 16px;">Questions? We're Here to Help!</h3>
        <div style="color: #666; line-height: 1.8;">
          📱 <strong>Phone:</strong> +92-XXX-XXXXXXX<br>
          📧 <strong>Email:</strong> info@oleoorganics.com<br>
          🌐 <strong>Website:</strong> www.oleoorganics.com
        </div>
      </div>
      
    </div>
    
    <!-- Footer -->
    <div style="background: #2c3e20; color: white; padding: 16px; text-align: center;">
      <p style="margin: 0; font-size: 16px; font-weight: 600;">Thank you for choosing Oleo Organics! 🌿</p>
      <p style="margin: 8px 0 0 0; font-size: 14px; opacity: 0.9;">Your natural hair care journey starts here.</p>
    </div>
    
  </div>
  
  <!-- Email Footer -->
  <div style="max-width: 600px; margin: auto; padding: 16px; text-align: center;">
    <p style="color: #999; font-size: 12px; margin: 0;">
      This email was sent to <strong>{{to_email}}</strong><br>
      You received this email because you placed an order with Oleo Organics.
    </p>
  </div>
  
</div>
```

5. **Important:** Make sure to set the template as **HTML** format, not plain text
6. Note down your **Template ID** (e.g., `template_xyz789`)

### Step 4: Get Public Key

1. Go to "Account" -> "General"
2. Find your **Public Key** (e.g., `user_abcdefghijklmnop`)

### Step 5: Update Configuration

Replace the placeholder values in `src/services/emailService.js`:

```javascript
const SERVICE_ID = 'your_actual_service_id';
const TEMPLATE_ID = 'your_actual_template_id';
const PUBLIC_KEY = 'your_actual_public_key';
```

### Step 6: Switch to Production

In `src/pages/Checkout.js`, replace the demo function with the real one:

```javascript
// Replace this line:
const emailResult = await sendOrderConfirmationEmailDemo(orderData);

// With this line:
const emailResult = await sendOrderConfirmationEmail(orderData);
```

### Step 7: Test Email Functionality

1. Complete a test order
2. Check the browser console for email sending status
3. Check the recipient's email inbox
4. Verify all order details are correctly displayed

### Template Variables Reference

The following variables are available in your email template:

- `{{to_email}}` - Customer's email address
- `{{customer_name}}` - Customer's full name
- `{{order_id}}` - Generated order ID
- `{{order_date}}` - Order date and time
- `{{order_items}}` - List of ordered items with quantities and prices
- `{{order_subtotal}}` - Subtotal amount in PKR (before shipping)
- `{{order_shipping}}` - Shipping fee in PKR (Rs. 250)
- `{{order_total}}` - Total order amount in PKR (subtotal + shipping)
- `{{customer_phone}}` - Customer's phone number
- `{{customer_address}}` - Complete delivery address
- `{{order_notes}}` - Any special delivery notes

### Free Tier Limits

EmailJS free tier includes:
- 200 emails per month
- Basic templates
- Standard delivery speed

For higher volume, consider upgrading to a paid plan.

### Troubleshooting

**Email not sending?**
- Check browser console for error messages
- Verify all IDs and keys are correct
- Ensure email service is properly configured
- Check EmailJS dashboard for failed sends

**Template variables not working?**
- Ensure variable names match exactly (case-sensitive)
- Check for typos in template variable syntax
- Verify data is being passed correctly from the form

**Emails going to spam?**
- Add your sending email to the recipient's contacts
- Use a professional "from" address
- Avoid spam trigger words in subject/content

### Security Note

The EmailJS public key is safe to use in frontend code as it's designed for client-side usage. However, consider implementing rate limiting for production use to prevent abuse.
