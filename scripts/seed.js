import 'dotenv/config'
import mongoose from 'mongoose'
import NewsArticle from '../models/NewsArticle.js'

await mongoose.connect(process.env.MONGODB_URI)

const articles = [
  {
    slug: 'inflasi-naik-kuartal-pertama-2026',
    title: 'Inflasi Nasional Naik di Kuartal Pertama 2026',
    summary: 'BPS mencatat kenaikan inflasi di awal tahun.',
    content: '<p>Badan Pusat Statistik melaporkan inflasi meningkat...</p>',
    category: { id: 'eco', name: 'Ekonomi' },
    author: { id: 'usr02', name: 'Rina Lestari' },
    images: {
      thumbnail: 'https://dummyimage.com/300x200',
      cover: 'https://dummyimage.com/1200x600'
    },
    tags: ['inflasi', 'bps'],
    status: 'published',
    publishedAt: new Date()
  },

  {
    slug: 'rupiah-menguat-terhadap-dolar',
    title: 'Rupiah Menguat Terhadap Dolar AS',
    summary: 'Nilai tukar rupiah mengalami penguatan signifikan.',
    content: '<p>Rupiah ditutup menguat pada perdagangan hari ini...</p>',
    category: { id: 'eco', name: 'Ekonomi' },
    author: { id: 'usr03', name: 'Budi Santoso' },
    images: {
      thumbnail: 'https://dummyimage.com/300x200',
      cover: 'https://dummyimage.com/1200x600'
    },
    tags: ['rupiah', 'dolar'],
    status: 'published',
    publishedAt: new Date()
  },

  {
    slug: 'pemerintah-luncurkan-program-umkm-digital',
    title: 'Pemerintah Luncurkan Program UMKM Digital',
    summary: 'UMKM didorong masuk ekosistem digital.',
    content: '<p>Program ini bertujuan meningkatkan daya saing UMKM...</p>',
    category: { id: 'biz', name: 'Bisnis' },
    author: { id: 'usr04', name: 'Siti Aminah' },
    images: {
      thumbnail: 'https://dummyimage.com/300x200',
      cover: 'https://dummyimage.com/1200x600'
    },
    tags: ['umkm', 'digital'],
    status: 'published',
    publishedAt: new Date()
  },

  {
    slug: 'ihsg-ditutup-melemah',
    title: 'IHSG Ditutup Melemah Akibat Tekanan Global',
    summary: 'Pasar saham tertekan sentimen global.',
    content: '<p>IHSG ditutup melemah pada perdagangan sore ini...</p>',
    category: { id: 'market', name: 'Pasar Modal' },
    author: { id: 'usr05', name: 'Dewi Kartika' },
    images: {
      thumbnail: 'https://dummyimage.com/300x200',
      cover: 'https://dummyimage.com/1200x600'
    },
    tags: ['ihsg', 'saham'],
    status: 'published',
    publishedAt: new Date()
  },

  {
    slug: 'harga-emas-naik-hari-ini',
    title: 'Harga Emas Naik Hari Ini',
    summary: 'Emas mengalami kenaikan harga.',
    content: '<p>Harga emas batangan hari ini tercatat naik...</p>',
    category: { id: 'market', name: 'Pasar Modal' },
    author: { id: 'usr06', name: 'Agus Salim' },
    images: {
      thumbnail: 'https://dummyimage.com/300x200',
      cover: 'https://dummyimage.com/1200x600'
    },
    tags: ['emas'],
    status: 'published',
    publishedAt: new Date()
  },

  {
    slug: 'startup-edutech-raih-investasi',
    title: 'Startup Edutech Raih Investasi Seri B',
    summary: 'Pendanaan digunakan untuk ekspansi regional.',
    content: '<p>Startup edutech lokal berhasil mendapatkan pendanaan...</p>',
    category: { id: 'tech', name: 'Teknologi' },
    author: { id: 'usr07', name: 'Nanda Putri' },
    images: {
      thumbnail: 'https://dummyimage.com/300x200',
      cover: 'https://dummyimage.com/1200x600'
    },
    tags: ['startup', 'edutech'],
    status: 'published',
    publishedAt: new Date()
  },

  {
    slug: 'ai-digunakan-di-layanan-publik',
    title: 'AI Mulai Digunakan di Layanan Publik',
    summary: 'Teknologi AI diterapkan untuk efisiensi.',
    content:
      '<p>Pemerintah mulai memanfaatkan AI untuk pelayanan publik...</p>',
    category: { id: 'tech', name: 'Teknologi' },
    author: { id: 'usr08', name: 'Rafi Nugraha' },
    images: {
      thumbnail: 'https://dummyimage.com/300x200',
      cover: 'https://dummyimage.com/1200x600'
    },
    tags: ['ai', 'teknologi'],
    status: 'published',
    publishedAt: new Date()
  },

  {
    slug: 'cuaca-ekstrem-melanda-jakarta',
    title: 'Cuaca Ekstrem Melanda Jakarta',
    summary: 'Hujan lebat disertai angin kencang.',
    content: '<p>BMKG memperingatkan potensi cuaca ekstrem...</p>',
    category: { id: 'nation', name: 'Nasional' },
    author: { id: 'usr09', name: 'Lukman Hakim' },
    images: {
      thumbnail: 'https://dummyimage.com/300x200',
      cover: 'https://dummyimage.com/1200x600'
    },
    tags: ['cuaca', 'bmkg'],
    status: 'published',
    isBreakingNews: true,
    publishedAt: new Date()
  },

  {
    slug: 'transportasi-listrik-diperluas',
    title: 'Transportasi Listrik Mulai Diperluas',
    summary: 'Bus listrik ditambah di beberapa kota.',
    content: '<p>Pemerintah memperluas penggunaan transportasi listrik...</p>',
    category: { id: 'nation', name: 'Nasional' },
    author: { id: 'usr10', name: 'Maya Putri' },
    images: {
      thumbnail: 'https://dummyimage.com/300x200',
      cover: 'https://dummyimage.com/1200x600'
    },
    tags: ['transportasi', 'listrik'],
    status: 'published',
    publishedAt: new Date()
  }

  // 👉 kamu bisa lanjutkan pola ini
]

await NewsArticle.insertMany(articles)

// await NewsArticle.create({
//   slug: 'harga-bbm-naik-mei-2026',
//   title: 'Harga BBM Resmi Naik Mulai Mei 2026',
//   summary: 'Pemerintah mengumumkan kenaikan harga BBM.',
//   content: '<p>Pemerintah resmi menaikkan harga BBM mulai Mei 2026...</p>',

//   category: {
//     id: 'eco',
//     name: 'Ekonomi'
//   },

//   author: {
//     id: 'usr01',
//     name: 'Andi Pratama'
//   },

//   images: {
//     thumbnail: 'https://dummyimage.com/300x200',
//     cover: 'https://dummyimage.com/1200x600'
//   },

//   tags: ['bbm', 'ekonomi'],
//   status: 'published',
//   isBreakingNews: true,
//   publishedAt: new Date()
// })

console.log('✅ Seed berhasil')
process.exit()
