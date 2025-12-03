'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// [중요] Product 타입에 'category'가 있어야 오류가 안 납니다!
export type Product = {
  id: number | string;
  name: string;
  price: number | string;
  image?: string;
  category?: string; // 이게 빠져서 오류가 났던 겁니다
  rating?: number; // 별점 등 다른 정보도 있을 수 있으니 추가
};

// [중요] 여기에 'openWishlist' 같은 기능들이 명시되어 있어야 합니다.
type WishlistContextType = {
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isLiked: (id: number | string) => boolean;
  isWishlistOpen: boolean; // 사이드바 열림 상태
  openWishlist: () => void; // 사이드바 열기 함수
  closeWishlist: () => void; // 사이드바 닫기 함수
  removeFromWishlist: (id: number | string) => void; // 삭제 함수
};

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // 1. 초기 로드
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('team_mall_wishlist');
      if (stored) {
        try {
          setWishlist(JSON.parse(stored));
        } catch (e) {
          console.error('찜 목록 로딩 실패', e);
        }
      }
    }
  }, []);

  // 2. 변경 시 저장
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('team_mall_wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist]);

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      } else {
        setIsWishlistOpen(true); // 찜하면 자동으로 사이드바 열기
        return [...prev, product];
      }
    });
  };

  const removeFromWishlist = (id: number | string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const isLiked = (id: number | string) => {
    return wishlist.some((item) => item.id === id);
  };

  const openWishlist = () => setIsWishlistOpen(true);
  const closeWishlist = () => setIsWishlistOpen(false);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isLiked,
        isWishlistOpen,
        openWishlist,
        closeWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
