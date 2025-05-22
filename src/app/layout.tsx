import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/app/components/footer'
import NavBar from '@/app/components/navbar'

import { ClerkProvider } from '@clerk/nextjs'
import { EdgeStoreProvider } from './lib/edgestore'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sort AI',
  description: 'File sorting and organization application',
  keywords: ['file sorting', 'organization', 'ai', 'document management'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <ClerkProvider dynamic>
      <EdgeStoreProvider>
        <html lang="de">
          <body className={inter.className}>
            <NavBar />
            {children}
            <Footer />
          </body>
        </html>
      </EdgeStoreProvider>
    </ClerkProvider>
  )
}
