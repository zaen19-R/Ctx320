// scripts/seed.js
import clientPromise from '../lib/mongodb.js'
async function seed() {
  const client = await clientPromise
  const db = client.db('ctx320')
  await db
  process.exit(0)
}
seed().catch(e => {
  console.error(e)
  process.exit(1)
})
