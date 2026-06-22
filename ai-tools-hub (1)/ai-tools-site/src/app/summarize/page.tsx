'use client'

import { useState } from 'react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import ApiKeyGuard from '@/components/ApiKeyGuard'
import { callAIStream } from '@/lib/ai'

export default function SummarizePage() {
  const [uiLang, setUiLang] = useState<'en' | 'zh'>('en')
  const [input, setInput] = useState('')
  const [mode, setMode] = useState<'brief' | 'detailed' | 'bullets'>('brief')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const t = uiLang === 'en' ? {
    title: '📝 AI Summarizer',
    subtitle: 'Condense any text into clear, actionable summaries',
    placeholder: 'Paste your article, report, email, or any long text here...',
    modes: [
      { key: 'brief' as const, label: 'Brief', icon: '⚡', desc: '2-3 sentences' },
      { key: 'detailed' as const, label: 'Detailed', icon: '📄', desc: 'Full breakdown' },
      { key: 'bullets' as const, label: 'Key Points', icon: '📋', desc: 'Bullet list' },
    ],
    summarize: '✨ Summarize',
    summarizing: 'Summarizing...',
    copy: '📋 Copy',
    copied: '✅ Copied!',
    output: 'Summary',
    chars: 'chars',
    words: 'words',
  } : {
    title: '📝 AI 摘要',
    subtitle: '将任何文本浓缩为清晰的摘要',
    placeholder: '粘贴你的文章、报告、邮件或任何长文本...',
    modes: [
      { key: 'brief' as const, label: '简要', icon: '⚡', desc: '2-3句话概括' },
      { key: 'detailed' as const, label: '详细', icon: '📄', desc: '完整分析' },
      { key: 'bullets' as const, label: '要点', icon: '📋', desc: '关键点列表' },
    ],
    summarize: '✨ 开始摘要',
    summarizing: '摘要中...',
    copy: '📋 复制',
    copied: '✅ 已复制！',
    output: '摘要结果',
    chars: '字符',
    words: '词',
  }

  const handleSummarize = async () => {
    if (!input.trim()) return
    setLoading(true)
    setError('')
    setResult('')

    const modePrompts = {
      brief: uiLang === 'en'
        ? 'Summarize the following text in 2-3 concise sentences. Capture the most essential information only.'
        : '用2-3个简洁的句子概括以下文本，只保留最核心的信息。',
      detailed: uiLang === 'en'
        ? 'Provide a detailed summary of the following text. Include all key points, main arguments, and conclusions. Use headings and structure.'
        : '对以下文本进行详细摘要，包含所有关键论点、主要观点和结论，使用标题和结构化格式。',
      bullets: uiLang === 'en'
        ? 'Extract the key points from the following text as a bullet point list. Each point should be one clear, actionable sentence.'
        : '从以下文本中提取关键要点，以要点列表形式呈现，每个要点用一句清晰的话表达。',
    }

    try {
      const messages = [
        { role: 'system' as const, content: modePrompts[mode] },
        { role: 'user' as const, content: input },
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

          {/* Mode Selector */}
          <div className="flex gap-3 mb-6 flex-wrap">
            {t.modes.map(m => (
              <button
                key={m.key}
                onClick={() => setMode(m.key)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition ${mode === m.key ? 'border-primary-400 bg-primary-50 text-primary-700' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'}`}
              >
                <span className="text-lg">{m.icon}</span>
                <div className="text-left">
                  <div className="text-sm font-medium">{m.label}</div>
                  <div className="text-xs text-gray-400">{m.desc}</div>
                </div>
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Input */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.placeholder}
                rows={16}
                className="w-full resize-none outline-none text-sm text-gray-800 placeholder:text-gray-300"
              />
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <span className="text-xs text-gray-400">{input.length} {t.chars}</span>
                <button
                  onClick={handleSummarize}
                  disabled={loading || !input.trim()}
                  className="px-6 py-2.5 rounded-xl bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 disabled:opacity-50 transition"
                >
                  {loading ? t.summarizing : t.summarize}
                </button>
              </div>
            </div>

            {/* Output */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-700">{t.output}</h3>
                {result && (
                  <button onClick={handleCopy} className="text-xs text-primary-600 hover:text-primary-700">
                    {copied ? t.copied : t.copy}
                  </button>
                )}
              </div>
              {result ? (
                <div className="markdown-body text-sm text-gray-800 max-h-[500px] overflow-y-auto">
                  <ReactMarkdown>{result}</ReactMarkdown>
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 text-gray-300">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📝</div>
                    <p className="text-sm">{uiLang === 'en' ? 'Summary will appear here' : '摘要将显示在这里'}</p>
                  </div>
                </div>
              )}
              {error && (
                <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
                  ❌ {error}
                </div>
              )}
            </div>
          </div>
        </main>
      </ApiKeyGuard>
    </div>
  )
}
