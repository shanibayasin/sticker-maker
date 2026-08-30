export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, quantity, finish, stickerName } = req.body || {};

  console.log(`[Order Waitlist] New request from ${email} for ${quantity}x (${finish}) of ${stickerName}`);

  return res.status(200).json({
    success: true,
    message: "You're on the priority list! We'll notify you with a 20% discount when physical printing ships in your region.",
  });
}
