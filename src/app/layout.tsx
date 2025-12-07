import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

import { WishlistProvider } from './context/WishlistContext'
import { AuthProvider } from './context/AuthContext'
import WishlistSidebar from './components/WishlistSidebar'
import Navbar from './components/Navbar' // 추가됨

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
            {/* 찜 사이드바 */}
            <WishlistSidebar />
            {/* 여기에서 모든 페이지 위에 Navbar 표시 */}
            <Navbar /> {/* 추가 부분 */}
            {/* 각 페이지 내용 */}
            {children}
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
