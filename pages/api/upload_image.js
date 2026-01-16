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

export default async function handler(req, res) {
  /* ================= DELETE (sendBeacon) ================= */
  if (req.method === 'DELETE') {
    try {
      let body = ''

      req.on('data', chunk => {
        body += chunk.toString()
      })

      req.on('end', async () => {
        const { publicId } = JSON.parse(body || '{}')

        if (!publicId) {
          return res.status(400).json({ message: 'publicId required' })
        }

        console.log('🗑️ DELETE IMAGE:', publicId)

        const result = await cloudinary.uploader.destroy(publicId)

        console.log('DELETE RESULT:', result)

        return res.status(200).json({ success: true })
      })
    } catch (err) {
      console.error('DELETE ERROR:', err)
      return res.status(500).json({ error: err.message })
    }

    return
  }

  /* ================= POST (UPLOAD) ================= */
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const form = formidable({ multiples: false })
  let file

  try {
    const { files, fields } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err)
        resolve({ files, fields })
      })
    })

    file = files.file?.[0]

    const oldPublicId = Array.isArray(fields.oldPublicId)
      ? fields.oldPublicId[0]
      : fields.oldPublicId

    if (!file) {
      return res.status(400).json({ message: 'File tidak ditemukan' })
    }

    // 1️⃣ Upload baru
    const upload = await cloudinary.uploader.upload(file.filepath, {
      folder: 'articles'
    })

    // 2️⃣ Delete lama (jika ada)
    if (oldPublicId) {
      const del = await cloudinary.uploader.destroy(oldPublicId)
      console.log('♻️ REPLACE DELETE:', del)
    }

    return res.status(200).json({
      success: true,
      url: upload.secure_url,
      publicId: upload.public_id
    })
  } catch (error) {
    console.error('UPLOAD ERROR:', error)
    return res.status(500).json({ error: error.message })
  } finally {
    if (file?.filepath) {
      fs.unlink(file.filepath, () => {})
    }
  }
}
