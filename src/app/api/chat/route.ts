import { NextRequest, NextResponse } from "next/server"
import { buildChatMessages } from "@/lib/ai/prompts"

export const runtime = "edge"

interface ChatRequest {
  locale: string
  chatHistory: Array<{ role: "user" | "assistant"; content: string }>
  userMessage: string
}

export async function POST(req: NextRequest) {
  try {
    const body: ChatRequest = await req.json()
    const { locale, chatHistory, userMessage } = body

    if (!userMessage) {
      return NextResponse.json(
        { error: "userMessage is required" },
        { status: 400 }
      )
    }

    // Build messages using DonLeo prompts
    const messages = buildChatMessages({
      locale: locale || "en",
      chatHistory: chatHistory || [],
      userMessage,
    })

    // ============================================================
    // TODO: Replace with actual LLM API call
    //
    // Example with OpenAI SDK:
    //
    // import OpenAI from 'openai'
    // const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    //
    // const completion = await openai.chat.completions.create({
    //   model: "gpt-4o-mini",
    //   messages: messages.map(m => ({
    //     role: m.role,
    //     content: m.content
    //   })),
    //   temperature: 0.85,
    //   presence_penalty: 0.6,
    //   frequency_penalty: 0.4,
    //   max_tokens: 500,
    // })
    // const response = completion.choices[0]?.message?.content || "No response"
    // ============================================================

    // Mock response for development - remove when connecting to real LLM
    const mockResponses = [
      "I hear you. What's the specific situation?",
      "Got it. Tell me more — what did they say exactly?",
      "Interesting. What are you thinking of doing next?",
      "I'm listening. What's on your mind?",
    ]
    const response = mockResponses[Math.floor(Math.random() * mockResponses.length)]

    return NextResponse.json({
      response,
      messagesUsed: messages, // For debugging - remove in production
    })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    )
  }
}
