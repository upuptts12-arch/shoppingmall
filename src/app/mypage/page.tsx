'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/context/AuthContext'
import {
  User as UserIcon,
  Mail,
  Phone,
  Home,
  CreditCard,
  LogOut,
} from 'lucide-react'

interface UserProfile {
  userId: string
  email: string
  name: string
  phone: string
  zipcode: string
  address1: string
  address2: string
  bankHolder: string
  bankAccount: string
}

export default function MyPage() {
  const router = useRouter()
  const { isLoggedIn, user, logout } = useAuth()

  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editForm, setEditForm] = useState<UserProfile | null>(null)
  const [saveMessage, setSaveMessage] = useState('')

  // 로그인 안 되어 있으면 로그인 페이지로 이동
  useEffect(() => {
    if (!isLoggedIn) {
      router.replace('/login')
    }
  }, [isLoggedIn, router])

  // 프로필 정보 가져오기
  useEffect(() => {
    if (!isLoggedIn) return

    const fetchProfile = async () => {
      try {
        setLoading(true)
        setError('')
        setSaveMessage('')

        const token = localStorage.getItem('token')

        if (!token) {
          setError('로그인 정보가 없습니다. 다시 로그인해 주세요.')
          setLoading(false)
          return
        }

        const res = await fetch('/api/auth/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await res.json()

        if (!res.ok) {
          setError(data.error || '회원 정보를 불러오지 못했습니다.')
          setLoading(false)
          return
        }

        setProfile(data as UserProfile)
      } catch (e) {
        console.error(e)
        setError('서버 통신 중 오류가 발생했습니다.')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [isLoggedIn])

  const startEdit = () => {
    if (!profile) return
    setEditForm({ ...profile })
    setEditing(true)
    setSaveMessage('')
  }

  const cancelEdit = () => {
    setEditing(false)
    setEditForm(null)
    setSaveMessage('')
  }

  const handleChange = (field: keyof UserProfile, value: string) => {
    if (!editForm) return
    setEditForm({ ...editForm, [field]: value })
  }

  const handleSave = async () => {
    if (!editForm) return
    try {
      setSaving(true)
      setSaveMessage('')
      setError('')

      const token = localStorage.getItem('token')

      if (!token) {
        setError('로그인 정보가 없습니다. 다시 로그인해 주세요.')
        setSaving(false)
        return
      }

      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: editForm.name,
          phone: editForm.phone,
          zipcode: editForm.zipcode,
          address1: editForm.address1,
          address2: editForm.address2,
          bankHolder: editForm.bankHolder,
          bankAccount: editForm.bankAccount,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || '회원 정보 수정에 실패했습니다.')
        setSaving(false)
        return
      }

      setProfile(data.profile as UserProfile)
      setEditing(false)
      setEditForm(null)
      setSaveMessage('회원 정보가 수정되었습니다.')
    } catch (e) {
      console.error(e)
      setError('서버 통신 중 오류가 발생했습니다.')
    } finally {
      setSaving(false)
    }
  }

  if (!isLoggedIn) {
    return (
      <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <p className="text-gray-600 text-sm">
          로그인 페이지로 이동 중입니다...
        </p>
      </main>
    )
  }

  if (loading) {
    return (
      <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <p className="text-gray-600 text-sm">
          회원 정보를 불러오는 중입니다...
        </p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <p className="text-red-500 text-sm">{error}</p>
      </main>
    )
  }

  if (!profile) {
    return (
      <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <p className="text-gray-600 text-sm">
          회원 정보가 없습니다. 관리자에게 문의하세요.
        </p>
      </main>
    )
  }

  const displayName = profile.name || user || profile.userId

  const current = editing && editForm ? editForm : profile

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 상단 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">마이페이지</h1>
            <p className="text-sm text-gray-500 mt-1">
              {displayName}님의 회원 정보를 확인하고 수정할 수 있습니다.
            </p>
          </div>

          <button
            onClick={logout}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition"
          >
            <LogOut className="h-4 w-4" />
            로그아웃
          </button>
        </div>

        {saveMessage && (
          <div className="mb-4 text-sm text-green-600">{saveMessage}</div>
        )}

        <div className="grid gap-6 md:grid-cols-[2fr,3fr]">
          {/* 왼쪽: 프로필 카드 */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
              <UserIcon className="h-10 w-10 text-indigo-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">
              {current.name || profile.userId}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              TEAM_MALL 회원 ({profile.userId})
            </p>

            <div className="w-full h-px bg-gray-100 my-4" />

            <div className="w-full space-y-2 text-left text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span>이메일 : {profile.email || '미등록'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span>휴대전화 : {current.phone || '미등록'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4 text-gray-400" />
                <span>
                  주소 :{' '}
                  {current.zipcode
                    ? `(${current.zipcode}) ${current.address1} ${current.address2}`
                    : '미등록'}
                </span>
              </div>
            </div>
          </section>

          {/* 오른쪽: 상세 정보 + 수정 폼 */}
          <section className="space-y-6">
            {/* 기본 정보 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-3">
                기본 정보 (회원가입 기본 정보와 동일)
              </h3>
              <dl className="space-y-3 text-sm text-gray-700">
                <div className="flex justify-between">
                  <dt className="text-gray-500">아이디</dt>
                  <dd className="font-medium">{profile.userId}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">이름</dt>
                  <dd className="font-medium">
                    {editing && editForm ? (
                      <input
                        type="text"
                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                        value={editForm.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                      />
                    ) : (
                      profile.name
                    )}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">이메일</dt>
                  <dd className="font-medium">{profile.email}</dd>
                </div>
              </dl>
            </div>

            {/* 주소 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-3">
                주소
              </h3>
              <dl className="space-y-3 text-sm text-gray-700">
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500">우편번호</dt>
                  <dd className="font-medium">
                    {editing && editForm ? (
                      <input
                        type="text"
                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                        value={editForm.zipcode}
                        onChange={(e) =>
                          handleChange('zipcode', e.target.value)
                        }
                      />
                    ) : (
                      current.zipcode || '미등록'
                    )}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500">기본주소</dt>
                  <dd className="font-medium flex-1 text-right">
                    {editing && editForm ? (
                      <input
                        type="text"
                        className="border border-gray-300 rounded px-2 py-1 text-sm w-full"
                        value={editForm.address1}
                        onChange={(e) =>
                          handleChange('address1', e.target.value)
                        }
                      />
                    ) : (
                      current.address1 || '미등록'
                    )}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500">상세주소</dt>
                  <dd className="font-medium flex-1 text-right">
                    {editing && editForm ? (
                      <input
                        type="text"
                        className="border border-gray-300 rounded px-2 py-1 text-sm w-full"
                        value={editForm.address2}
                        onChange={(e) =>
                          handleChange('address2', e.target.value)
                        }
                      />
                    ) : (
                      current.address2 || '미등록'
                    )}
                  </dd>
                </div>
              </dl>
            </div>

            {/* 휴대전화 + 추가 정보 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-base font-semibold text-gray-900 mb-3">
                휴대전화 및 추가 정보
              </h3>
              <dl className="space-y-3 text-sm text-gray-700">
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500">휴대전화 번호</dt>
                  <dd className="font-medium">
                    {editing && editForm ? (
                      <input
                        type="text"
                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                        value={editForm.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                      />
                    ) : (
                      current.phone || '미등록'
                    )}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500 flex items-center gap-1">
                    <CreditCard className="h-4 w-4 text-gray-400" />
                    예금주
                  </dt>
                  <dd className="font-medium">
                    {editing && editForm ? (
                      <input
                        type="text"
                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                        value={editForm.bankHolder}
                        onChange={(e) =>
                          handleChange('bankHolder', e.target.value)
                        }
                      />
                    ) : (
                      current.bankHolder || '미등록'
                    )}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500 flex items-center gap-1">
                    <CreditCard className="h-4 w-4 text-gray-400" />
                    계좌번호
                  </dt>
                  <dd className="font-medium">
                    {editing && editForm ? (
                      <input
                        type="text"
                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                        value={editForm.bankAccount}
                        onChange={(e) =>
                          handleChange('bankAccount', e.target.value)
                        }
                      />
                    ) : (
                      current.bankAccount || '미등록'
                    )}
                  </dd>
                </div>
              </dl>

              <div className="mt-5 flex flex-wrap gap-3 justify-end">
                {editing ? (
                  <>
                    <button
                      type="button"
                      className="px-4 py-2 rounded-lg text-xs sm:text-sm font-medium border border-gray-300 hover:bg-gray-50 transition"
                      onClick={cancelEdit}
                      disabled={saving}
                    >
                      취소
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 rounded-lg text-xs sm:text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition disabled:opacity-60"
                      onClick={handleSave}
                      disabled={saving}
                    >
                      {saving ? '저장 중...' : '변경 사항 저장'}
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    className="px-4 py-2 rounded-lg text-xs sm:text-sm font-medium border border-gray-300 hover:bg-gray-50 transition"
                    onClick={startEdit}
                  >
                    회원 정보 수정
                  </button>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
