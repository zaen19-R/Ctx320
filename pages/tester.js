import { Container, Heading, Box, Center, Text } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import { useEffect, useState, useCallback } from 'react'
import clientPromise from '../lib/mongodb'

const Tester = ({
  initialArtikel = [],
  initialPage = 1,
  initialLimit = 5,
  initialTotalPages = 1,
  initialTotalDocs = 0
}) => {
  const [artikel, setArtikel] = useState(initialArtikel)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(initialPage)
  const [limit, setLimit] = useState(initialLimit)
  const [totalPages, setTotalPages] = useState(initialTotalPages)
  const [totalDocs, setTotalDocs] = useState(initialTotalDocs)

  useEffect(() => {
    let mounted = true

    // If current page/limit equals initial values, we already have data from server; no client fetch needed
    if (page === initialPage && limit === initialLimit) return

    setLoading(true)
    fetch(`/api/artikel?page=${page}&limit=${limit}`)
      .then(res => res.json())
      .then(data => {
        if (!mounted) return
        if (data && data.ok) {
          setArtikel(data.artikel || [])
          setTotalPages(data.totalPages || 1)
          setTotalDocs(data.totalDocs || 0)
        } else {
          setArtikel([])
          setTotalPages(1)
          setTotalDocs(0)
        }
      })
      .catch(err => {
        console.error('fetch /api/artikel error', err)
        setArtikel([])
        setTotalPages(1)
        setTotalDocs(0)
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [page, limit, initialPage, initialLimit])

  const prevPage = useCallback(() => setPage(p => Math.max(1, p - 1)), [])
  const nextPage = useCallback(
    () => setPage(p => Math.min(totalPages, p + 1)),
    [totalPages]
  )
  const goToPage = useCallback(
    p => setPage(Math.max(1, Math.min(totalPages, p))),
    [totalPages]
  )

  return (
    <Layout title={'Tester'}>
      <Container maxW={'container.xl'}>
        <Heading as="h3" fontSize={20} mb={4}>
          <Center>Artikel</Center>
        </Heading>

        <Box
          mb={3}
          display={{ base: '', md: 'flex' }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            Showing {Math.min(totalDocs, (page - 1) * limit + 1)} -{' '}
            {Math.min(totalDocs, page * limit)} of {totalDocs}
          </Box>
          <Box>
            <Button
              size="sm"
              mr={2}
              onClick={() => setLimit(5)}
              disabled={limit === 5}
            >
              5
            </Button>
            <Button
              size="sm"
              mr={2}
              onClick={() => setLimit(10)}
              disabled={limit === 10}
            >
              10
            </Button>
            <Button
              size="sm"
              mr={2}
              onClick={() => setLimit(20)}
              disabled={limit === 20}
            >
              20
            </Button>
          </Box>
        </Box>

        <Box
          maxW="100%"
          maxH="100%"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
        >
          {loading ? (
            <Box p={6}>Loading...</Box>
          ) : artikel.length === 0 ? (
            <Box
              bgColor={'darkblue'}
              p={4}
              margin={2}
              padding={5}
              borderRadius="md"
            >
              Tidak ada artikel.
            </Box>
          ) : (
            <Box>
              {artikel.map((item, idx) => (
                <Box
                  key={
                    (item._id && item._id.toString && item._id.toString()) ||
                    item._id ||
                    idx
                  }
                  bgColor={'Teal'}
                  p={4}
                  margin={2}
                  padding={5}
                  borderRadius="md"
                >
                  <strong>{item.judul || 'Tanpa Judul'}</strong>
                  <br />
                  {item.isi || ''}
                </Box>
              ))}
            </Box>
          )}
        </Box>

        <Box mt={4} display="flex" justifyContent="center" alignItems="center">
          <Button onClick={prevPage} mr={3} disabled={page <= 1}>
            <Text fontSize={{ base: '12px', md: '16px' }}>Prev</Text>
          </Button>
          <Box mr={3} alignItems="center">
            <Text fontSize={{ base: '12px', md: '16px' }}>
              Page {page} of {totalPages}
            </Text>
          </Box>
          <Button onClick={nextPage} mr={6} disabled={page >= totalPages}>
            <Text fontSize={{ base: '12px', md: '16px' }}>Next</Text>
          </Button>

          {/* Quick page jump: show up to 7 page buttons centered around current page */}
          <Box>
            {(() => {
              const pages = []
              const start = Math.max(1, page - 3)
              const end = Math.min(totalPages, page + 3)
              for (let p = start; p <= end; p++) {
                pages.push(
                  <Button
                    key={p}
                    size="sm"
                    mx={1}
                    onClick={() => goToPage(p)}
                    disabled={p === page}
                  >
                    {p}
                  </Button>
                )
              }
              return pages
            })()}
          </Box>
        </Box>
      </Container>
    </Layout>
  )
}

export default Tester
export async function getServerSideProps({ req, query }) {
  const page = parseInt(query.page || '1', 10) || 1
  const limit = Math.max(
    1,
    Math.min(100, parseInt(query.limit || '5', 10) || 5)
  )

  try {
    const client = await clientPromise
    const db = client.db('ctx320')
    const collection = db.collection('Artikel')

    const totalDocs = await collection.countDocuments()
    const skip = (page - 1) * limit
    const docs = await collection.find({}).skip(skip).limit(limit).toArray()

    return {
      props: {
        initialArtikel: JSON.parse(JSON.stringify(docs)),
        initialPage: page,
        initialLimit: limit,
        initialTotalPages: Math.max(1, Math.ceil(totalDocs / limit)),
        initialTotalDocs: totalDocs,
        cookies: req.headers.cookie ?? ''
      }
    }
  } catch (e) {
    console.error('getServerSideProps /tester error', e)
    return {
      props: {
        initialArtikel: [],
        initialPage: 1,
        initialLimit: 5,
        initialTotalPages: 1,
        initialTotalDocs: 0,
        cookies: req.headers.cookie ?? ''
      }
    }
  }
}
