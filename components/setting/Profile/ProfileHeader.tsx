"use client"

import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"
import Image from "next/image"
import { RefObject } from "react"

type Props = {
  fileRef: RefObject<HTMLInputElement | null>
  preview: string | null
  avatarUrl?: string | null
  name: string
  email: string
  onFileChange: (file: File | null) => void
}

export function ProfileHeader({
  fileRef,
  preview,
  avatarUrl,
  name,
  email,
  onFileChange,
}: Props) {
  const imageSrc = preview || avatarUrl

  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-dashed hover:bg-muted"
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt="avatar"
            width={64}
            height={64}
            className="object-cover"
          />
        ) : (
          <Plus className="h-5 w-5 text-muted-foreground" />
        )}
      </button>

      <div className="leading-tight">
        <p className="text-sm font-medium">{name}</p>
        <p className="text-xs text-muted-foreground">{email}</p>
      </div>

      <Input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
      />
    </div>
  )
}
