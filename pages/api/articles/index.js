import dbConnect from '../../../lib/mongoose'
import NewsArticle from '../../../models/NewsArticle'

export default async function handler(req, res) {
  await dbConnect()

  switch (req.method) {
    // ================= GET ARTICLES =================
    case 'GET': {
      try {
        const articles = await NewsArticle.find().sort({ createdAt: -1 }).lean()

        return res.status(200).json({ articles })
      } catch (error) {
        console.error('GET ARTICLES ERROR:', error)
        return res.status(500).json({
          message: 'Failed to fetch articles'
        })
      }
    }

    // ================= CREATE ARTICLE =================
    case 'POST': {
      try {
        console.log('REQ BODY:', req.body)
        console.log('REQ BODY TYPE:', typeof req.body)

        const article = await NewsArticle.create(req.body)

        return res.status(201).json(article)
      } catch (error) {
        console.error('CREATE ARTICLE ERROR:', error)

        if (error.code === 11000) {
          return res.status(409).json({
            message: 'Slug sudah digunakan'
          })
        }

        if (error.name === 'ValidationError') {
          return res.status(400).json({
            message: error.message,
            errors: error.errors
          })
        }

        return res.status(500).json({
          message: 'Internal Server Error',
          error: error.message
        })
      }
    }

    // ================= METHOD NOT ALLOWED =================
    default:
      return res.status(405).json({ message: 'Method Not Allowed' })
  }
}
