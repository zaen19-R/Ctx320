import 'dotenv/config'
import mongoose from 'mongoose'
import NewsArticle from '../models/NewsArticle.js'

await mongoose.connect(process.env.MONGODB_URI)

// const articles = [
//   {
//     slug: 'test-article',
//     title: 'Judul Test',
//     summary: 'Ringkasan',
//     content: '<p>Isi</p>',
//     category: { id: 'eco', name: 'Ekonomi' },
//     author: { id: 'usr01', name: 'Admin' },
//     images: {
//       thumbnail: 'https://dummyimage.com/300x200',
//       cover: 'https://dummyimage.com/1200x600'
//     },
//     status: 'published'
//   }

//   // 👉 kamu bisa lanjutkan pola ini
// ]

// await NewsArticle.insertMany(articles)

await NewsArticle.findOneAndUpdate(
  { slug: 'harga-bbm-naik-mei-2026' }, // FILTER
  {
    $set: {
      title: 'Harga BBM Resmi Naik Mulai Mei 2026',
      summary: 'Pemerintah mengumumkan kenaikan harga BBM.',
      content: '<p>Pemerintah resmi menaikkan harga BBM mulai Mei 2026...</p>',
      category: { id: 'eco', name: 'Ekonomi' },
      author: { id: 'usr01', name: 'Andi Pratama' },
      images: {
        thumbnail: 'https://dummyimage.com/300x200',
        cover: 'https://dummyimage.com/1200x600'
      },
      tags: ['bbm', 'ekonomi'],
      status: 'published',
      isBreakingNews: true,
      publishedAt: new Date()
    }
  },
  { upsert: true, new: true, runValidators: true }
)

console.log('✅ Seed berhasil')
process.exit()
