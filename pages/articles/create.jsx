import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Textarea,
  Text,
  Link,
  Box,
  Spinner
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import Layout from '../../components/layouts/article'

/* ================= UPLOAD IMAGE ================= */
async function uploadImage(file, oldPublicId = null) {
  console.group('📤 uploadImage')
  console.log('File:', file)
  console.log('Old Public ID:', oldPublicId)

  if (!file) {
    console.warn('❌ Tidak ada file')
    console.groupEnd()
    return null
  }

  const formData = new FormData()
  formData.append('file', file)
  if (oldPublicId) formData.append('oldPublicId', oldPublicId)

  const res = await fetch('/api/upload_image', {
    method: 'POST',
    body: formData
  })

  if (!res.ok) {
    const text = await res.text()
    console.error('❌ Upload gagal:', text)
    console.groupEnd()
    throw new Error(text || 'Upload gagal')
  }

  const data = await res.json()
  console.log('✅ Upload sukses', data)
  console.groupEnd()

  return {
    url: data.url,
    publicId: data.publicId
  }
}

/* ================= DELETE IMAGE ================= */
function deleteImage(publicId) {
  if (!publicId) return

  console.log('🗑️ Auto delete image:', publicId)

  const formData = new FormData()
  formData.append('oldPublicId', publicId)
  formData.append('beacon', 'true')

  fetch('/api/upload_image', {
    method: 'POST',
    body: formData,
    keepalive: true // penting untuk refresh / close tab
  })
}

/* ================= PAGE ================= */
export default function CreateArticle() {
  const [form, setForm] = useState({
    title: '',
    summary: '',
    content: '',
    category: 'eco',
    author: 'usr02',
    tags: '',
    status: 'draft',
    thumbnail: '',
    thumbnailPublicId: null,
    cover: '',
    coverPublicId: null
  })

  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState({
    thumbnail: false,
    cover: false
  })

  /* ================= AUTO DELETE ON REFRESH / CLOSE ================= */
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (form.thumbnailPublicId) deleteImage(form.thumbnailPublicId)
      if (form.coverPublicId) deleteImage(form.coverPublicId)
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [form.thumbnailPublicId, form.coverPublicId])

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    if (!form.thumbnail || !form.cover) {
      alert('Thumbnail & Cover WAJIB diupload')
      return
    }

    setLoading(true)

    const payload = {
      slug: form.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, ''),
      title: form.title,
      summary: form.summary,
      content: form.content,
      category: {
        id: form.category,
        name:
          form.category === 'eco'
            ? 'Ekonomi'
            : form.category === 'tech'
            ? 'Teknologi'
            : form.category === 'pol'
            ? 'Politik'
            : 'Life'
      },
      author: {
        id: 'admin_01',
        name: 'Rozandi Hikmah'
      },
      images: {
        thumbnail: form.thumbnail,
        cover: form.cover
      },
      tags: form.tags ? form.tags.split(',').map(t => t.trim()) : [],
      status: form.status,
      publishedAt: form.status === 'published' ? new Date() : null
    }

    try {
      const res = await fetch('/api/articles/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const text = await res.text()
      if (!res.ok) throw new Error(text)

      alert('✅ Artikel berhasil disimpan')

      // ⛔ cegah auto delete setelah submit sukses
      setForm(f => ({
        ...f,
        thumbnailPublicId: null,
        coverPublicId: null
      }))
    } catch (err) {
      console.error('❌ Submit error:', err)
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout title="Create Article">
      <Container maxW="container.md">
        <Text fontSize="2xl" mb={4}>
          Create Article
        </Text>

        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Judul</FormLabel>
            <Input
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
            />

            <FormLabel>Ringkasan</FormLabel>
            <Textarea
              value={form.summary}
              onChange={e => setForm({ ...form, summary: e.target.value })}
            />

            <FormLabel>Konten (HTML)</FormLabel>
            <Textarea
              rows={8}
              value={form.content}
              onChange={e => setForm({ ...form, content: e.target.value })}
            />

            <FormLabel>Kategori</FormLabel>
            <Select
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
            >
              <option value="eco">Ekonomi</option>
              <option value="tech">Teknologi</option>
              <option value="pol">Politik</option>
              <option value="lif">Life</option>
            </Select>

            <FormLabel>Tags</FormLabel>
            <Input
              placeholder="inflasi, bps"
              value={form.tags}
              onChange={e => setForm({ ...form, tags: e.target.value })}
            />

            <FormLabel>Status</FormLabel>
            <Select
              value={form.status}
              onChange={e => setForm({ ...form, status: e.target.value })}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </Select>

            {/* ========= THUMBNAIL ========= */}
            <FormLabel>Thumbnail</FormLabel>
            <Input
              type="file"
              accept="image/*"
              onChange={async e => {
                const file = e.target.files?.[0]
                if (!file) return

                setUploading(p => ({ ...p, thumbnail: true }))
                try {
                  const result = await uploadImage(file, form.thumbnailPublicId)
                  if (!result) return

                  setForm(p => ({
                    ...p,
                    thumbnail: result.url,
                    thumbnailPublicId: result.publicId
                  }))
                } finally {
                  setUploading(p => ({ ...p, thumbnail: false }))
                }
              }}
            />

            {uploading.thumbnail && <Spinner />}
            {form.thumbnail && (
              <Box mt={2}>
                <img
                  src={form.thumbnail}
                  style={{ width: '100%', maxHeight: 200, objectFit: 'cover' }}
                />
              </Box>
            )}

            {/* ========= COVER ========= */}
            <FormLabel mt={4}>Cover Image</FormLabel>
            <Input
              type="file"
              accept="image/*"
              onChange={async e => {
                const file = e.target.files?.[0]
                if (!file) return

                setUploading(p => ({ ...p, cover: true }))
                try {
                  const result = await uploadImage(file, form.coverPublicId)
                  if (!result) return

                  setForm(p => ({
                    ...p,
                    cover: result.url,
                    coverPublicId: result.publicId
                  }))
                } finally {
                  setUploading(p => ({ ...p, cover: false }))
                }
              }}
            />

            {uploading.cover && <Spinner />}
            {form.cover && (
              <Box mt={2}>
                <img
                  src={form.cover}
                  style={{ width: '100%', maxHeight: 300, objectFit: 'cover' }}
                />
              </Box>
            )}
          </FormControl>

          <Button colorScheme="blue" onClick={handleSubmit} isLoading={loading}>
            Simpan Artikel
          </Button>

          <Button
            colorScheme="gray"
            onClick={() => {
              if (form.thumbnailPublicId) deleteImage(form.thumbnailPublicId)
              if (form.coverPublicId) deleteImage(form.coverPublicId)
              window.location.href = '/'
            }}
          >
            Kembali
          </Button>
        </Stack>
      </Container>
    </Layout>
  )
}

export { getServerSideProps } from '../../components/chakra'
