import {
  Container,
  Heading,
  SimpleGrid,
  Box,
  Button,
  Text
} from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'

const Nomorks = () => (
  <Layout title="Works">
    {/* CSS untuk cetak hanya bagian tertentu */}
    <style>
      {`
        @media print {
          body * {
            visibility: hidden;
          }
          #print-area, #print-area * {
            visibility: visible;
          }
          #print-area {
            position: absolute;
            top: 0;
            left: 0;
            // width: 100%
            // align: center;s
          }
        }
      `}
    </style>

    <Container>
      <Heading as="h3" fontSize={20} mb={4}>
        Cetak Nomor Keep Stock
      </Heading>

      <SimpleGrid columns={[1, 1, 1]} gap={6}>
        <Section>
          <WorkGridItem title="Nomor Keep Stock" thumbnail={New_thumnail} />
        </Section>
      </SimpleGrid>

      <Section>
        <Box
          justifyContent="center"
          display="flex"
          alignItems="center"
          bg="white"
          width="210mm"
          height="297mm"
          // flexDirection="column"
        >
          {/* Tombol cetak - tidak akan terlihat saat print karena berada di luar #print-area */}

          {/* Area yang akan dicetak */}
          <div id="print-area">
            <SimpleGrid columns={1} spacing="40mm">
              <Box height="138.5mm" w="200mm" border="2px" borderColor="black">
                <Text
                  textColor="black"
                  fontSize="9xl"
                  fontFamily="sans-serif"
                  textAlign="center"
                >
                  KS001
                </Text>
                <Text
                  textColor="black"
                  fontSize="6xl"
                  fontFamily="sans-serif"
                  textAlign="center"
                >
                  AG001
                </Text>
              </Box>
              <Box
                height="138.5mm"
                w="200mm"
                border="2px"
                borderColor="black"
              />
            </SimpleGrid>
          </div>
        </Box>
        <Button onClick={() => window.print()} mt={10}>
          Cetak
        </Button>
      </Section>
    </Container>
  </Layout>
)

export default Nomorks
export { getServerSideProps } from '../components/chakra'
