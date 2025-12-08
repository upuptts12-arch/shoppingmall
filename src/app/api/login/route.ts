import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/app/lib/connectDB'
import User from '@/app/models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

export async function POST(req: NextRequest) {
  try {
    await connectDB()

    console.log('현재 DB 이름:', mongoose.connection.db?.databaseName)

    const { idOrEmail, password } = await req.json()

    // 값 체크
    if (!idOrEmail || !password) {
      return NextResponse.json(
        { error: '아이디/이메일과 비밀번호를 입력하세요.' },
        { status: 400 }
      )
    }

    console.log('로그인 시도:', idOrEmail)

    // 아이디 또는 이메일로 찾기
    const user = await User.findOne({
      $or: [{ email: idOrEmail }, { userId: idOrEmail }],
    })

    if (!user) {
      console.log('로그인 실패: user 없음', idOrEmail)
      return NextResponse.json(
        { error: '아이디/이메일 또는 비밀번호가 틀립니다.' },
        { status: 400 }
      )
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      console.log('로그인 실패: 비밀번호 불일치', idOrEmail)
      return NextResponse.json(
        { error: '아이디/이메일 또는 비밀번호가 틀립니다.' },
        { status: 400 }
      )
    }

    const secret = process.env.JWT_SECRET
    if (!secret) {
      console.error('JWT_SECRET이 설정되지 않음')
      return NextResponse.json(
        { error: '서버 설정 오류(JWT_SECRET)' },
        { status: 500 }
      )
    }

    const token = jwt.sign({ id: user._id }, secret, {
      expiresIn: '7d',
    })

    return NextResponse.json(
      {
        message: '로그인 성공',
        token,
        user: {
          name: user.name,
          email: user.email,
          userId: user.userId,
        },
      },
      { status: 200 }
    )
  } catch (err: any) {
    console.error('로그인 서버 에러:', err)
    return NextResponse.json({ error: '서버 에러' }, { status: 500 })
  }
}
