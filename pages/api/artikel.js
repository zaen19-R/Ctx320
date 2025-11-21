import clientPromise from '../../lib/mongodb'

export default async function handler(req, res) {
  try {
    const { page = '1', limit = '10' } = req.query

    // sanitize input
    const pageNum = Math.max(
      1,
      parseInt(Array.isArray(page) ? page[0] : page, 10) || 1
    )
    const limitNum = Math.max(
      1,
      Math.min(100, parseInt(Array.isArray(limit) ? limit[0] : limit, 10) || 10)
    )

    const skip = (pageNum - 1) * limitNum

    const client = await clientPromise
    const db = client.db('ctx320') // ganti sesuai nama DB di URI jika perlu

    const collection = db.collection('Artikel')

    const [totalDocs, docs] = await Promise.all([
      collection.countDocuments(),
      collection.find({}).skip(skip).limit(limitNum).toArray()
    ])

    const totalPages = Math.max(1, Math.ceil(totalDocs / limitNum))

    res.status(200).json({
      ok: true,
      page: pageNum,
      limit: limitNum,
      totalDocs,
      totalPages,
      artikel: docs
    })
  } catch (e) {
    console.error('API /api/artikel error:', e)
    res.status(500).json({ ok: false, error: e.message })
  }
}
