// src/app/lib/connectDB.ts
import mongoose from 'mongoose'

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return

  const uri = process.env.MONGODB_URI

  console.log('MONGODB_URI in connectDB:', uri)

  if (!uri) {
    throw new Error('MONGODB_URI is not defined in .env.local')
  }

  await mongoose.connect(uri)
  console.log('MongoDB connected')
}

export default connectDB
