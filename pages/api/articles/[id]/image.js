import dbConnect from '../../../../lib/mongoose'
import NewsArticle from '../../../../models/NewsArticle'
import { v2 as cloudinary } from 'cloudinary'
import formidable from 'formidable'
import fs from 'fs'

export const config = {
  api: {
    bodyParser: false
  }
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const getPublicId = url => {
  const parts = url.split('/')
  const file = parts.pop().split('.')[0]
  const folder = parts.pop()
  return `${folder}/${file}`
}

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    await dbConnect()

    const article = await NewsArticle.findById(req.query.id)
    if (!article) {
      return res.status(404).json({ message: 'Artikel tidak ditemukan' })
    }

    const form = formidable({ multiples: false })

    const { files, fields } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err)
        resolve({ files, fields })
      })
    })

    const file = files.file?.[0]
    const type = fields.type // thumbnail | cover

    if (!file || !['thumbnail', 'cover'].includes(type)) {
      return res.status(400).json({ message: 'Invalid upload' })
    }

    /* ===== DELETE OLD IMAGE ===== */
    if (article.images[type]) {
      await cloudinary.uploader.destroy(getPublicId(article.images[type]))
    }

    /* ===== UPLOAD NEW IMAGE ===== */
    const upload = await cloudinary.uploader.upload(file.filepath, {
      folder: 'articles'
    })

    fs.unlinkSync(file.filepath)

    article.images[type] = upload.secure_url
    await article.save()

    return res.status(200).json({
      success: true,
      url: upload.secure_url
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message })
  }
}
