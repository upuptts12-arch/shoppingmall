const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const router = express.Router()

// 회원가입
router.post('/register', async (req, res) => {
  try {
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
    } = req.body

    if (!userId || !email || !password || !name) {
      return res.status(400).json({ message: '필수 항목이 비어 있습니다.' })
    }

    const existing = await User.findOne({
      $or: [{ userId }, { email }],
    })
    if (existing) {
      return res
        .status(400)
        .json({ message: '이미 사용 중인 아이디 또는 이메일입니다.' })
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
    return res.json({ message: '회원가입 성공' })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: '서버 에러' })
  }
})

// 로그인
router.post('/login', async (req, res) => {
  try {
    const { idOrEmail, password } = req.body

    if (!idOrEmail || !password) {
      return res
        .status(400)
        .json({ message: '아이디/이메일과 비밀번호를 입력하세요.' })
    }

    const user = await User.findOne({
      $or: [{ email: idOrEmail }, { userId: idOrEmail }],
    })

    if (!user) {
      return res.status(400).json({ message: '존재하지 않는 계정입니다.' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: '비밀번호가 틀렸습니다.' })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    })

    return res.json({
      message: '로그인 성공',
      token,
      name: user.name,
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: '서버 에러' })
  }
})

// 아이디 중복 확인
router.get('/check-id', async (req, res) => {
  try {
    const { userId } = req.query
    if (!userId) {
      return res.status(400).json({ available: false })
    }

    const exists = await User.exists({ userId })
    return res.json({ available: !exists })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ available: false })
  }
})

module.exports = router
