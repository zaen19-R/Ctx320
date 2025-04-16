import {
  Container,
  Heading,
  SimpleGrid,
  Grid,
  GridItem
} from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { WorkGridItem } from '../components/grid-item'
// import Banner_Not_Found from '../public/images/banner_Not_Found.jpg'
import New_thumnail from '../public/images/MONSTER.png'

const Works = () => (
  <Layout title="Works">
    <Container>
      <Heading as="h3" fontSize={20} mb={4}>
        My Works
      </Heading>

      <SimpleGrid columns={[1, 1, 1]} gap={6}>
        <Section>
          <WorkGridItem
            // id="WNR"
            title="Apps"
            // thumbnail={Banner_Not_Found}
            thumbnail={New_thumnail}
          >
            <Grid templateColumns="repeat(5, 1fr)" gap={6} paddingTop={5}>
              <GridItem w="100%" h="10" rounded="20" bg="blue.500" />
              <GridItem w="100%" h="10" bg="blue.500" />
              <GridItem w="100%" h="10" bg="blue.500" />
              <GridItem w="100%" h="10" bg="blue.500" />
              <GridItem w="100%" h="10" bg="blue.500" />
            </Grid>
          </WorkGridItem>
        </Section>
      </SimpleGrid>
    </Container>
  </Layout>
)

export default Works
export { getServerSideProps } from '../components/chakra'
