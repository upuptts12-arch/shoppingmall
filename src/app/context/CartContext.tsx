'use client'

import { createContext, useContext, useState } from 'react'

interface CartContextType {
  cart: any[]
  cartCount: number
  addToCart: (product: any) => void
  toggleCart: () => void // 추가
  isCartOpen: boolean // 추가
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<any[]>([])
  const [cartCount, setCartCount] = useState(0)
  const [isCartOpen, setIsCartOpen] = useState(false)

  const addToCart = (product: any) => {
    setCart((prev) => [...prev, product])
    setCartCount((prev) => prev + 1)
    setIsCartOpen(true)
  }

  const toggleCart = () => setIsCartOpen((prev) => !prev)

  return (
    <CartContext.Provider
      value={{ cart, cartCount, addToCart, toggleCart, isCartOpen }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
