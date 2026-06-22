'use client'

import { useState } from 'react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import ApiKeyGuard from '@/components/ApiKeyGuard'
import { callAIStream } from '@/lib/ai'

const CATEGORIES = {
  en: [
    { key: 'business', label: 'Business Ideas', icon: '💼', prompt: 'Generate 10 creative and practical business ideas. For each, include: the idea name, target audience, how it makes money, and estimated difficulty to start. Format as a structured list.' },
    { key: 'content', label: 'Content Topics', icon: '📱', prompt: 'Generate 15 trending content topics and post ideas. Include platform suggestions (YouTube, TikTok, Blog, etc.) and a brief hook for each. Format as a structured list.' },
    { key: 'names', label: 'Names & Branding', icon: '🏷️', prompt: 'Generate 10 creative names with taglines. For each, explain the reasoning and what kind of brand/product it suits best.' },
    { key: 'sidehustle', label: 'Side Hustles', icon: '💰', prompt: 'Generate 10 realistic side hustle ideas that can be started with little to no money. For each, include: what it is, time commitment, potential income, and getting started steps.' },
    { key: 'custom', label: 'Custom', icon: '✏️', prompt: '' },
  ],
  zh: [
    { key: 'business', label: '创业点子', icon: '💼', prompt: '生成10个创意且可行的创业点子。每个包含：点子名称、目标用户、盈利模式、启动难度。用结构化列表格式输出。' },
    { key: 'content', label: '内容选题', icon: '📱', prompt: '生成15个热门内容选题和创意。包含平台建议（抖音、小红书、B站、公众号等）和吸引人的标题hook。用结构化列表格式输出。' },
    { key: 'names', label: '起名/品牌', icon: '🏷️', prompt: '生成10个有创意的名字和标语。每个解释命名思路和适合的品牌/产品类型。' },
    { key: 'sidehustle', label: '副业方向', icon: '💰', prompt: '生成10个低成本可启动的副业方向。每个包含：做什么、时间投入、收入预期、启动步骤。用结构化列表格式输出。' },
    { key: 'custom', label: '自定义', icon: '✏️', prompt: '' },
  ],
}

export default function IdeasPage() {
  const [uiLang, setUiLang] = useState<'en' | 'zh'>('en')
  const [category, setCategory] = useState(0)
  const [customTopic, setCustomTopic] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const categories = CATEGORIES[uiLang]
  const t = uiLang === 'en' ? {
    title: '💡 AI Idea Generator',
    subtitle: 'Brainstorm anything — business, content, names, and more',
    customPlaceholder: 'What do you need ideas for?',
    generate: '✨ Generate Ideas',
    generating: 'Brainstorming...',
    copy: '📋 Copy',
    copied: '✅ Copied!',
    output: 'Ideas',
  } : {
    title: '💡 AI 灵感生成器',
    subtitle: '头脑风暴利器 — 创业、内容、起名，样样都行',
    customPlaceholder: '你需要什么方面的灵感？',
    generate: '✨ 生成灵感',
    generating: '思考中...',
    copy: '📋 复制',
    copied: '✅ 已复制！',
    output: '灵感列表',
  }

  const handleGenerate = async () => {
    const cat = categories[category]
    const prompt = cat.key === 'custom' ? customTopic : cat.prompt
    if (!prompt.trim()) return

    setLoading(true)
    setError('')
    setResult('')

    try {
      const messages = [
        { role: 'system' as const, content: 'You are a creative brainstorming assistant. Be specific, practical, and creative. Use markdown formatting with clear structure.' },
        { role: 'user' as const, content: prompt },
      ]

      let fullText = ''
      await callAIStream(messages, (chunk) => {
        fullText += chunk
        setResult(fullText)
      })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="sticky top-0 z-50 glass border-b border-white/20">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary-700">
            <span className="text-2xl">🤖</span> AI Tools Hub
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/settings" className="text-sm text-gray-500 hover:text-primary-600 transition">⚙️</Link>
            <button onClick={() => setUiLang(uiLang === 'en' ? 'zh' : 'en')} className="px-3 py-1.5 text-sm rounded-full bg-primary-100 text-primary-700 hover:bg-primary-200 transition font-medium">
              {uiLang === 'en' ? '中文' : 'EN'}
            </button>
          </div>
        </div>
      </header>

      <ApiKeyGuard>
        <main className="max-w-5xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">{t.title}</h1>
            <p className="text-gray-500">{t.subtitle}</p>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
            {categories.map((cat, i) => (
              <button
                key={cat.key}
                onClick={() => setCategory(i)}
                className={`p-4 rounded-xl border transition text-center ${category === i ? 'border-primary-400 bg-primary-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}
              >
                <div className="text-2xl mb-1">{cat.icon}</div>
                <div className="text-sm font-medium text-gray-700">{cat.label}</div>
              </button>
            ))}
          </div>

          {/* Custom Input */}
          {categories[category].key === 'custom' && (
            <div className="mb-6">
              <textarea
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                placeholder={t.customPlaceholder}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition text-sm resize-none"
              />
            </div>
          )}

          {/* Generate Button */}
          <div className="mb-6">
            <button
              onClick={handleGenerate}
              disabled={loading || (categories[category].key === 'custom' && !customTopic.trim())}
              className="px-8 py-3 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 disabled:opacity-50 transition"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                  {t.generating}
                </span>
              ) : t.generate}
            </button>
          </div>

          {/* Result */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-700">{t.output}</h3>
              {result && (
                <button onClick={handleCopy} className="text-sm text-primary-600 hover:text-primary-700">
                  {copied ? t.copied : t.copy}
                </button>
              )}
            </div>
            {result ? (
              <div className="markdown-body text-sm text-gray-800 max-h-[600px] overflow-y-auto">
                <ReactMarkdown>{result}</ReactMarkdown>
              </div>
            ) : (
              <div className="flex items-center justify-center h-48 text-gray-300">
                <div className="text-center">
                  <div className="text-4xl mb-2">💡</div>
                  <p className="text-sm">{uiLang === 'en' ? 'Ideas will appear here' : '灵感将显示在这里'}</p>
                </div>
              </div>
            )}
            {error && (
              <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
                ❌ {error}
              </div>
            )}
          </div>
        </main>
      </ApiKeyGuard>
    </div>
  )
}
