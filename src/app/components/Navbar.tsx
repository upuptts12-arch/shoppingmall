'use client'

import Image from 'next/image'
import { ShoppingCart, Search, Heart, User as UserIcon } from 'lucide-react'
import { useAuth } from '@/app/context/AuthContext'
import { useWishlist } from '@/app/context/WishlistContext'
import { useCart } from '@/app/context/CartContext'
import CartSidebar from '@/app/components/CartSidebar' // 👉 경로 확인 필요!

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Navbar() {
  const router = useRouter()
  const { isLoggedIn, user, logout } = useAuth()
  const { wishlist, openWishlist } = useWishlist()

  // 🛒 ▼ 장바구니 Context 사용 ▼
  const {
    cart,
    cartCount,
    isCartOpen,
    toggleCart,
    closeCart,
    updateQuantity,
    removeFromCart,
  } = useCart()

  const [searchQuery, setSearchQuery] = useState('')

  return (
    <>
      {/* 🔼 Navbar 영역 */}
      <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* 로고 */}
            <div
              className="flex items-center gap-2 cursor-pointer h-16 pl-2"
              onClick={() => router.push('/')}
            >
              <Image
                src="/softedge-logo.png"
                alt="Soft Edge Logo"
                width={58}
                height={58}
                priority
                className="object-contain drop-shadow-md hover:brightness-125 transition"
              />
            </div>

            {/* 검색창 */}
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="상품 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-48 transition-all focus:w-64"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>

            {/* 아이콘 영역 */}
            <div className="flex items-center gap-4">
              {/* ❤ 찜 */}
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

              {/* 🛒 장바구니 */}
              <button
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                onClick={toggleCart}
              >
                <ShoppingCart className="h-6 w-6 text-gray-700" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* 로그인 / 마이페이지 */}
              {isLoggedIn ? (
                <>
                  {/* 데스크탑 */}
                  <div className="hidden md:flex items-center gap-2">
                    <span className="text-gray-700 font-medium">{user}</span>

                    <button
                      onClick={() => router.push('/mypage')}
                      className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
                      aria-label="마이페이지"
                    >
                      <UserIcon className="h-4 w-4" />
                    </button>

                    <button
                      onClick={logout}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition"
                    >
                      로그아웃
                    </button>
                  </div>

                  {/* 모바일 */}
                  <div className="flex md:hidden items-center gap-2">
                    <button
                      onClick={() => router.push('/mypage')}
                      className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
                      aria-label="마이페이지"
                    >
                      <UserIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={logout}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-red-600 transition"
                    >
                      로그아웃
                    </button>
                  </div>
                </>
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

      {/* 🛒 ▼ 장바구니 사이드바 렌더링 ▼ */}
      <CartSidebar
        isOpen={isCartOpen}
        setIsOpen={closeCart}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />
    </>
  )
}
