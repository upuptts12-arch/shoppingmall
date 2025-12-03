'use client'

import { ShoppingCart, Search, Heart, ShoppingBag } from 'lucide-react'
import { useAuth } from '@/app/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useWishlist } from '@/app/context/WishlistContext'

export default function Navbar({
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  cartCount,
  setIsCartOpen,
}: any) {
  const { isLoggedIn, user, logout } = useAuth()
  const router = useRouter()
  const { wishlist, openWishlist } = useWishlist()

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => window.location.reload()}
          >
            <ShoppingBag className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              TEAM_MALL
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {/* 카테고리 버튼들 */}
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="상품 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-48 transition-all focus:w-64"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>

            <button
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() =>
                isLoggedIn ? openWishlist() : router.push('/login')
              }
            >
              <Heart className="h-6 w-6 text-gray-700" />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-6 w-6 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <span className="text-gray-700 font-medium">{user?.name}</span>
                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <button
                onClick={() => router.push('/login')}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                로그인
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
