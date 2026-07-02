import nodemailer from "nodemailer";

let transporter = null;
const isConfigured = Boolean(
  process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS
);

if (isConfigured) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
}

export async function sendOrderConfirmationEmail({ to, order }) {
  if (!isConfigured) {
    console.log(`[mail] SMTP no configurado, se omite el envío del mail para la orden ${order.orderNumber}.`);
    return { sent: false };
  }

  const itemsHtml = order.items
    .map((i) => `<li>${i.quantity}x ${i.name} — $${i.price * i.quantity}</li>`)
    .join("");

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to,
    subject: `VoltX — Confirmación de orden ${order.orderNumber}`,
    html: `
      <h2>¡Gracias por tu compra!</h2>
      <p>Tu número de orden es <strong>${order.orderNumber}</strong>.</p>
      <ul>${itemsHtml}</ul>
      <p><strong>Total: $${order.total}</strong></p>
    `,
  });

  return { sent: true };
}
