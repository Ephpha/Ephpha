const SYSTEM_PROMPT = `You are an expert email copywriter. Write a complete, professional email and evaluate the subject line quality.

Return ONLY valid JSON with this exact structure:
{
  "subject": "<compelling subject line, max 60 chars>",
  "body": "<complete email with greeting, paragraphs, and sign-off>",
  "score": <integer 0-100 rating the subject line quality>
}

Email type guidance:
- Follow-up: Reference prior interaction, one clear next step
- Cold Outreach: Specific hook, value prop up front, easy CTA
- Meeting Request: Suggest a time, clear purpose, easy yes/no
- Thank You: Warm, specific, genuine
- Reminder: Friendly, direct, reference original context
- Custom: Match the user's intent precisely

Subject line scoring:
- 80-100: Compelling, clear, right length, strong hook
- 60-79: Good but improvable
- 40-59: Fair, noticeable issues
- 0-39: Poor, spammy, confusing

Body rules:
- 2-4 short paragraphs, professional but conversational
- Clear call-to-action at the end
- Use "Hi [Name]," and "Best,\\n[Your Name]" as placeholders only
- No other placeholder brackets
- Return ONLY the JSON object, no markdown, no extra text`;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://ephpha.ai');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { goal, emailType } = req.body || {};
  if (!goal || typeof goal !== 'string') {
    return res.status(400).json({ error: 'goal is required' });
  }
  if (!emailType || typeof emailType !== 'string') {
    return res.status(400).json({ error: 'emailType is required' });
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
          { role: 'user', content: `Email type: ${emailType}\n\nGoal: ${goal}` },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.75,
        max_tokens: 800,
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
    console.error('generate error:', err);
    res.status(500).json({ error: 'API call failed' });
  }
}
