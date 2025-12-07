const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const authRoutes = require('./routes/auth')

dotenv.config()

const app = express()

// 미들웨어
app.use(cors())
app.use(express.json())

// MongoDB 연결
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error', err))

// 기본 라우트
app.get('/', (req, res) => {
  res.send('API server running')
})

// 인증 라우트
app.use('/api/auth', authRoutes)

// 서버 시작
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
