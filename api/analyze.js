const SYSTEM_PROMPT = `You are an expert email marketing analyst specializing in subject line optimization. Analyze the given email subject line and return ONLY valid JSON with this exact structure:
{
  "score": <integer 0-100>,
  "issues": [<string>, ...],
  "suggestions": [<string>, ...],
  "alternatives": [<string>, <string>, <string>]
}

Scoring guide:
- 80-100: Excellent (compelling, clear, right length, good hooks)
- 60-79: Good (solid but could be improved)
- 40-59: Fair (noticeable problems)
- 0-39: Poor (spam-like, too long/short, confusing)

Rules:
- "issues" = specific problems found (2-4 items, or 1 if very good). Be concrete, not generic.
- "suggestions" = actionable improvements (2-4 items). Start each with a verb.
- "alternatives" = exactly 3 improved subject lines that feel natural and would get opened.
- Keep each string concise (under 100 chars).
- Return ONLY the JSON object, no extra text.`;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://ephpha.ai');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { subject } = req.body || {};
  if (!subject || typeof subject !== 'string') {
    return res.status(400).json({ error: 'subject is required' });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: `Analyze this email subject line: "${subject}"` },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      if (response.status === 401) return res.status(401).json({ error: 'Invalid API key' });
      if (response.status === 429) return res.status(429).json({ error: 'Rate limit reached' });
      return res.status(response.status).json({ error: errData.error?.message || 'OpenAI error' });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error('analyze error:', err);
    res.status(500).json({ error: 'API call failed' });
  }
}
