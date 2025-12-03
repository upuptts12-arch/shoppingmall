import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

import { WishlistProvider } from '../context/WishlistContext'
import { AuthProvider } from '../context/AuthContext' // 추가
import WishlistSidebar from './components/WishlistSidebar'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Team Mall',
  description: 'Best Shopping Mall',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <WishlistProvider>
            {/* 하트 아이콘 클릭 시 나오는 사이드바 */}
            <WishlistSidebar />

            {children}
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
