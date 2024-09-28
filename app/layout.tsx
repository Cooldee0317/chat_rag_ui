import type { Metadata } from 'next'
import Head from 'next/head'
import './globals.css'
import Providers from './provider/Providers'

export const metadata: Metadata = {
  title: 'SIQ Bots',
  description: 'Welcome to Paint Assistence! You can choose one of the following options or ask me anything regarding home renovation or painting! I will be glad to help.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
