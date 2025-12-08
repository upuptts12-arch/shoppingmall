// controllers/categoryController.js
const Category = require('../models/Category')

// 모든 카테고리 목록을 가져오는 함수
exports.getAllCategories = async (req, res) => {
  try {
    // find() 메서드로 데이터베이스의 모든 카테고리 문서를 찾습니다.
    const categories = await Category.find({})
    // 성공적으로 찾은 카테고리 배열을 JSON 형태로 응답합니다.
    res.status(200).json(categories)
  } catch (err) {
    res
      .status(500)
      .json({
        message: '카테고리를 불러오는 데 실패했습니다.',
        error: err.message,
      })
  }
}
