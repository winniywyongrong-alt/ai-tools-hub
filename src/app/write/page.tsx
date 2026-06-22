'use client'

import { useState } from 'react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import ApiKeyGuard from '@/components/ApiKeyGuard'
import { callAIStream } from '@/lib/ai'

const PRESETS = {
  en: [
    { label: 'Blog Post', prompt: 'Write a well-structured blog post about the following topic. Use headings, bullet points, and a compelling introduction.' },
    { label: 'Email', prompt: 'Write a professional email about the following. Keep it concise and clear.' },
    { label: 'Social Media', prompt: 'Write an engaging social media post (Twitter/LinkedIn style) about the following. Include relevant hashtags.' },
    { label: 'Product Description', prompt: 'Write a compelling product description that highlights key benefits and features.' },
    { label: 'Resume/Cover Letter', prompt: 'Help me write a professional resume bullet point or cover letter paragraph based on the following.' },
    { label: 'Custom', prompt: '' },
  ],
  zh: [
    { label: '公众号文章', prompt: '写一篇结构清晰的公众号文章，包含引人入胜的开头、小标题分段、要点总结。' },
    { label: '工作邮件', prompt: '写一封专业的工作邮件，简洁明了，重点突出。' },
    { label: '小红书文案', prompt: '写一篇小红书风格的种草文案，包含emoji、分段、吸引人的标题。' },
    { label: '产品介绍', prompt: '写一段有吸引力的产品介绍文案，突出核心卖点和用户利益。' },
    { label: '短视频脚本', prompt: '写一个短视频脚本，包含开头hook、内容主体、结尾引导。' },
    { label: '自定义', prompt: '' },
  ],
}

export default function WritePage() {
  const [lang, setLang] = useState<'en' | 'zh'>('en')
  const [preset, setPreset] = useState(0)
  const [topic, setTopic] = useState('')
  const [customPrompt, setCustomPrompt] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const t = lang === 'en' ? {
    title: '✍️ AI Writer',
    subtitle: 'Generate high-quality content in seconds',
    topicLabel: 'What do you want to write about?',
    topicPlaceholder: 'e.g., How to start a side hustle in 2025',
    customLabel: 'Custom instructions (optional)',
    customPlaceholder: 'Any specific requirements...',
    generate: '✨ Generate',
    generating: 'Generating...',
    copy: '📋 Copy',
    copied: '✅ Copied!',
    clear: '🗑️ Clear',
    presets: 'Content Type',
  } : {
    title: '✍️ AI 写作助手',
    subtitle: '秒级生成高质量内容',
    topicLabel: '你想写什么？',
    topicPlaceholder: '例如：2025年最值得尝试的副业方向',
    customLabel: '自定义指令（可选）',
    customPlaceholder: '有什么特殊要求...',
    generate: '✨ 开始生成',
    generating: '生成中...',
    copy: '📋 复制',
    copied: '✅ 已复制！',
    clear: '🗑️ 清空',
    presets: '内容类型',
  }

  const presets = PRESETS[lang]

  const handleGenerate = async () => {
    if (!topic.trim()) return
    setLoading(true)
    setError('')
    setResult('')

    try {
      const selectedPreset = presets[preset]
      const systemPrompt = selectedPrompt || selectedPreset.prompt

      const messages = [
        { role: 'system' as const, content: systemPrompt },
        { role: 'user' as const, content: topic },
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

  const selectedPrompt = preset === presets.length - 1 ? customPrompt : presets[preset].prompt

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
            <button onClick={() => setLang(lang === 'en' ? 'zh' : 'en')} className="px-3 py-1.5 text-sm rounded-full bg-primary-100 text-primary-700 hover:bg-primary-200 transition font-medium">
              {lang === 'en' ? '中文' : 'EN'}
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

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Input Panel */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5">
              {/* Preset Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.presets}</label>
                <div className="flex flex-wrap gap-2">
                  {presets.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => setPreset(i)}
                      className={`px-3 py-1.5 text-sm rounded-lg transition ${preset === i ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Topic */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.topicLabel}</label>
                <textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder={t.topicPlaceholder}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition text-sm resize-none"
                />
              </div>

              {/* Custom Prompt */}
              {preset === presets.length - 1 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.customLabel}</label>
                  <textarea
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder={t.customPlaceholder}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition text-sm resize-none"
                  />
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleGenerate}
                  disabled={loading || !topic.trim()}
                  className="flex-1 py-3 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                      {t.generating}
                    </span>
                  ) : t.generate}
                </button>
                <button onClick={() => { setTopic(''); setResult(''); setError('') }} className="px-4 py-3 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition">
                  {t.clear}
                </button>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
                  ❌ {error}
                </div>
              )}
            </div>

            {/* Output Panel */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-700">Output</h3>
                {result && (
                  <button onClick={handleCopy} className="text-sm text-primary-600 hover:text-primary-700 transition">
                    {copied ? t.copied : t.copy}
                  </button>
                )}
              </div>
              {result ? (
                <div className="markdown-body text-sm text-gray-800 max-h-[600px] overflow-y-auto">
                  <ReactMarkdown>{result}</ReactMarkdown>
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 text-gray-300">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📝</div>
                    <p className="text-sm">{lang === 'en' ? 'Your content will appear here' : '生成的内容将显示在这里'}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </ApiKeyGuard>
    </div>
  )
}
