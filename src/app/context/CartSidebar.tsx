'use client'

import { useCart } from '@/app/context/CartContext'

export default function CartSidebar() {
  const { cart, isCartOpen, toggleCart } = useCart()

  if (!isCartOpen) return null

  return (
    <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-xl border-l border-gray-200 p-4 z-50">
      <h2 className="text-xl font-bold mb-4">장바구니</h2>

      <button
        className="absolute top-3 right-3 text-gray-600"
        onClick={toggleCart}
      >
        ✕
      </button>

      {cart.length === 0 ? (
        <p className="text-gray-500">장바구니가 비었습니다.</p>
      ) : (
        cart.map((item, idx) => (
          <div key={idx} className="p-2 border-b">
            {item.name}
          </div>
        ))
      )}
    </div>
  )
}
