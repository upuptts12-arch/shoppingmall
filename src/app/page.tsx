'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import ProductCard from '@/app/components/ProductCard'
import CartSidebar from '@/app/components/CartSidebar'
import { SAMPLE_PRODUCTS, CATEGORIES } from '@/app/data/products'

export default function Home() {
  const [cart, setCart] = useState<any[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOption, setSortOption] = useState('popular')
  const [openSort, setOpenSort] = useState(false)

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
    setIsCartOpen(true)
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

  // 상품 필터링
  let filteredProducts = SAMPLE_PRODUCTS.filter((p) => {
    const matchCategory =
      activeCategory === 'All' || p.category === activeCategory
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCategory && matchSearch
  })

  // 정렬 적용
  if (sortOption === 'popular') {
    filteredProducts = filteredProducts.sort((a, b) => b.rating - a.rating)
  } else if (sortOption === 'price-high') {
    filteredProducts = filteredProducts.sort((a, b) => b.price - a.price)
  } else if (sortOption === 'price-low') {
    filteredProducts = filteredProducts.sort((a, b) => a.price - b.price)
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* ===== HERO ===== */}
      <section className="relative w-full h-screen flex items-center justify-center bg-white">
        <img
          src="/hero.png"
          alt="Soft Edge Hero"
          className="w-[75%] max-w-[1100px] object-contain select-none pointer-events-none"
          draggable={false}
        />
      </section>

      {/* ===== PRODUCTS SECTION ===== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 카테고리 + 정렬 버튼 */}
        <div className="mb-8 flex gap-3 flex-wrap justify-center items-center relative">
          {/* 카테고리 버튼 */}
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                activeCategory === cat
                  ? 'bg-gray-300 text-white shadow'
                  : 'bg-white text-gray-700 border hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}

          {/* 정렬 드롭다운 */}
          <div className="relative">
            <button
              onClick={() => setOpenSort(!openSort)}
              className="px-4 py-2 border rounded-full text-sm bg-white hover:bg-gray-100"
            >
              정렬방식 ▾
            </button>

            {openSort && (
              <div className="absolute mt-2 w-32 bg-white border shadow-lg rounded-md z-50 text-sm">
                <button
                  onClick={() => {
                    setSortOption('popular')
                    setOpenSort(false)
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  인기순
                </button>
                <button
                  onClick={() => {
                    setSortOption('price-low')
                    setOpenSort(false)
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  낮은가격
                </button>
                <button
                  onClick={() => {
                    setSortOption('price-high')
                    setOpenSort(false)
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  높은가격
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ===== 상품 카드 ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id}>
              <ProductCard product={product} addToCart={addToCart} />
            </Link>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">검색 결과가 없습니다.</p>
          </div>
        )}
      </main>

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
