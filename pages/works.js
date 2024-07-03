import { Container, Heading, SimpleGrid } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { WorkGridItem } from '../components/grid-item'
// import Banner_Not_Found from '../public/images/banner_Not_Found.jpg'
import New_thumnail from '../public/images/MONSTER.png'

const Works = () => (
  <Layout title="Works">
    <Container>
      <Heading as="h3" fontSize={20} mb={4}>
        New Works
      </Heading>

      <SimpleGrid columns={[1, 1, 1]} gap={6}>
        <Section>
          <WorkGridItem
            // id="WNR"
            title="Work Not Ready"
            // thumbnail={Banner_Not_Found}
            thumbnail={New_thumnail}
          >
            I&apos;m Sorry. My Work on Progress, Thank you.
          </WorkGridItem>
        </Section>
      </SimpleGrid>
    </Container>
  </Layout>
)

export default Works
export { getServerSideProps } from '../components/chakra'
