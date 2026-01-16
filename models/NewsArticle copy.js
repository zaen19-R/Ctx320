import mongoose from 'mongoose'

const { Schema } = mongoose

/* ================= SUB SCHEMA ================= */

const CategorySchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true }
  },
  { _id: false }
)

const AuthorSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    avatarUrl: { type: String }
  },
  { _id: false }
)

const ImageSchema = new Schema(
  {
    thumbnail: { type: String, required: true },
    cover: { type: String, required: true },
    gallery: [{ type: String }]
  },
  { _id: false }
)

const MetricSchema = new Schema(
  {
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    comments: { type: Number, default: 0 }
  },
  { _id: false }
)

const SeoSchema = new Schema(
  {
    metaTitle: { type: String },
    metaDescription: { type: String },
    keywords: [{ type: String }]
  },
  { _id: false }
)

/* ================= MAIN SCHEMA ================= */

const NewsArticleSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true
    },

    title: { type: String, required: true },
    subtitle: { type: String },

    summary: { type: String, required: true },
    content: { type: String, required: true },

    category: { type: CategorySchema, required: true },

    tags: [{ type: String, index: true }],

    author: { type: AuthorSchema, required: true },

    images: { type: ImageSchema, required: true },

    source: {
      name: { type: String },
      url: { type: String }
    },

    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
      index: true
    },

    publishedAt: { type: Date },

    metrics: { type: MetricSchema, default: () => ({}) },

    seo: { type: SeoSchema },

    isBreakingNews: { type: Boolean, default: false, index: true },
    isFeatured: { type: Boolean, default: false, index: true }
  },
  {
    timestamps: true // createdAt & updatedAt
  }
)

/* ================= INDEX OPTIMIZATION ================= */

// untuk list berita terbaru
NewsArticleSchema.index({ publishedAt: -1 })

// untuk search
NewsArticleSchema.index({
  title: 'text',
  summary: 'text',
  content: 'text'
})

// filter homepage
NewsArticleSchema.index({
  status: 1,
  isFeatured: 1,
  isBreakingNews: 1
})

export default mongoose.model.NewsArticle ||
  mongoose.model('NewsArticle', NewsArticleSchema)
