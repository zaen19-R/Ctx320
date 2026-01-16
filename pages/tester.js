import { Container, Input, Text } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import { useState } from 'react'

async function uploadImage(file, oldPublicId = null) {
  const formData = new FormData()
  formData.append('file', file)

  if (oldPublicId) {
    formData.append('oldPublicId', oldPublicId)
  }

  const res = await fetch('/api/upload_image', {
    method: 'POST',
    body: formData
  })

  if (!res.ok) {
    throw new Error('Upload gagal')
  }

  return await res.json() // { url, publicId }
}

const Tester = () => {
  const [imageUrl, setImageUrl] = useState(null)
  const [publicId, setPublicId] = useState(null)

  return (
    <Layout title="Tester">
      <Container>
        <Text mb={2}>Uji Upload + Replace Image</Text>

        <Input
          type="file"
          accept="image/*"
          onChange={async e => {
            const file = e.target.files?.[0]
            if (!file) return

            const result = await uploadImage(file, publicId)

            setImageUrl(result.url)
            setPublicId(result.publicId)

            console.log('UPLOAD RESULT:', result)
          }}
        />

        {imageUrl && (
          <img
            src={imageUrl}
            alt="Uploaded"
            width={200}
            style={{ marginTop: 16 }}
          />
        )}
      </Container>
    </Layout>
  )
}

export default Tester
export { getServerSideProps } from '../components/chakra'
