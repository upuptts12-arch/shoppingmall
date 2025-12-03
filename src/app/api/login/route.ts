import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { User } from '@/models/User'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  try {
    await connectDB()
    const { email, password } = await req.json()
    const user = await User.findOne({ email })
    if (!user)
      return NextResponse.json(
        { error: '이메일 또는 비밀번호가 틀립니다.' },
        { status: 400 }
      )

    const valid = await bcrypt.compare(password, user.password)
    if (!valid)
      return NextResponse.json(
        { error: '이메일 또는 비밀번호가 틀립니다.' },
        { status: 400 }
      )

    // 로그인 성공
    return NextResponse.json({
      message: '로그인 성공',
      user: { name: user.name, email: user.email },
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
