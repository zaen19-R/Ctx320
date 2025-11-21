// scripts/seed.js
import clientPromise from '../lib/mongodb.js'
async function seed() {
  const client = await clientPromise
  const db = client.db('ctx320')
  await db.collection('bio').insertOne({ name: 'Takuya', bio: '...' })
  await db
    .collection('visitorCount')
    .updateOne({ _id: 'counter' }, { $set: { count: 0 } }, { upsert: true })
  console.log('seeded')
  process.exit(0)
}
seed().catch(e => {
  console.error(e)
  process.exit(1)
})
