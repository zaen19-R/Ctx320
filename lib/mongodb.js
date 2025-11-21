import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const options = {}

if (!uri) {
  throw new Error('MONGODB_URI environment variable is not set')
}

let client
let clientPromise

if (process.env.NODE_ENV === 'development') {
  // reuse global cache during development to avoid creating multiple connections
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production (Vercel) create a new client / connect per invocation
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise
