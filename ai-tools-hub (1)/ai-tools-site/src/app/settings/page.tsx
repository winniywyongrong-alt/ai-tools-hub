'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Settings() {
  const [apiKey, setApiKey] = useState('')
  const [baseUrl, setBaseUrl] = useState('')
  const [model, setModel] = useState('')
  const [saved, setSaved] = useState(false)
  const [showKey, setShowKey] = useState(false)

  useEffect(() => {
    setApiKey(localStorage.getItem('ai_api_key') || '')
    setBaseUrl(localStorage.getItem('ai_base_url') || '')
    setModel(localStorage.getItem('ai_model') || '')
  }, [])

  const handleSave = () => {
    localStorage.setItem('ai_api_key', apiKey.trim())
    localStorage.setItem('ai_base_url', baseUrl.trim())
    localStorage.setItem('ai_model', model.trim())
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleClear = () => {
    localStorage.removeItem('ai_api_key')
    localStorage.removeItem('ai_base_url')
    localStorage.removeItem('ai_model')
    setApiKey('')
    setBaseUrl('')
    setModel('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="sticky top-0 z-50 glass border-b border-white/20">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary-700">
            <span className="text-2xl">🤖</span> AI Tools Hub
          </Link>
          <Link href="/" className="text-sm text-gray-500 hover:text-primary-600 transition">
            ← Back
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">⚙️ API Settings</h1>
        <p className="text-gray-500 mb-8">
          Your API key is stored locally in your browser. It never leaves your device.
        </p>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
          {/* API Key */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              API Key <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-xxxxxxxxxxxxxxxx"
                className="w-full px-4 py-3 pr-20 rounded-xl border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition text-sm"
              />
              <button
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400 hover:text-gray-600"
              >
                {showKey ? '🙈 Hide' : '👁️ Show'}
              </button>
            </div>
            <p className="mt-1.5 text-xs text-gray-400">
              Supports OpenAI, DeepSeek, Moonshot, and any OpenAI-compatible API.
            </p>
          </div>

          {/* Base URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              API Base URL <span className="text-gray-400">(optional)</span>
            </label>
            <input
              type="text"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder="https://api.openai.com/v1"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition text-sm"
            />
            <p className="mt-1.5 text-xs text-gray-400">
              For DeepSeek: https://api.deepseek.com/v1 &nbsp;|&nbsp; Moonshot: https://api.moonshot.cn/v1
            </p>
          </div>

          {/* Model */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Model <span className="text-gray-400">(optional)</span>
            </label>
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="gpt-3.5-turbo"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition text-sm"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {['gpt-3.5-turbo', 'gpt-4o-mini', 'gpt-4o', 'deepseek-chat', 'moonshot-v1-8k'].map(m => (
                <button
                  key={m}
                  onClick={() => setModel(m)}
                  className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-600 hover:bg-primary-100 hover:text-primary-700 transition"
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={!apiKey.trim()}
              className="flex-1 py-3 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {saved ? '✅ Saved!' : '💾 Save Settings'}
            </button>
            <button
              onClick={handleClear}
              className="px-6 py-3 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition"
            >
              🗑️ Clear
            </button>
          </div>
        </div>

        {/* Info Cards */}
        <div className="mt-8 grid gap-4">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <h3 className="font-bold text-blue-900 mb-1">🔒 Privacy Guarantee</h3>
            <p className="text-sm text-blue-700">
              Your API key is stored only in your browser&apos;s localStorage. It is sent directly to the AI provider&apos;s API — our server acts as a simple proxy and never logs or stores your key.
            </p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <h3 className="font-bold text-green-900 mb-1">💡 Where to get an API Key?</h3>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• OpenAI: <a href="https://platform.openai.com/api-keys" target="_blank" className="underline">platform.openai.com</a></li>
              <li>• DeepSeek: <a href="https://platform.deepseek.com" target="_blank" className="underline">platform.deepseek.com</a> (very cheap)</li>
              <li>• Moonshot: <a href="https://platform.moonshot.cn" target="_blank" className="underline">platform.moonshot.cn</a></li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
