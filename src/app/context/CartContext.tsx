'use client'

import { createContext, useContext, useState } from 'react'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  category: string
}

interface CartContextType {
  cart: CartItem[]
  cartCount: number
  addToCart: (product: Partial<CartItem>) => void
  updateQuantity: (id: string, amount: number) => void
  removeFromCart: (id: string) => void
  toggleCart: () => void
  closeCart: () => void
  isCartOpen: boolean
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const addToCart = (product: Partial<CartItem>) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [
        ...prev,
        {
          id: product.id!,
          name: product.name!,
          price: product.price!,
          image: product.image ?? '/default.png',
          category: product.category ?? '기타',
          quantity: 1,
        },
      ]
    })

    setIsCartOpen(true)
  }

  const updateQuantity = (id: string, amount: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + amount) }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const toggleCart = () => setIsCartOpen((prev) => !prev)
  const closeCart = () => setIsCartOpen(false)

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount: cart.reduce((sum, item) => sum + item.quantity, 0),
        addToCart,
        updateQuantity,
        removeFromCart,
        isCartOpen,
        toggleCart,
        closeCart,
      }}
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
