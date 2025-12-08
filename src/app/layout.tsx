import type { Metadata } from 'next'
import './globals.css'

import { WishlistProvider } from './context/WishlistContext'
import { AuthProvider } from './context/AuthContext'
import WishlistSidebar from './components/WishlistSidebar'
import Navbar from './components/Navbar'

export const metadata: Metadata = {
  title: 'Team Mall',
  description: 'Best Shopping Mall',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <WishlistProvider>
            <Navbar />

            <WishlistSidebar />

            <div className="pt-16">{children}</div>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
