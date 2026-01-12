import 'dotenv/config'
import mongoose from 'mongoose'
import NewsArticle from '../models/NewsArticle.js'

const uri = process.env.MONGODB_URI

if (!uri) {
  throw new Error('❌ MONGODB_URI belum diset di .env')
}

// await mongoose.connect(uri)

// console.log('✅ MongoDB connected')

async function main() {
  try {
    await mongoose.connect(uri)
    console.log('✅ MongoDB connected')

    const article = await NewsArticle.find()
    console.log('📄 Data artikel:')
    article.forEach((item, i) => {
      console.log(`${i + 1}.${item.title}`)
    })
  } catch (err) {
    console.error('Error:', err)
  } finally {
    await mongoose.disconnect()
    console.log('MongoDB disconnected!')
  }
}

await main()
