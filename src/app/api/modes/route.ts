import { NextRequest, NextResponse } from "next/server"
import { buildModeMessages } from "@/lib/ai/prompts"

export const runtime = "edge"

interface ModeRequest {
  locale: string
  mode: "smooth" | "funny" | "short" | "nerd" | "savage"
  userNotes?: string
  extractedScreenshotText?: string
}

export async function POST(req: NextRequest) {
  try {
    const body: ModeRequest = await req.json()
    const { locale, mode, userNotes, extractedScreenshotText } = body

    if (!mode) {
      return NextResponse.json(
        { error: "mode is required" },
        { status: 400 }
      )
    }

    // Build messages using DonLeo mode prompts
    const messages = buildModeMessages({
      locale: locale || "en",
      mode,
      userNotes,
      extractedScreenshotText,
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
    //   max_tokens: 800,
    // })
    // const response = completion.choices[0]?.message?.content || ""
    // ============================================================

    // Mock response for development - remove when connecting to real LLM
    // This should follow the mode output structure:
    // Quick read: <1–2 lines>
    // A) <reply>
    // B) <reply>
    // C) <reply>
    // If they reply: <one follow-up suggestion>
    // Tip: <one line>

    const mockResponses: Record<string, string> = {
      smooth: `Quick read: They're interested, just testing the waters.

A) I've really enjoyed our conversation. Want to grab coffee this weekend?

B) You seem cool — dinner and drinks this Friday?

C) I'd love to continue this in person. Free for dinner soon?

If they reply: Suggest a specific place and time.

Tip: Keep it confident but chill. Clear intent > clever lines.`,

      funny: `Quick read: Energy's good, time to make them laugh.

A) Are you a magician? Because whenever I look at your photos, everyone else disappears ✨

B) On a scale of 1 to America, how free are you for drinks tonight? 🇺🇸

C) I'd tell you a joke about pizza, but it's a little too cheesy... unlike us maybe? 🍕

If they reply: Play along and set up the date.

Tip: Funny works, but follow up with a real ask.`,

      short: `Quick read: Less is more here.

A) You've got great vibe.

B) Love that. Same energy.

C) Tell me more over drinks?

If they reply: One word answers = interested but shy. Lead.

Tip: High impact texts look the most real.`,

      nerd: `Quick read: Smart references will land well.

A) That's totally something Ted Lasso would say. Are you secretly a fan too?

B) You seem cool — this is coming from someone who's seen The Office 7 times, so trust my judgment.

C) I have a theory you're a Marvel fan. Prove me wrong over drinks?

If they reply: Lean into the shared interest.

Tip: Mainstream references work best. Keep it inclusive.`,

      savage: `Quick read: They can handle some playful teasing.

A) Bold of you to assume I have plans this weekend. So... what are we doing?

B) I'd ask for your Netflix password, but I'd rather just take you out instead.

C) Most people bore me in 5 minutes. You've managed to keep me interested. Impressive.

If they reply: Stay confident but not arrogant.

Tip: Teasing is hot; disrespect is not. Know the line.`,
    }

    const response = mockResponses[mode] || mockResponses.smooth

    return NextResponse.json({
      response,
      mode,
      messagesUsed: messages, // For debugging - remove in production
    })
  } catch (error) {
    console.error("Modes API error:", error)
    return NextResponse.json(
      { error: "Failed to process mode request" },
      { status: 500 }
    )
  }
}
