// utils/whatsapp.ts
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID || '';
const authToken = process.env.TWILIO_AUTH_TOKEN || '';
const client = twilio(accountSid, authToken);

export const sendWhatsAppMessage = async (order: any) => {
  try {
    const itemsList = order.items.map((item: any) => 
      `${item.name} x${item.quantity} (₱${item.subtotal.toLocaleString()})`
    ).join('\n');

    const message = await client.messages.create({
      body: `
🆕 NEW ORDER!

Order #: ${order.orderNumber}
Total: ₱${order.total.toLocaleString()}
Customer: ${order.customerName}
Phone: ${order.customerPhone}

Items:
${itemsList}

Status: PENDING
      `,
      from: 'whatsapp:+14155238886', // Twilio WhatsApp number
      to: 'whatsapp:+639854388217', // Boss's WhatsApp number
    });

    console.log('WhatsApp message sent:', message.sid);
    return { success: true };
  } catch (error) {
    console.error('Error sending WhatsApp:', error);
    return { success: false, error };
  }
};