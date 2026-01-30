"use client"

import React, { useCallback, useState } from "react"
import { Upload, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { UploadedImage } from "@/types"
import { useTranslations } from "next-intl"

interface UploadDropzoneProps {
  images: UploadedImage[]
  onImagesChange: (images: UploadedImage[]) => void
  maxImages?: number
  className?: string
}

export function UploadDropzone({
  images,
  onImagesChange,
  maxImages = 3,
  className,
}: UploadDropzoneProps) {
  const t = useTranslations("upload")
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)

      const files = Array.from(e.dataTransfer.files).filter(
        (file) => file.type.startsWith("image/")
      )

      handleFiles(files)
    },
    [images, maxImages]
  )

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || [])
      handleFiles(files)
    },
    [images, maxImages]
  )

  const handleFiles = (files: File[]) => {
    const slotsRemaining = maxImages - images.length
    const filesToAdd = files.slice(0, slotsRemaining)

    const newImages: UploadedImage[] = filesToAdd.map((file) => ({
      id: `${Date.now()}-${Math.random()}`,
      url: URL.createObjectURL(file),
      file,
    }))

    onImagesChange([...images, ...newImages])
  }

  const removeImage = (id: string) => {
    onImagesChange(images.filter((img) => img.id !== id))
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Dropzone */}
      {images.length < maxImages && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "relative flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed p-8 transition-all",
            isDragging
              ? "border-accent bg-accentSoft"
              : "border-accentBorderSoft hover:border-accent hover:bg-accentSoft/50"
          )}
        >
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileInput}
            className="absolute inset-0 cursor-pointer opacity-0"
          />
          <Upload className="mb-3 h-8 w-8 text-accent" />
          <p className="text-body-lg text-text">
            {isDragging ? t("dropImagesHere") : t("tapToUpload")}
          </p>
          <p className="text-body-sm text-muted">
            {t("orDragAndDrop")} • {t("maxImages", { count: maxImages })}
          </p>
        </div>
      )}

      {/* Image Previews */}
      {images.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {images.map((image) => (
            <div
              key={image.id}
              className="group relative aspect-square h-24 overflow-hidden rounded-2xl"
            >
              <img
                src={image.url}
                alt="Upload preview"
                className="h-full w-full object-cover"
              />
              <button
                onClick={() => removeImage(image.id)}
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <X className="h-4 w-4 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
