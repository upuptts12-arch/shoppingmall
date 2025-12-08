// src/app/api/auth/profile/route.ts
import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/app/lib/connectDB'
import User from '@/app/models/User'
import jwt from 'jsonwebtoken'

interface JwtPayload {
  id: string
}

function getUserIdFromToken(req: NextRequest): {
  ok: boolean
  id?: string
  res?: NextResponse
} {
  const authHeader = req.headers.get('authorization')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return {
      ok: false,
      res: NextResponse.json(
        { error: '인증 정보가 없습니다. 다시 로그인해 주세요.' },
        { status: 401 }
      ),
    }
  }

  const token = authHeader.split(' ')[1]
  const secret = process.env.JWT_SECRET

  if (!secret) {
    console.error('JWT_SECRET이 설정되지 않음')
    return {
      ok: false,
      res: NextResponse.json(
        { error: '서버 설정 오류(JWT_SECRET 없음)' },
        { status: 500 }
      ),
    }
  }

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload
    return { ok: true, id: decoded.id }
  } catch (err) {
    console.error('JWT 검증 실패:', err)
    return {
      ok: false,
      res: NextResponse.json(
        { error: '토큰이 유효하지 않습니다. 다시 로그인해 주세요.' },
        { status: 401 }
      ),
    }
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB()

    const auth = getUserIdFromToken(req)
    if (!auth.ok) return auth.res!
    const userId = auth.id!

    const user = await User.findById(userId).lean()

    if (!user) {
      return NextResponse.json(
        { error: '사용자를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    const profile = {
      userId: (user as any).userId ?? '',
      email: (user as any).email ?? '',
      name: (user as any).name ?? '',
      phone: (user as any).phone ?? '',
      zipcode: (user as any).address?.zipcode ?? '',
      address1: (user as any).address?.address1 ?? '',
      address2: (user as any).address?.address2 ?? '',
      bankHolder: (user as any).bank?.holder ?? '',
      bankAccount: (user as any).bank?.account ?? '',
    }

    return NextResponse.json(profile, { status: 200 })
  } catch (err) {
    console.error('프로필 조회 서버 에러:', err)
    return NextResponse.json(
      { error: '서버 에러가 발생했습니다.' },
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDB()

    const auth = getUserIdFromToken(req)
    if (!auth.ok) return auth.res!
    const userId = auth.id!

    const body = await req.json()

    const {
      name,
      phone,
      zipcode,
      address1,
      address2,
      bankHolder,
      bankAccount,
    } = body

    const user = await User.findById(userId)

    if (!user) {
      return NextResponse.json(
        { error: '사용자를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    // 수정 가능한 필드만 업데이트
    if (name !== undefined) user.name = name
    if (phone !== undefined) user.phone = phone

    if (!user.address) user.address = {} as any
    if (zipcode !== undefined) (user.address as any).zipcode = zipcode
    if (address1 !== undefined) (user.address as any).address1 = address1
    if (address2 !== undefined) (user.address as any).address2 = address2

    if (!user.bank) user.bank = {} as any
    if (bankHolder !== undefined) (user.bank as any).holder = bankHolder
    if (bankAccount !== undefined) (user.bank as any).account = bankAccount

    await user.save()

    const updatedProfile = {
      userId: (user as any).userId ?? '',
      email: (user as any).email ?? '',
      name: (user as any).name ?? '',
      phone: (user as any).phone ?? '',
      zipcode: (user as any).address?.zipcode ?? '',
      address1: (user as any).address?.address1 ?? '',
      address2: (user as any).address?.address2 ?? '',
      bankHolder: (user as any).bank?.holder ?? '',
      bankAccount: (user as any).bank?.account ?? '',
    }

    return NextResponse.json(
      { message: '회원 정보가 수정되었습니다.', profile: updatedProfile },
      { status: 200 }
    )
  } catch (err) {
    console.error('프로필 수정 서버 에러:', err)
    return NextResponse.json(
      { error: '서버 에러가 발생했습니다.' },
      { status: 500 }
    )
  }
}
