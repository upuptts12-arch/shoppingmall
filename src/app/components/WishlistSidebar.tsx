'use client'

import { useWishlist } from '../context/WishlistContext'
import { X, Trash2, ShoppingCart } from 'lucide-react'
import { useEffect } from 'react'

// [핵심!] 반드시 'export default'가 있어야 layout.tsx에서 불러올 수 있습니다.
export default function WishlistSidebar() {
  const { wishlist, isWishlistOpen, closeWishlist, removeFromWishlist } =
    useWishlist()

  // 사이드바 열리면 뒷배경 스크롤 막기
  useEffect(() => {
    if (isWishlistOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isWishlistOpen])

  // 가격 포맷
  const formatPrice = (price: number | string) =>
    new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(Number(price))

  // 닫혀있으면 아예 안 보여줌
  if (!isWishlistOpen) return null

  return (
    <div className="fixed inset-0 z-999 flex justify-end">
      {/* 검은 배경 (클릭 시 닫힘) */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={closeWishlist}
      />

      {/* 오른쪽에서 나오는 흰색 패널 */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* 헤더 */}
        <div className="p-5 border-b flex items-center justify-between bg-white">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            ❤️ 찜한 상품
            <span className="text-indigo-600">({wishlist.length})</span>
          </h2>
          <button
            onClick={closeWishlist}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* 상품 목록 */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-10 h-10 text-gray-300" />
              </div>
              <div className="space-y-1">
                <p className="text-lg font-medium text-gray-900">
                  찜한 상품이 없습니다
                </p>
                <p className="text-gray-500">마음에 드는 상품을 담아보세요!</p>
              </div>
              <button
                onClick={closeWishlist}
                className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors"
              >
                쇼핑 계속하기
              </button>
            </div>
          ) : (
            wishlist.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-3 border border-gray-100 rounded-xl hover:border-indigo-100 transition-colors bg-white shadow-sm"
              >
                {/* 이미지 */}
                <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 정보 */}
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <p className="text-xs text-indigo-600 font-semibold mb-1">
                      {item.category}
                    </p>
                    <h3 className="text-sm font-bold text-gray-900 line-clamp-2">
                      {item.name}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg text-gray-900">
                      {formatPrice(item.price)}
                    </span>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="text-gray-400 hover:text-red-500 p-1.5 hover:bg-red-50 rounded-md transition-all"
                      title="삭제"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
