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

  const filteredProducts = SAMPLE_PRODUCTS.filter((p) => {
    const matchCategory =
      activeCategory === 'All' || p.category === activeCategory
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCategory && matchSearch
  })

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* ===== HERO ===== */}
      <section className="relative w-full h-screen flex items-start justify-center bg-white pt-24">
        <img
          src="/hero.png"
          alt="Soft Edge Hero"
          className="w-[90%] md:w-[75%] max-w-[1200px] object-contain select-none pointer-events-none"
          draggable={false}
        />
      </section>

      {/* ===== PRODUCTS SECTION ===== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 카테고리 */}
        <div className="mb-8 flex gap-3 flex-wrap justify-center">
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
        </div>

        {/* 상품 카드 */}
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
