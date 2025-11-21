import { Container, Heading, SimpleGrid, Center } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { WorkGridItem } from '../components/grid-item'
import Banner_Not_Found from '../public/images/banner_Not_Found.jpg'

const Store = () => (
  <Layout title="Store">
    <Container>
      <Heading as="h3" fontSize={20} mb={4}>
        <Center>My Product</Center>
      </Heading>

      <SimpleGrid columns={[1, 1, 1]} gap={6}>
        <Section>
          <WorkGridItem
            id="WNR"
            title="Post Not Found"
            thumbnail={Banner_Not_Found}
          >
            I&apos;m Sorry. Post Not Available Now
          </WorkGridItem>
        </Section>
      </SimpleGrid>
    </Container>
  </Layout>
)

export default Store
export { getServerSideProps } from '../components/chakra'
