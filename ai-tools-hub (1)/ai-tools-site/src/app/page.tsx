'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const LANGS = {
  en: {
    title: 'AI Tools Hub',
    subtitle: 'Free AI-powered tools. Bring your own API key for unlimited usage.',
    badge: '100% Free · No Registration · Privacy First',
    tools: [
      {
        icon: '✍️',
        name: 'AI Writer',
        desc: 'Generate articles, emails, social media posts, and more with AI assistance.',
        href: '/write',
        tag: 'Popular'
      },
      {
        icon: '🌐',
        name: 'AI Translator',
        desc: 'Translate text between 50+ languages with natural, context-aware results.',
        href: '/translate',
        tag: 'Popular'
      },
      {
        icon: '📝',
        name: 'AI Summarizer',
        desc: 'Instantly condense long articles, papers, and documents into key points.',
        href: '/summarize',
        tag: 'Useful'
      },
      {
        icon: '💡',
        name: 'AI Ideas',
        desc: 'Brainstorm business ideas, project names, content topics, and creative concepts.',
        href: '/ideas',
        tag: 'New'
      },
    ],
    howItWorks: 'How It Works',
    steps: [
      { icon: '🔑', title: 'Add Your API Key', desc: 'Paste your OpenAI-compatible API key. It stays in your browser — we never store it.' },
      { icon: '⚡', title: 'Choose a Tool', desc: 'Pick the AI tool you need: writing, translation, summarization, or brainstorming.' },
      { icon: '🚀', title: 'Get Results', desc: 'Get instant, high-quality AI output. Use it however you want.' },
    ],
    whyUs: 'Why Choose Us?',
    features: [
      { icon: '🆓', title: 'Truly Free', desc: 'No hidden fees. No credit card. Just bring your own API key.' },
      { icon: '🔒', title: 'Privacy First', desc: 'Your API key never leaves your browser. We store nothing on our servers.' },
      { icon: '🌍', title: 'Bilingual', desc: 'Full support for both English and Chinese users.' },
      { icon: '⚡', title: 'Lightning Fast', desc: 'Direct API connection means no middleman delays.' },
    ],
    footer: 'Built with ❤️ · Your API Key, Your Data',
    switchLang: '中文',
  },
  zh: {
    title: 'AI 工具站',
    subtitle: '免费 AI 工具，自带 API Key 即可无限使用。',
    badge: '完全免费 · 无需注册 · 隐私优先',
    tools: [
      {
        icon: '✍️',
        name: 'AI 写作',
        desc: '一键生成文章、邮件、社交媒体文案，多种风格任你选。',
        href: '/write',
        tag: '热门'
      },
      {
        icon: '🌐',
        name: 'AI 翻译',
        desc: '支持 50+ 语言互译，翻译自然流畅，语境感知。',
        href: '/translate',
        tag: '热门'
      },
      {
        icon: '📝',
        name: 'AI 摘要',
        desc: '长文章、论文、报告一键提炼核心要点。',
        href: '/summarize',
        tag: '实用'
      },
      {
        icon: '💡',
        name: 'AI 灵感',
        desc: '头脑风暴利器：创业点子、项目命名、内容选题、创意构思。',
        href: '/ideas',
        tag: '新功能'
      },
    ],
    howItWorks: '如何使用',
    steps: [
      { icon: '🔑', title: '填入 API Key', desc: '粘贴你的 OpenAI 兼容 API Key，数据仅存于浏览器，绝不上传服务器。' },
      { icon: '⚡', title: '选择工具', desc: '选择需要的 AI 工具：写作、翻译、摘要或头脑风暴。' },
      { icon: '🚀', title: '获取结果', desc: '即时获得高质量 AI 输出，随意使用。' },
    ],
    whyUs: '为什么选择我们？',
    features: [
      { icon: '🆓', title: '真正免费', desc: '无隐藏费用，无需信用卡，自带 API Key 即可使用。' },
      { icon: '🔒', title: '隐私优先', desc: 'API Key 仅存于浏览器本地，服务器端不存储任何数据。' },
      { icon: '🌍', title: '中英双语', desc: '完整支持中文和英文用户，界面/功能全双语。' },
      { icon: '⚡', title: '极速响应', desc: '直连 API，无中间商延迟，体验丝滑。' },
    ],
    footer: '用 ❤️ 打造 · 你的 Key，你的数据',
    switchLang: 'EN',
  }
}

export default function Home() {
  const [lang, setLang] = useState<'en' | 'zh'>('en')
  const t = LANGS[lang]

  useEffect(() => {
    const saved = localStorage.getItem('lang') as 'en' | 'zh'
    if (saved) setLang(saved)
  }, [])

  const toggleLang = () => {
    const next = lang === 'en' ? 'zh' : 'en'
    setLang(next)
    localStorage.setItem('lang', next)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-white/20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary-700">
            <span className="text-2xl">🤖</span> AI Tools Hub
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/settings" className="text-sm text-gray-500 hover:text-primary-600 transition">
              ⚙️ API Key
            </Link>
            <button
              onClick={toggleLang}
              className="px-3 py-1.5 text-sm rounded-full bg-primary-100 text-primary-700 hover:bg-primary-200 transition font-medium"
            >
              {t.switchLang}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 pt-16 pb-12 text-center">
        <div className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-primary-700 bg-primary-100 rounded-full">
          {t.badge}
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent mb-4">
          {t.title}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          {t.subtitle}
        </p>
      </section>

      {/* Tools Grid */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 gap-6">
          {t.tools.map((tool) => (
            <Link
              key={tool.name}
              href={tool.href}
              className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary-200 hover:-translate-y-1"
            >
              <div className="absolute top-4 right-4">
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary-50 text-primary-600">
                  {tool.tag}
                </span>
              </div>
              <div className="text-4xl mb-4">{tool.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition">
                {tool.name}
              </h3>
              <p className="text-gray-500 leading-relaxed">
                {tool.desc}
              </p>
              <div className="mt-4 text-primary-600 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                {lang === 'en' ? 'Try it now' : '立即使用'} →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{t.howItWorks}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {t.steps.map((step, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 text-3xl bg-primary-100 rounded-2xl flex items-center justify-center">
                {step.icon}
              </div>
              <div className="text-sm font-bold text-primary-600 mb-1">
                {lang === 'en' ? `Step ${i + 1}` : `步骤 ${i + 1}`}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Us */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">{t.whyUs}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.features.map((f, i) => (
            <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="text-2xl mb-3">{f.icon}</div>
              <h3 className="font-bold text-gray-900 mb-1">{f.title}</h3>
              <p className="text-sm text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 text-center text-sm text-gray-400">
        {t.footer}
      </footer>
    </div>
  )
}
