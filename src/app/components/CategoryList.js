// c:/Users/yslov/shoppingmall/src/app/components/CategoryList.js
'use client' // Next.js 환경에서 CSR을 위해 필요합니다.

import React, { useState, useEffect } from 'react'
import axios from 'axios'

// 카테고리 목록을 표시하는 컴포넌트
function CategoryList() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // 1. 백엔드 API에서 카테고리 데이터를 가져옵니다.
        const response = await axios.get('/api/categories')

        // 2. 상태를 업데이트합니다. (response.data는 배열 형태여야 합니다.)
        setCategories(response.data)
      } catch (err) {
        console.error('카테고리 데이터를 가져오는 중 오류 발생:', err)
        setError('카테고리 데이터를 불러오는데 실패했습니다.')
      } finally {
        // 3. 로딩 상태를 해제합니다.
        setLoading(false)
      }
    }

    fetchCategories()
  }, []) // 빈 배열은 컴포넌트가 처음 마운트될 때만 실행됨을 의미합니다.

  // 렌더링 단계:

  if (loading) {
    return <div className="category-loading">카테고리 목록 로딩 중...</div>
  }

  if (error) {
    return <div className="category-error">오류: {error}</div>
  }

  if (categories.length === 0) {
    return <div className="category-empty">등록된 카테고리가 없습니다.</div>
  }

  return (
    <nav className="category-nav">
      <h3>🏷️ 쇼핑몰 카테고리</h3>
      <ul className="category-list">
        {/* 받아온 categories 배열을 map으로 순회하며 목록을 만듭니다. */}
        {categories.map((category) => (
          <li key={category._id || category.name}>
            {/* 💡 category.name을 쿼리 파라미터로 사용하여 상품 페이지로 이동하도록 설정 */}
            <a href={`/products?category=${category.name}`}>{category.name}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

// 4. Default Export (기본 내보내기): 이 부분이 이전 오류를 해결합니다.
export default CategoryList
