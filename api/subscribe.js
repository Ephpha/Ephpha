export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://ephpha.ai');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email } = req.body || {};

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Email is required' });
  }

  const trimmed = email.trim().toLowerCase();
  if (!trimmed.includes('@') || !trimmed.includes('.')) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const AUDIENCE_ID = 'ff967224-467d-49b3-b05f-bda3f1467fe8';
    const response = await fetch(`https://api.resend.com/audiences/${AUDIENCE_ID}/contacts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: trimmed,
        unsubscribed: false,
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      console.error('[subscribe] Resend error:', errData);
      return res.status(500).json({ error: 'Failed to save signup' });
    }

    console.log('[subscribe] Added contact to Resend audience:', trimmed);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('[subscribe] Error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
