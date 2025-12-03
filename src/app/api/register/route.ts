import { NextResponse } from 'next/server'
import { connectDB } from '@/app/lib/mongodb'
import User from '@/app/models/User'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  try {
    await connectDB()
    const { name, email, password } = await req.json()

    // 이미 존재하는 이메일 체크
    const existing = await User.findOne({ email })
    if (existing) {
      return NextResponse.json(
        { error: '이미 가입된 이메일입니다.' },
        { status: 400 }
      )
    }

    // 비밀번호 해시
    const hashed = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashed,
    })

    return NextResponse.json(
      {
        message: '회원가입 성공',
        user: { name: user.name, email: user.email },
      },
      { status: 201 }
    )
  } catch (err: any) {
    console.log('회원가입 오류:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
