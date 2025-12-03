import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI
if (!MONGODB_URI) throw new Error('MONGODB_URI 환경변수가 없습니다!')

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

let cached: MongooseCache = (global as any).mongoose || {
  conn: null,
  promise: null,
}

export async function connectDB() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI!, { dbName: 'shoppingmall' })
      .then((mongoose) => {
        console.log('MongoDB 연결 성공')
        return mongoose
      })
      .catch((err) => {
        console.error('MongoDB 연결 실패:', err)
        throw err
      })
  }

  cached.conn = await cached.promise
  ;(global as any).mongoose = cached

  return cached.conn
}
