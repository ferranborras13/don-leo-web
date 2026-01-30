"use client"

import React, { useState } from "react"
import { useLocale, useTranslations } from 'next-intl'
import { Sparkles, RefreshCw, Copy, Check } from "lucide-react"
import { UploadDropzone } from "@/components/ui/upload-dropzone"
import { PastelTile } from "@/components/ui/pastel-tile"
import { PrimaryCTA } from "@/components/ui/primary-cta"
import { UploadedImage, RizzResponse } from "@/types"
import { getModeResponses, Locale } from "@/lib/responses"

// Get localized rizz modes
const getLocalizedRizzModes = (t: any) => [
  {
    id: "smooth",
    name: t('smooth'),
    variant: "cream" as const,
  },
  {
    id: "funny",
    name: t('funny'),
    variant: "pink" as const,
  },
  {
    id: "short",
    name: t('short'),
    variant: "lavender" as const,
  },
  {
    id: "nerd",
    name: t('nerd'),
    variant: "mint" as const,
  },
  {
    id: "savage",
    name: t('savage'),
    variant: "ice" as const,
    fullWidth: true,
  },
]

// AI response generator using DonLeo prompts via API
const generateResponses = async (mode: string, locale: Locale, userNotes?: string, extractedText?: string): Promise<RizzResponse[]> => {
  try {
    const response = await fetch("/api/modes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        locale,
        mode: mode as 'smooth' | 'funny' | 'short' | 'nerd' | 'savage',
        userNotes,
        extractedScreenshotText: extractedText,
      }),
    })

    if (!response.ok) {
      throw new Error("Modes API request failed")
    }

    const data = await response.json()

    // Parse the A/B/C structure from the AI response
    const lines = data.response.split('\n')
    const parsedResponses: RizzResponse[] = []
    const optionRegex = /^[ABC]\)\s*(.+)$/

    for (const line of lines) {
      const match = line.match(optionRegex)
      if (match) {
        parsedResponses.push({
          id: `${mode}-${Date.now()}-${parsedResponses.length}`,
          mode: mode,
          content: match[1].trim(),
        })
      }
    }

    // If parsing failed or no responses found, return the full response as a single option
    if (parsedResponses.length === 0) {
      return [{
        id: `${mode}-${Date.now()}-0`,
        mode: mode,
        content: data.response,
      }]
    }

    return parsedResponses
  } catch (error) {
    console.error("Mode generation error:", error)

    // Fallback to mock responses on error
    const responses = getModeResponses(locale, mode as 'smooth' | 'funny' | 'short' | 'nerd' | 'savage')
    return responses
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(Math.random() * 3) + 3)
      .map((content, i) => ({
        id: `${mode}-${Date.now()}-${i}`,
        mode: mode,
        content
      }))
  }
}

export default function RizzPage() {
  const t = useTranslations()
  const tRizz = useTranslations('rizz')
  const tModes = useTranslations('modes')
  const locale = useLocale() as Locale

  const rizzModes = getLocalizedRizzModes(tModes)
  const [images, setImages] = useState<UploadedImage[]>([])
  const [selectedMode, setSelectedMode] = useState<string | null>(null)
  const [responses, setResponses] = useState<RizzResponse[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!selectedMode || images.length === 0) return

    setIsGenerating(true)

    // Call the mode generation API
    const newResponses = await generateResponses(selectedMode, locale)
    setResponses(newResponses)
    setIsGenerating(false)
  }

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleRefresh = async () => {
    if (!selectedMode) return

    setIsGenerating(true)
    const newResponses = await generateResponses(selectedMode, locale)
    setResponses(newResponses)
    setIsGenerating(false)
  }

  const getModeName = (modeKey: string) => {
    return tModes(modeKey)
  }

  return (
    <div className="px-4 py-6 md:px-8 md:py-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accentSoft">
            <Sparkles className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h1 className="text-heading-xl text-text">{tRizz('title')}</h1>
            <p className="text-body-md text-muted">
              {tRizz('subtitle')}
            </p>
          </div>
        </div>

        {/* Upload Section */}
        <div className="mb-8">
          <h2 className="text-heading-md mb-4 text-text">
            {tRizz('step1')}
          </h2>
          <UploadDropzone
            images={images}
            onImagesChange={setImages}
            maxImages={3}
          />
        </div>

        {/* Mode Selection */}
        <div className="mb-8">
          <h2 className="text-heading-md mb-4 text-text">
            {tRizz('step2')}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {rizzModes.map((mode) => (
              <PastelTile
                key={mode.id}
                variant={mode.variant}
                title={mode.name}
                selected={selectedMode === mode.id}
                onClick={() => setSelectedMode(mode.id)}
                fullWidth={mode.fullWidth}
              />
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <div className="mb-8">
          <PrimaryCTA
            size="large"
            onClick={handleGenerate}
            disabled={!selectedMode || images.length === 0 || isGenerating}
            isLoading={isGenerating}
            className="w-full sm:w-auto"
          >
            {isGenerating ? tRizz('generating') : tRizz('generateBtn')}
          </PrimaryCTA>
        </div>

        {/* Responses */}
        {responses.length > 0 && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-heading-md text-text">
                {tRizz('step3')}
              </h2>
              <button
                onClick={handleRefresh}
                disabled={isGenerating}
                className="flex items-center gap-2 text-body-md text-accent hover:text-accentPressed transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
                {tRizz('moreOptions')}
              </button>
            </div>
            <div className="space-y-4">
              {responses.map((response) => (
                <div
                  key={response.id}
                  className="rounded-3xl border border-cardBorder bg-surface p-6"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="rounded-full bg-accentSoft px-3 py-1 text-body-sm text-accent">
                      {getModeName(response.mode)}
                    </span>
                    <button
                      onClick={() => handleCopy(response.content, response.id)}
                      className="flex items-center gap-1 rounded-full bg-surface2 px-3 py-1 text-body-sm text-muted hover:text-text transition-colors"
                    >
                      {copiedId === response.id ? (
                        <>
                          <Check className="h-3 w-3" />
                          {tRizz('copied')}
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          {tRizz('copy')}
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-body-lg text-text">{response.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {responses.length === 0 && !isGenerating && (
          <div className="rounded-3xl border-2 border-dashed border-cardBorder bg-surface/50 p-12 text-center">
            <Sparkles className="mx-auto mb-4 h-12 w-12 text-muted" />
            <p className="text-body-lg text-muted">
              {tRizz('emptyState')}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
