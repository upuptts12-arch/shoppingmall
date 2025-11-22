'use client'

import { ShoppingCart, X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'

export default function CartSidebar({
  isOpen,
  setIsOpen,
  cart,
  updateQuantity,
  removeFromCart,
}: any) {
  if (!isOpen) return null

  const totalAmount = cart.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  )
  const formatPrice = (price: number) =>
    new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(price)

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full transform transition-transform duration-300 ease-in-out">
          {/* 헤더 */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <ShoppingCart className="h-6 w-6" />
              장바구니 ({cart.length})
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          {/* 내용 */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                <ShoppingBag className="h-16 w-16 opacity-20" />
                <p>장바구니가 비어있습니다.</p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-indigo-600 font-medium hover:underline"
                >
                  쇼핑 계속하기
                </button>
              </div>
            ) : (
              cart.map((item: any) => (
                <div key={item.id} className="flex gap-4">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>{item.name}</h3>
                        <p className="ml-4">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.category}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 px-2 hover:bg-gray-100 rounded-l-lg"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-2 font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 px-2 hover:bg-gray-100 rounded-r-lg"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="font-medium text-red-500 hover:text-red-700 flex items-center gap-1"
                      >
                        <Trash2 className="h-4 w-4" />
                        삭제
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* 푸터 (결제버튼) */}
          {cart.length > 0 && (
            <div className="border-t border-gray-200 px-6 py-6 bg-gray-50">
              <div className="flex justify-between text-base font-bold text-gray-900 mb-4">
                <p>총 결제 금액</p>
                <p className="text-xl text-indigo-600">
                  {formatPrice(totalAmount)}
                </p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500 mb-6">
                배송비 및 세금은 결제 단계에서 계산됩니다.
              </p>
              <button
                className="w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 active:scale-[0.98] transition-all"
                onClick={() =>
                  alert('팀 프로젝트 과제 제출용 프로토타입입니다!')
                }
              >
                결제하기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
