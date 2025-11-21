import { Container, Heading, Box, Center, Text } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import { useEffect, useState } from 'react'

const Tester = () => {
  const [artikel, setArtikel] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5)
  const [totalPages, setTotalPages] = useState(1)
  const [totalDocs, setTotalDocs] = useState(0)

  useEffect(() => {
    let mounted = true
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
  }, [page, limit])

  const prevPage = () => setPage(p => Math.max(1, p - 1))
  const nextPage = () => setPage(p => Math.min(totalPages, p + 1))
  const goToPage = p => setPage(Math.max(1, Math.min(totalPages, p)))

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
                  bgColor={'darkslateblue'}
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
export { getServerSideProps } from '../components/chakra'
