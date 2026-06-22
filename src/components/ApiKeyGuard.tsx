'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function ApiKeyGuard({ children }: { children: React.ReactNode }) {
  const [hasKey, setHasKey] = useState<boolean | null>(null)

  useEffect(() => {
    setHasKey(!!localStorage.getItem('ai_api_key'))
  }, [])

  if (hasKey === null) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    )
  }

  if (!hasKey) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-5xl mb-4">🔑</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">API Key Required</h2>
          <p className="text-gray-500 mb-6">
            You need to set your API key before using this tool. It&apos;s stored locally and never sent to our servers.
          </p>
          <Link
            href="/settings"
            className="inline-block px-6 py-3 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 transition"
          >
            ⚙️ Set API Key
          </Link>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
