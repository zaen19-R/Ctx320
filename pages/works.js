import { Container, Heading, SimpleGrid } from '@chakra-ui/react'
import Link from 'next/link'
import { Button } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
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
            id="WNR"
            title="Apps"
            // thumbnail={Banner_Not_Found}
            thumbnail={New_thumnail}
          ></WorkGridItem>
        </Section>
      </SimpleGrid>
      <SimpleGrid columns={[4, null]} justifyItems={'center'} margin={3}>
        <Button w="80px" h="80px" bg="tomato">
          <Link href="/nomorks">
            <AddIcon width="40px" height="40px" />
          </Link>
        </Button>
        <Button w="80px" h="80px" bg="tomato">
          <Link href="/nomorks">
            <AddIcon width="40px" height="40px" />
          </Link>
        </Button>
        <Button w="80px" h="80px" bg="tomato">
          <Link href="/nomorks">
            <AddIcon width="40px" height="40px" />
          </Link>
        </Button>
        <Button w="80px" h="80px" bg="tomato">
          <Link href="/nomorks">
            <AddIcon width="40px" height="40px" />
          </Link>
        </Button>
      </SimpleGrid>
    </Container>
  </Layout>
)

export default Works
export { getServerSideProps } from '../components/chakra'
