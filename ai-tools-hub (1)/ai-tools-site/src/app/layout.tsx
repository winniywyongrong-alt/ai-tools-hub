import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Tools Hub - Free AI Writing, Translation & More',
  description: 'Free AI-powered tools for writing, translation, and text summarization. Bring your own API key for unlimited usage.',
  keywords: 'AI tools, AI writing, AI translation, text summarizer, free AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
