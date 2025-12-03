'use client'

import React, { useState } from 'react'
import Navbar from '@/app/components/Navbar'
import ProductCard from '@/app/components/ProductCard'
import CartSidebar from '@/app/components/CartSidebar'
import { SAMPLE_PRODUCTS, CATEGORIES } from '@/app/data/products'
import { useRouter } from 'next/navigation'

export default function Home() {
  // 1. 상태 관리 (장바구니, 검색어, 카테고리 등)
  const [cart, setCart] = useState<any[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  // 2. 기능 로직 (장바구니 담기, 수량 조절, 삭제)
  const addToCart = (product: any) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    setIsCartOpen(true) // 담으면 장바구니 열어주기
  }

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta)
          return { ...item, quantity: newQty }
        }
        return item
      })
    )
  }

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  // 3. 필터링 로직 (검색어 & 카테고리에 맞는 상품만 걸러내기)
  const filteredProducts = SAMPLE_PRODUCTS.filter((p) => {
    const matchCategory =
      activeCategory === 'All' || p.category === activeCategory
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCategory && matchSearch
  })

  // 4. 화면 렌더링 (JSX)
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* 상단 네비게이션 바 */}
      <Navbar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        setIsCartOpen={setIsCartOpen}
      />

      {/* 메인 컨텐츠 영역 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* (1) 프로모션 배너 */}
        <div className="mb-12 rounded-2xl overflow-hidden relative h-64 bg-indigo-900 flex items-center">
          <div className="absolute inset-0 opacity-40">
            {/* 이미지는 무료 이미지 사이트 Unsplash URL입니다 */}
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1200"
              className="w-full h-full object-cover"
              alt="Banner"
            />
          </div>
          <div className="relative z-10 px-8 md:px-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              기말 과제 화이팅 세일
            </h2>
            <p className="text-indigo-200 text-lg mb-6">
              {' '}
              놀랄 퀄리티, 여기서 시작하세요.
            </p>
            <button className="bg-white text-indigo-900 px-6 py-3 rounded-lg font-bold hover:bg-indigo-50 transition-colors shadow-lg">
              지금 바로 구매하기
            </button>
          </div>
        </div>

        {/* (2) 모바일용 카테고리 버튼 (화면 작을 때만 보임) */}
        <div className="md:hidden mb-6 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex space-x-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-600 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* (3) 상품 리스트 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            // 분리해둔 ProductCard 컴포넌트 사용
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>

        {/* 검색 결과 없을 때 메시지 */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">검색 결과가 없습니다.</p>
          </div>
        )}
      </main>

      {/* 장바구니 사이드바 (평소엔 숨겨져 있음) */}
      <CartSidebar
        isOpen={isCartOpen}
        setIsOpen={setIsCartOpen}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />
    </div>
  )
}
