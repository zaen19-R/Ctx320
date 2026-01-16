import 'dotenv/config'
import mongoose from 'mongoose'

const uri = process.env.MONGODB_URI

if (!uri) {
  throw new Error('❌ MONGODB_URI belum diset di .env')
}

await mongoose.connect(uri)

console.log('✅ MongoDB connected')
