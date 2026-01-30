"use client"

import React from "react"
import { Link } from '@/i18n/routing'
import { useLocale } from 'next-intl'
import { useTranslations } from 'next-intl'
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import { ChatUI } from "@/components/chat/chat-ui"
import { useMockChat } from "@/hooks/use-mock-chat"

export default function WingmanChatPage() {
  const t = useTranslations('chat')
  const locale = useLocale()
  const { messages, sendMessage, isLoading } = useMockChat(locale as any)

  return (
    <div className="flex h-screen flex-col">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 border-b border-cardBorder bg-surface/80 backdrop-blur-md">
        <div className="flex items-center gap-3 px-4 py-3 md:px-8">
          <Link
            href="/app/wingman"
            locale={locale}
            className="flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface2 hover:text-text"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cardBorder bg-surface2 overflow-hidden">
                <Image
                  src="/donleo-avatar.png"
                  alt="DonLeo"
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3 items-center justify-center rounded-full border-2 border-background bg-green-500">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              </div>
            </div>
            <div>
              <p className="text-body-md font-medium text-text">{t('title')}</p>
              <p className="text-body-sm text-muted">{t('online')}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Chat UI */}
      <div className="flex-1 bg-background">
        <ChatUI
          messages={messages}
          onSendMessage={sendMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}
