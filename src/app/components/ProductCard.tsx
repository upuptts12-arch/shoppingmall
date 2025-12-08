'use client'

import { ShoppingCart, Star, Heart } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'

export default function ProductCard({ product, addToCart }: any) {
  const { toggleWishlist, isLiked } = useWishlist()
  const isHearted = isLiked(product.id)

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(price)

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col cursor-pointer">
      <div className="relative pt-[100%] overflow-hidden bg-gray-200">
        <img
          src={product.image}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* === Wish 버튼 === */}
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            toggleWishlist(product)
          }}
          className={`absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full transition-colors opacity-0 group-hover:opacity-100 
            ${isHearted ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}
          `}
        >
          <Heart className={`h-5 w-5 ${isHearted ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <p className="text-sm text-indigo-600 font-medium">
            {product.category}
          </p>
          <div className="flex items-center text-yellow-400 text-sm">
            <Star className="h-4 w-4 fill-current" />
            <span className="ml-1 text-gray-600">{product.rating}</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">
          {product.name}
        </h3>

        <p className="text-xl font-bold text-gray-900 mb-4">
          {formatPrice(product.price)}
        </p>

        {/* ==== 장바구니 담기 버튼 ==== */}
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            addToCart(product)
          }}
          className="mt-auto w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2 active:scale-95"
        >
          <ShoppingCart className="h-5 w-5" />
          담기
        </button>
      </div>
    </div>
  )
}
