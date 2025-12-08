'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/context/AuthContext'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()

  const [idOrEmail, setIdOrEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleLogin = async () => {
    setMessage('')

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idOrEmail, password }),
      })

      const data = await res.json()

      if (res.ok) {
        // 백엔드에서 내려준 token, user 정보 저장
        localStorage.setItem('token', data.token)
        localStorage.setItem('name', data.user.name)
        localStorage.setItem('email', data.user.email)
        localStorage.setItem('userId', data.user.userId)

        login(data.user.name)
        router.push('/')
      } else {
        setMessage(data.error || '로그인 실패')
      }
    } catch (err) {
      console.error(err)
      setMessage('서버 오류')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-24 p-8 border border-gray-300 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>

      <input
        type="text"
        placeholder="아이디 또는 이메일"
        value={idOrEmail}
        onChange={(e) => setIdOrEmail(e.target.value)}
        className="w-full border border-gray-400 p-3 rounded mb-4"
      />

      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border border-gray-400 p-3 rounded mb-6"
      />

      <button
        onClick={handleLogin}
        className="w-full bg-black text-white p-3 rounded mb-4 hover:bg-gray-800"
      >
        로그인
      </button>

      <button
        onClick={() => router.push('/register')}
        className="w-full border border-gray-400 p-3 rounded hover:bg-gray-100"
      >
        회원가입
      </button>

      {message && (
        <p className="text-red-500 mt-4 text-center text-sm">{message}</p>
      )}
    </div>
  )
}
