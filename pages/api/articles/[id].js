import mongoose from 'mongoose'
import NewsArticle from '../../../models/NewArticle'
import clientPromise from '../../../lib/mongodb'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// helper ambil publicId dari URL
const getPublicId = url => {
  const parts = url.split('/')
  const file = parts.pop().split('.')[0]
  const folder = parts.pop()
  return `${folder}/${file}`
}

export default async function handler(req, res) {
  await clientPromise
  await mongoose.connect(process.env.MONGODB_URI)

  const { id } = req.query

  switch (req.method) {
    // ================= GET DETAIL =================
    case 'GET': {
      try {
        const article = await NewsArticle.findById(id).lean()
        if (!article) {
          return res.status(404).json({ message: 'Article not found' })
        }
        return res.status(200).json({ article })
      } catch (err) {
        return res.status(400).json({ message: 'Invalid ID' })
      }
    }

    // ================= UPDATE =================
    case 'PUT': {
      try {
        const updated = await NewsArticle.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        })

        return res.status(200).json({ article: updated })
      } catch (err) {
        return res.status(400).json({
          message: 'Failed update article',
          error: err.message
        })
      }
    }

    // ================= DELETE =================
    case 'DELETE': {
      try {
        await NewsArticle.findByIdAndDelete(id)
        return res.status(200).json({ success: true })
      } catch (err) {
        return res.status(400).json({
          message: 'Failed delete article'
        })
      }
    }

    default:
      return res.status(405).json({ message: 'Method Not Allowed' })
  }
}
