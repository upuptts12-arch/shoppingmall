import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/app/lib/connectDB'
import User from '@/app/models/User'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const {
      userId,
      email,
      password,
      name,
      phone,
      zipcode,
      address1,
      address2,
      bankHolder,
      bankAccount,
    } = await req.json()

    if (!userId || !email || !password || !name) {
      return NextResponse.json(
        { error: '필수 항목이 비어 있습니다.' },
        { status: 400 }
      )
    }

    const existing = await User.findOne({
      $or: [{ userId }, { email }],
    })

    if (existing) {
      return NextResponse.json(
        { error: '이미 사용 중인 아이디 또는 이메일입니다.' },
        { status: 400 }
      )
    }

    const hashed = await bcrypt.hash(password, 10)

    const user = new User({
      userId,
      email,
      name,
      password: hashed,
      phone,
      address: {
        zipcode,
        address1,
        address2,
      },
      bank: {
        holder: bankHolder,
        account: bankAccount,
      },
    })

    await user.save()

    console.log('회원가입 완료:', userId, email)

    return NextResponse.json({ message: '회원가입 성공' }, { status: 200 })
  } catch (err: any) {
    console.error('회원가입 서버 에러:', err)
    return NextResponse.json({ error: '서버 에러' }, { status: 500 })
  }
}
