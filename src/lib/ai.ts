'use client'

export interface AIConfig {
  apiKey: string
  baseUrl: string
  model: string
}

export function getAIConfig(): AIConfig | null {
  if (typeof window === 'undefined') return null
  const apiKey = localStorage.getItem('ai_api_key')
  if (!apiKey) return null
  return {
    apiKey,
    baseUrl: localStorage.getItem('ai_base_url') || '',
    model: localStorage.getItem('ai_model') || '',
  }
}

export interface Message {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export async function callAI(
  messages: Message[],
  options?: { maxTokens?: number; temperature?: number }
): Promise<string> {
  const config = getAIConfig()
  if (!config) throw new Error('Please set your API key in Settings first.')

  const res = await fetch('/api/ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      apiKey: config.apiKey,
      baseUrl: config.baseUrl,
      model: config.model,
      messages,
      maxTokens: options?.maxTokens,
      temperature: options?.temperature,
    }),
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'AI request failed')
  return data.content
}

// 流式调用
export async function callAIStream(
  messages: Message[],
  onChunk: (text: string) => void,
  options?: { maxTokens?: number; temperature?: number }
): Promise<void> {
  const config = getAIConfig()
  if (!config) throw new Error('Please set your API key in Settings first.')

  const res = await fetch('/api/ai-stream', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      apiKey: config.apiKey,
      baseUrl: config.baseUrl,
      model: config.model,
      messages,
      maxTokens: options?.maxTokens,
      temperature: options?.temperature,
    }),
  })

  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.error || 'AI request failed')
  }

  const reader = res.body?.getReader()
  if (!reader) throw new Error('No response stream')

  const decoder = new TextDecoder()
  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop() || ''

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6).trim()
        if (data === '[DONE]') return
        try {
          const parsed = JSON.parse(data)
          const content = parsed.choices?.[0]?.delta?.content
          if (content) onChunk(content)
        } catch {}
      }
    }
  }
}
