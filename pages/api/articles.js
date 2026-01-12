import clientPromise from '../../lib/mongodb'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      ok: false,
      message: 'Method Not Allowed'
    })
  }

  try {
    const client = await clientPromise
    const db = client.db('ctx320')

    const { page = 1, limit = 10, status = 'published' } = req.query

    const pageNum = Math.max(1, parseInt(page))
    const limitNum = Math.min(50, parseInt(limit))
    const skip = (pageNum - 1) * limitNum

    const filter = status ? { status } : {}

    const [articles, totalDocs] = await Promise.all([
      db
        .collection('newsarticles')
        .find(filter)
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .toArray(),

      db.collection('newsarticles').countDocuments(filter)
    ])

    return res.status(200).json({
      ok: true,
      page: pageNum,
      limit: limitNum,
      totalDocs,
      totalPages: Math.ceil(totalDocs / limitNum),
      articles
    })
  } catch (error) {
    console.error('❌ API /articles error:', error)

    return res.status(500).json({
      ok: false,
      message: 'Internal Server Error'
    })
  }
}
