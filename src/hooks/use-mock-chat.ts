"use client"

import { useState } from "react"
import { Message } from "@/types"
import { Locale } from "@/i18n/request"
import { getResponses } from "@/lib/responses"

export function useMockChat(locale: Locale = 'en') {
  const responses = getResponses(locale)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "leo",
      content: responses.greetings[0],
      timestamp: new Date(Date.now() - 60000 * 5),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])

    // Call DonLeo Chat API
    setIsLoading(true)
    try {
      // Convert messages to format expected by API
      const chatHistory = messages
        .filter(m => m.role !== "system")
        .map(m => ({
          role: m.role === "leo" ? "assistant" as const : "user" as const,
          content: m.content,
        }))

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale,
          chatHistory,
          userMessage: content,
        }),
      })

      if (!response.ok) {
        throw new Error("Chat API request failed")
      }

      const data = await response.json()

      const leoMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "leo",
        content: data.response,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, leoMessage])
    } catch (error) {
      console.error("Chat error:", error)

      // Fallback to mock response on error
      const leoMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "leo",
        content: "Hey! I'm having some trouble connecting right now. Try again in a moment?",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, leoMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return { messages, sendMessage, isLoading }
}
