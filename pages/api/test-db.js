import clientPromise from '../../lib/mongodb'

export default async function handler(req, res) {
  try {
    const client = await clientPromise
    const db = client.db('ctx320') // atau client.db('nama_db') jika ingin DB tertentu
    const collections = await db.listCollections().toArray()
    res
      .status(200)
      .json({ ok: true, collections: collections.map(c => c.name) })
  } catch (e) {
    console.error('DB test error:', e)
    // Jangan keluarkan detail sensitif ke client di production
    res.status(500).json({ ok: false, error: e.message })
  }
}
