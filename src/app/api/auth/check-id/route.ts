import { NextRequest, NextResponse } from 'next/server'
import User from '../../../models/User'
import connectDB from '../../../lib/connectDB'

export async function GET(req: NextRequest) {
  try {
    await connectDB()

    const searchParams = req.nextUrl.searchParams
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ available: false }, { status: 400 })
    }

    const exists = await User.exists({ userId })
    return NextResponse.json({ available: !exists }, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ available: false }, { status: 500 })
  }
}
