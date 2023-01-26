import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';

const SANITY_WEBHOOK_SECRET = '1234567890';

export default async function handler(req, res) {
  const signature = req.headers[SIGNATURE_HEADER_NAME];
  const isValid = isValidSignature(JSON.stringify(req.body), signature, SANITY_WEBHOOK_SECRET);

  console.log(`===== Is the webhook request valid? ${isValid}`);

  // Validate signature
  if (!isValid) {
    res.status(401).json({ success: false, message: 'Invalid signature' });
    return;
  }
  try {
    return localStorage.setItem('newUpdate', JSON.stringify(req.body));
  } catch (err) {
    // Could not revalidate. The stale page will continue to be shown until
    // this issue is fixed.
    return res.status(500).send('Error while revalidating');
  }
}
