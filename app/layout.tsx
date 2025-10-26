import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sora 2 Free - AI Video Generator',
  description: 'Generate stunning AI videos for free, no watermark, no restrictions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
