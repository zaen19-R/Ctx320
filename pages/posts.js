import {
  Container,
  Heading,
  SimpleGrid,
  Box,
  Badge,
  Text,
  Image,
  HStack
} from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import Paragraph from '../components/paragraph'
import { WorkGridItem } from '../components/grid-item'
import Banner_Not_Found from '../public/images/banner_Not_Found.jpg'
import { useState, useEffect } from 'react'

const Posts = () => {
  let mounted = true
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadArticles() {
      try {
        const res = await fetch('/api/articles')
        const data = await res.json()
        setArticles(data.articles || [])
      } catch (err) {
        console.error('Failed load articles', err)
        setArticles([])
      } finally {
        if (mounted) setLoading(false)
      }
    }

    loadArticles()
  }, [])

  return (
    <Layout title="Posts">
      <Container maxW="container.xl">
        <Heading as="h3" fontSize={20} mb={6}>
          News Today
        </Heading>

        {loading ? (
          <Box justifyContent={'center'} alignItems={''}>
            <Text>Loading...</Text>
          </Box>
        ) : (
          <SimpleGrid columns={[1]} gap={1}>
            {articles.length === 0 ? (
              <Section>
                <WorkGridItem
                  id="not-found"
                  title="Post Not Found"
                  thumbnail={Banner_Not_Found}
                >
                  Belum ada berita tersedia.
                </WorkGridItem>
              </Section>
            ) : (
              articles.map(article => (
                <Section key={article._id}>
                  <Box
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    p={4}
                  >
                    <HStack>
                      <Box>
                        <Image src="/images/no-image.png" boxSize="100px" />
                      </Box>
                      <Box maxH={'sm'} w={'80%'} h={'100px'}>
                        <Paragraph>{article.summary}</Paragraph>
                        <Box display="flex" ml={4}>
                          {article.isBreakingNews && (
                            <Badge colorScheme="red">Breaking</Badge>
                          )}

                          <Text fontSize="xs" color="gray.500">
                            {new Date(article.publishedAt).toLocaleDateString()}
                          </Text>
                        </Box>
                      </Box>
                    </HStack>
                  </Box>
                </Section>
              ))
            )}
          </SimpleGrid>
        )}
      </Container>
    </Layout>
  )
}

export default Posts
export { getServerSideProps } from '../components/chakra'
