'use client';

// Heart 아이콘 추가
import { ShoppingCart, Search, ShoppingBag, Heart } from 'lucide-react';
import { CATEGORIES } from '../data/products';
// 찜 기능 훅 가져오기 (경로가 맞는지 확인해주세요)
import { useWishlist } from '../context/WishlistContext';

export default function Navbar({
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  cartCount,
  setIsCartOpen,
}: any) {
  // 찜 목록 데이터와 사이드바 열기 함수 가져오기
  const { wishlist, openWishlist } = useWishlist();

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 로고 */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => window.location.reload()}
          >
            <ShoppingBag className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              TEAM_MALL
            </span>
          </div>

          {/* 데스크탑 카테고리 메뉴 */}
          <div className="hidden md:flex items-center space-x-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`${
                  activeCategory === cat
                    ? 'text-indigo-600 font-bold'
                    : 'text-gray-500 hover:text-gray-900'
                } transition-colors`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 검색 및 아이콘들 (찜, 장바구니) */}
          <div className="flex items-center gap-4">
            {/* 검색창 */}
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="상품 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-48 transition-all focus:w-64"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>

            {/* === 추가된 부분: 찜(하트) 버튼 === */}
            <button
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={openWishlist}
            >
              <Heart className="h-6 w-6 text-gray-700" />
              {/* 찜한 개수가 0보다 클 때만 빨간 뱃지 표시 */}
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                  {wishlist.length}
                </span>
              )}
            </button>
            {/* ================================= */}

            {/* 장바구니 버튼 (기존 코드) */}
            <button
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-6 w-6 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
