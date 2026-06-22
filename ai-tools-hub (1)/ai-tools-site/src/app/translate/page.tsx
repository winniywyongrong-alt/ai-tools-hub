'use client'

import { useState } from 'react'
import Link from 'next/link'
import ApiKeyGuard from '@/components/ApiKeyGuard'
import { callAIStream } from '@/lib/ai'

const LANGUAGES = [
  { code: 'auto', labelEn: 'Auto Detect', labelZh: '自动检测' },
  { code: 'en', labelEn: 'English', labelZh: '英语' },
  { code: 'zh', labelEn: 'Chinese', labelZh: '中文' },
  { code: 'ja', labelEn: 'Japanese', labelZh: '日语' },
  { code: 'ko', labelEn: 'Korean', labelZh: '韩语' },
  { code: 'fr', labelEn: 'French', labelZh: '法语' },
  { code: 'de', labelEn: 'German', labelZh: '德语' },
  { code: 'es', labelEn: 'Spanish', labelZh: '西班牙语' },
  { code: 'pt', labelEn: 'Portuguese', labelZh: '葡萄牙语' },
  { code: 'ru', labelEn: 'Russian', labelZh: '俄语' },
  { code: 'ar', labelEn: 'Arabic', labelZh: '阿拉伯语' },
  { code: 'th', labelEn: 'Thai', labelZh: '泰语' },
  { code: 'vi', labelEn: 'Vietnamese', labelZh: '越南语' },
]

export default function TranslatePage() {
  const [uiLang, setUiLang] = useState<'en' | 'zh'>('en')
  const [sourceLang, setSourceLang] = useState('auto')
  const [targetLang, setTargetLang] = useState('zh')
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const t = uiLang === 'en' ? {
    title: '🌐 AI Translator',
    subtitle: 'Translate between 50+ languages with AI precision',
    from: 'From',
    to: 'To',
    placeholder: 'Enter text to translate...',
    translate: '✨ Translate',
    translating: 'Translating...',
    copy: '📋 Copy',
    copied: '✅ Copied!',
    swap: '🔄 Swap',
    output: 'Translation',
  } : {
    title: '🌐 AI 翻译',
    subtitle: '支持 50+ 语言，AI 精准翻译',
    from: '从',
    to: '译为',
    placeholder: '输入要翻译的文本...',
    translate: '✨ 翻译',
    translating: '翻译中...',
    copy: '📋 复制',
    copied: '✅ 已复制！',
    swap: '🔄 互换',
    output: '译文',
  }

  const getLangLabel = (code: string) => {
    const lang = LANGUAGES.find(l => l.code === code)
    return uiLang === 'en' ? lang?.labelEn : lang?.labelZh
  }

  const handleTranslate = async () => {
    if (!input.trim()) return
    setLoading(true)
    setError('')
    setResult('')

    const targetLabel = getLangLabel(targetLang)
    const sourceLabel = sourceLang === 'auto' ? 'the detected language' : getLangLabel(sourceLang)

    try {
      const messages = [
        {
          role: 'system' as const,
          content: `You are a professional translator. Translate the following text from ${sourceLabel} to ${targetLabel}. Output ONLY the translation, nothing else. Maintain the original tone, style, and formatting.`
        },
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

  const handleSwap = () => {
    if (sourceLang === 'auto') return
    const tmp = sourceLang
    setSourceLang(targetLang)
    setTargetLang(tmp)
    setInput(result)
    setResult('')
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

          {/* Language Selectors */}
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <div className="flex-1 min-w-[140px]">
              <label className="block text-xs text-gray-500 mb-1">{t.from}</label>
              <select
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:border-primary-400 outline-none"
              >
                {LANGUAGES.map(l => (
                  <option key={l.code} value={l.code}>{uiLang === 'en' ? l.labelEn : l.labelZh}</option>
                ))}
              </select>
            </div>
            <button onClick={handleSwap} className="mt-5 p-2 rounded-full hover:bg-gray-100 transition text-lg" title={t.swap}>
              🔄
            </button>
            <div className="flex-1 min-w-[140px]">
              <label className="block text-xs text-gray-500 mb-1">{t.to}</label>
              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:border-primary-400 outline-none"
              >
                {LANGUAGES.filter(l => l.code !== 'auto').map(l => (
                  <option key={l.code} value={l.code}>{uiLang === 'en' ? l.labelEn : l.labelZh}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Input */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.placeholder}
                rows={12}
                className="w-full resize-none outline-none text-sm text-gray-800 placeholder:text-gray-300"
              />
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <span className="text-xs text-gray-400">{input.length} chars</span>
                <button
                  onClick={handleTranslate}
                  disabled={loading || !input.trim()}
                  className="px-6 py-2.5 rounded-xl bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 disabled:opacity-50 transition"
                >
                  {loading ? t.translating : t.translate}
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
                <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap max-h-[400px] overflow-y-auto">
                  {result}
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 text-gray-300">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🌐</div>
                    <p className="text-sm">{uiLang === 'en' ? 'Translation will appear here' : '译文将显示在这里'}</p>
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
