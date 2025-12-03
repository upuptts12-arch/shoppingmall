'use client'

// 경로 수정됨: app/wishlist/ 폴더 기준, 한 단계 위(../)의 context와 components를 찾습니다.
import { useWishlist } from '../../context/WishlistContext'
import ProductCard from '../components/ProductCard'
import { Heart } from 'lucide-react'
import Link from 'next/link'

export default function WishlistPage() {
  const { wishlist } = useWishlist()

  // 장바구니 담기 핸들러 (ProductCard에 넘겨줄 함수)
  const handleAddToCart = (product: any) => {
    // 실제 장바구니 로직이 있다면 여기에 연결하거나, Context에서 가져와서 쓰시면 됩니다.
    console.log('장바구니 담기:', product)
    alert(`${product.name}을(를) 장바구니에 담았습니다!`)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-8">
        <Heart className="w-8 h-8 text-red-500 fill-current" />
        <h1 className="text-3xl font-bold text-gray-900">나의 찜 목록</h1>
        <span className="text-gray-500 text-lg font-medium">
          ({wishlist.length})
        </span>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            아직 찜한 상품이 없어요
          </h2>
          <p className="text-gray-500 mb-6">
            마음에 드는 상품의 하트를 눌러보세요!
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            쇼핑하러 가기
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  )
}
