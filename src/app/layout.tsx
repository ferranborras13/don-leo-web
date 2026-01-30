import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DonLeo — Your AI Dating Wingman",
  description: "Instant replies + real coaching. DonLeo keeps you smooth, funny, and in control.",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "DonLeo — Your AI Dating Wingman",
    description: "Instant replies + real coaching. DonLeo keeps you smooth, funny, and in control.",
    images: [
      {
        url: "/brand/donleo-logo.png",
        width: 1200,
        height: 630,
        alt: "DonLeo - Your AI Dating Wingman",
      },
    ],
    siteName: "DonLeo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DonLeo — Your AI Dating Wingman",
    description: "Instant replies + real coaching. DonLeo keeps you smooth, funny, and in control.",
    images: ["/brand/donleo-logo.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
