import { Container, Heading, SimpleGrid } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { WorkGridItem } from '../components/grid-item'
import Banner_Not_Found from '../public/images/banner_Not_Found.jpg'
import Paragraph from '../components/paragraph'

const Certificate = () => (
  <Layout title="Posts">
    <Container>
      <Heading as="h3" fontSize={20} mb={4}>
        Certificate
      </Heading>

      <SimpleGrid columns={[1, 1, 1]} gap={6}>
        <Section>
          <WorkGridItem id="WNR" title="Post Not Found" thumbnail={Banner_Not_Found}>
            I&apos;m Sorry. Post Not Available Now
          <Paragraph>
          <p>Hallo perkenalkan nama saya Rozandi Hikmah, dan berikut merupakan certifikat yang saya miliki dalam mengikuti berberapa pelatihan dan pembelajaran baik itu secara formal maupun informal</p>
          </Paragraph>
          <p>Terima kasih anda telah mengunjungi Website saya</p>
          </WorkGridItem>
        </Section>
      </SimpleGrid>
      </Container>
  </Layout>
)

export default Certificate
export { getServerSideProps } from '../components/chakra'