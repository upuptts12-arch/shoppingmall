'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'

export default function AuthPage() {
  const { login } = useAuth()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (!res.ok) return setMessage(data.error)

    login(data.user)
    setMessage('로그인 성공!')
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })
    const data = await res.json()
    if (!res.ok) return setMessage(data.error)

    setMessage('회원가입 성공! 로그인해주세요')
    setIsLogin(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-pink-100">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          {isLogin ? '로그인' : '회원가입'}
        </h1>

        {isLogin ? (
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button className="bg-indigo-500 text-white py-2 rounded-xl font-semibold hover:bg-indigo-600 transition">
              로그인
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <button className="bg-pink-500 text-white py-2 rounded-xl font-semibold hover:bg-pink-600 transition">
              회원가입
            </button>
          </form>
        )}

        {message && <p className="text-center text-red-500 mt-4">{message}</p>}

        <button
          onClick={() => {
            setIsLogin(!isLogin)
            setMessage('')
          }}
          className="mt-6 text-sm text-indigo-500 hover:underline"
        >
          {isLogin ? '회원가입 하러가기' : '로그인 하러가기'}
        </button>
      </div>
    </div>
  )
}
