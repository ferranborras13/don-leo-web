"use client"

import React, { useRef, useEffect } from "react"
import { Send, Paperclip, Smile } from "lucide-react"
import { useTranslations } from 'next-intl'
import { cn } from "@/lib/utils"
import { Message } from "@/types"

interface ChatUIProps {
  messages: Message[]
  onSendMessage: (content: string) => void
  isLoading?: boolean
  className?: string
}

export function ChatUI({
  messages,
  onSendMessage,
  isLoading = false,
  className,
}: ChatUIProps) {
  const t = useTranslations('chat')
  const [input, setInput] = React.useState("")
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const quickActions = [
    { label: t('actions.analyze'), message: "Can you analyze this conversation for me?" },
    { label: t('actions.reply'), message: "Help me come up with a good reply" },
    { label: t('actions.rewrite'), message: "Can you help me rewrite this message?" },
    { label: t('actions.thinking'), message: "What do you think they're actually thinking?" },
  ]

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim())
      setInput("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleQuickAction = (message: string) => {
    if (!isLoading) {
      onSendMessage(message)
    }
  }

  return (
    <div className={cn("flex h-full flex-col", className)}>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-3xl px-4 py-3",
                  message.role === "user"
                    ? "bg-accentCTA text-white"
                    : "bg-surface2 text-text"
                )}
              >
                <p className="text-body-md whitespace-pre-wrap">
                  {message.content}
                </p>
                <p
                  className={cn(
                    "mt-1 text-body-sm",
                    message.role === "user" ? "text-white/70" : "text-muted"
                  )}
                >
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-3xl bg-surface2 px-4 py-3">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-muted" />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-muted [animation-delay:0.2s]" />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-muted [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-cardBorder bg-surface p-4">
        {/* Quick Actions */}
        {messages.length <= 1 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {quickActions.map((action, i) => (
              <button
                key={i}
                onClick={() => handleQuickAction(action.message)}
                disabled={isLoading}
                className="rounded-full bg-accentSoft px-3 py-1.5 text-body-sm text-accent transition-colors hover:bg-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {action.label}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex items-end gap-3">
          <button
            type="button"
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface2 hover:text-text"
          >
            <Paperclip className="h-5 w-5" />
          </button>
          <div className="relative flex-1">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('placeholder')}
              rows={1}
              className="w-full resize-none rounded-2xl bg-surface2 px-4 py-3 text-body-md text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
              style={{ minHeight: "44px", maxHeight: "120px" }}
            />
          </div>
          <button
            type="button"
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface2 hover:text-text"
          >
            <Smile className="h-5 w-5" />
          </button>
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-accentCTA text-white transition-colors hover:bg-accentPressed disabled:pointer-events-none disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  )
}
