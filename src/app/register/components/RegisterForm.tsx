'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

declare global {
  interface Window {
    daum?: any
  }
}

interface RegisterFormProps {
  goBack: () => void
}

export default function RegisterForm({ goBack }: RegisterFormProps) {
  const router = useRouter()

  const [userId, setUserId] = useState('')
  const [idMessage, setIdMessage] = useState('')

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [zipcode, setZipcode] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')

  const [phone, setPhone] = useState('')

  const [bankHolder, setBankHolder] = useState('')
  const [bankAccount, setBankAccount] = useState('')

  const [message, setMessage] = useState('')

  // 1. 카카오 우편번호 스크립트 로드
  useEffect(() => {
    const scriptId = 'daum-postcode-script'
    if (document.getElementById(scriptId)) return

    const script = document.createElement('script')
    script.id = scriptId
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
    script.async = true
    document.body.appendChild(script)
  }, [])

  // 2. 주소 검색 버튼 클릭 핸들러
  const handleSearchAddress = () => {
    if (!window.daum || !window.daum.Postcode) {
      alert(
        '주소 검색 스크립트가 아직 준비되지 않았습니다. 잠시 후 다시 시도하세요.'
      )
      return
    }

    new window.daum.Postcode({
      oncomplete: (data: any) => {
        const addr = data.roadAddress || data.jibunAddress
        setZipcode(data.zonecode)
        setAddress1(addr)
        setAddress2('')
      },
    }).open()
  }

  const checkUserId = async () => {
    if (!userId) {
      setIdMessage('아이디를 입력하세요.')
      return
    }
    try {
      const res = await fetch(
        `http://localhost:5000/api/auth/check-id?userId=${encodeURIComponent(
          userId
        )}`
      )

      if (!res.ok) {
        setIdMessage('서버 오류로 확인에 실패했습니다.')
        return
      }

      const data = await res.json()
      if (data.available) {
        setIdMessage('사용 가능한 아이디입니다.')
      } else {
        setIdMessage('이미 사용 중인 아이디입니다.')
      }
    } catch {
      setIdMessage('서버와 통신할 수 없습니다.')
    }
  }

  const handleSubmit = async () => {
    if (!userId || !email || !name || !password) {
      setMessage('필수 항목을 입력하세요.')
      return
    }
    if (password !== confirmPassword) {
      setMessage('비밀번호가 일치하지 않습니다.')
      return
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          email,
          name,
          password,
          phone,
          zipcode,
          address1,
          address2,
          bankHolder,
          bankAccount,
        }),
      })

      const data = await res.json()
      if (res.ok) {
        alert('회원가입이 완료되었습니다.')
        router.push('/login')
      } else {
        setMessage(data.message || '회원가입 실패')
      }
    } catch {
      setMessage('서버 오류')
    }
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">회원 정보 입력</h2>

      <h3 className="text-xl font-semibold mb-4">기본 정보</h3>

      <div className="flex gap-2 mb-3">
        <input
          placeholder="아이디"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="flex-1 border p-3"
        />
        <button
          type="button"
          onClick={checkUserId}
          className="border px-4 py-2"
        >
          중복확인
        </button>
      </div>
      <p className="text-sm text-gray-600 mb-3">{idMessage}</p>

      <input
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-3 mb-3"
      />

      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border p-3 mb-3"
      />
      <input
        type="password"
        placeholder="비밀번호 확인"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full border p-3 mb-6"
      />

      <input
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border p-3 mb-6"
      />

      <h3 className="text-xl font-semibold mb-4">주소</h3>
      <div className="flex gap-2 mb-3">
        <input
          placeholder="우편번호"
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value)}
          className="flex-1 border p-3"
        />
        <button
          type="button"
          onClick={handleSearchAddress}
          className="border px-4 py-2"
        >
          주소검색
        </button>
      </div>

      <input
        placeholder="기본주소"
        value={address1}
        onChange={(e) => setAddress1(e.target.value)}
        className="w-full border p-3 mb-3"
      />
      <input
        placeholder="상세주소"
        value={address2}
        onChange={(e) => setAddress2(e.target.value)}
        className="w-full border p-3 mb-6"
      />

      <h3 className="text-xl font-semibold mb-4">휴대전화</h3>
      <input
        placeholder="휴대전화 번호"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full border p-3 mb-6"
      />

      <h3 className="text-xl font-semibold mb-4">추가 정보 (선택)</h3>
      <input
        placeholder="예금주"
        value={bankHolder}
        onChange={(e) => setBankHolder(e.target.value)}
        className="w-full border p-3 mb-3"
      />
      <input
        placeholder="계좌번호"
        value={bankAccount}
        onChange={(e) => setBankAccount(e.target.value)}
        className="w-full border p-3 mb-6"
      />

      {message && (
        <p className="text-red-500 text-sm mb-4 text-center">{message}</p>
      )}

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={goBack}
          className="border px-6 py-2 rounded"
        >
          뒤로
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-black text-white px-6 py-2 rounded"
        >
          가입하기
        </button>
      </div>
    </div>
  )
}
