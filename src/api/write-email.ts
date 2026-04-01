export interface WriteEmailResult {
  subject: string
  body: string
  score: number
}

export async function writeEmail(goal: string, emailType: string): Promise<WriteEmailResult> {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ goal, emailType }),
  })

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}))
    if (response.status === 401) throw new Error('Invalid API key.')
    if (response.status === 429) throw new Error('Rate limit reached. Please wait a moment.')
    throw new Error(errData.error || 'Something went wrong. Please try again.')
  }

  const data = await response.json()
  const raw = data.choices[0]?.message?.content
  if (!raw) throw new Error('Empty response from AI')

  const parsed = JSON.parse(raw) as WriteEmailResult

  if (typeof parsed.subject !== 'string' || typeof parsed.body !== 'string') {
    throw new Error('Unexpected response format from AI')
  }

  return {
    subject: parsed.subject.slice(0, 80),
    body: parsed.body,
    score:
      typeof parsed.score === 'number'
        ? Math.min(100, Math.max(0, Math.round(parsed.score)))
        : 70,
  }
}
