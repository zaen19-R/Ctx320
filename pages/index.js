import NextLink from 'next/link'
import {
  Link,
  Container,
  Heading,
  Box,
  Button,
  List,
  ListItem,
  useColorModeValue,
  chakra,
  Flex,
  Grid,
  SimpleGrid
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import Paragraph from '../components/paragraph'
import { BioSection, BioYear } from '../components/bio'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import {
  IoLogoGithub,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoPinterest,
  IoLogoYoutube
} from 'react-icons/io5'
import Image from 'next/image'
// import { useState } from 'react'
// import Popup from '../components/Popup.js'
import VisitorCount from '../components/visitoview.js'
import React from 'react'
import New_Thumbnail from '../public/images/MONSTER.png'
import { WorkGridItem } from '../components/grid-item'

const ProfileImage = chakra(Image, {
  shouldForwardProp: prop => ['width', 'height', 'src', 'alt'].includes(prop)
})

const Home = () => {
  // const [isPopupOpen, setIsPopupOpen] = useState(false)

  // const handleClosePopup = () => {
  //   setIsPopupOpen(false)
  // }

  return (
    <Layout>
      <Container mt={2}>
        <SimpleGrid columns={[1]}>
          <WorkGridItem thumbnail={New_Thumbnail}></WorkGridItem>
        </SimpleGrid>
      </Container>
      <Container>
        {/* <Popup isOpen={isPopupOpen} onClose={handleClosePopup} /> */}
        <Box
          borderRadius="lg"
          mb={6}
          p={3}
          textAlign="center"
          bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
          css={{ backdropFilter: 'blur(10px)' }}
        >
          Hello, I&apos;m an indie app developer based in Indonesia!
        </Box>

        <Box display={{ md: 'flex' }}>
          <Box flexGrow={1}>
            <Heading as="h3" variant="page-title">
              Rozandi Hikmah
            </Heading>
            <p as="h4">
              Digital Craftsman ( Artist / Developer / Designer / Retail )
            </p>
            <Flex>
              <VisitorCount />
            </Flex>
          </Box>
          <Box
            flexShrink={0}
            mt={{ base: 4, md: 0 }}
            ml={{ md: 6 }}
            textAlign="center"
          >
            <Box
              borderColor="whiteAlpha.800"
              borderWidth={2}
              borderStyle="solid"
              w="100px"
              h="100px"
              display="inline-block"
              borderRadius="full"
              overflow="hidden"
            >
              <ProfileImage
                src="/images/zandy.jpg"
                alt="Profile image"
                borderRadius="full"
                width="100%"
                height="100%"
              />
            </Box>
          </Box>
        </Box>

        <Section delay={0.1}>
          <Heading as="h3" variant="section-title">
            Work
          </Heading>
          <Paragraph>
            Rozandi Hikmah is a freelance and a full-stack developer based in
            Palembang with a passion for building digital services/stuff. He has
            a knack for all things launching products, from planning and
            designing all the way to solving real-life problems with code. When
            not online, he loves hanging out with his camera.
          </Paragraph>
          <Box align="center" my={4}>
            <NextLink href="/works" passHref scroll={false}>
              <Button rightIcon={<ChevronRightIcon />} colorScheme="teal">
                My portfolio
              </Button>
            </NextLink>
          </Box>
        </Section>

        <Section delay={0.2}>
          <Heading as="h3" variant="section-title" mt={5}>
            Bio
          </Heading>
          <BioSection>
            <BioYear>1997</BioYear>
            Born in Palembang, Indonesia.
          </BioSection>
          <BioSection>
            <BioYear>2015 to 2019</BioYear>
            Tax Staff of PT Adelindo at Palembang
          </BioSection>
          <BioSection>
            <BioYear>2019 to 2021</BioYear>
            IT Support of PT Hero Supermarket Tbk at Palembang
          </BioSection>
          <BioSection>
            <BioYear>2021 to 2022</BioYear>
            Sales Executive of PT Home Center Indonesia at Palembang
          </BioSection>
          <BioSection>
            <BioYear>2022 to 2023</BioYear>
            Assisten Supervisor of MR DIY Indonesia
          </BioSection>
          <BioSection>
            <BioYear>2023 to 2023</BioYear>
            Store Supervisor of MR DIY Indonesia
          </BioSection>
          <BioSection>
            <BioYear>2023 to Present</BioYear>
            Team Support Supervisor of MR DIY Indonesia
          </BioSection>
          <BioSection>
            <BioYear>2025 to Present</BioYear>
            Founder Ctx320 | Indie Programing
          </BioSection>
          <BioSection>
            <BioYear>2025 to Present</BioYear>
            Interior and Outdor Art Design
          </BioSection>
        </Section>

        <Section delay={0.3}>
          <Heading as="h3" variant="section-title">
            I ♥
          </Heading>
          <Paragraph>
            Art, Music, Drawing, Photography , Machine Learning
          </Paragraph>
        </Section>

        <Section delay={0.3}>
          <Heading as="h3" variant="section-title">
            On the web
          </Heading>
          <Grid templateColumns="1fr auto">
            <List>
              <ListItem>
                <Link href="https://www.instagram.com/tama_z30" target="_blank">
                  <Button
                    variant="ghost"
                    colorScheme="teal"
                    leftIcon={<IoLogoInstagram />}
                  >
                    Instagram
                  </Button>
                </Link>
              </ListItem>
              <ListItem>
                <Link href="https://github.com/zaen19-R" target="_blank">
                  <Button
                    variant="ghost"
                    colorScheme="teal"
                    leftIcon={<IoLogoGithub />}
                  >
                    Github
                  </Button>
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  href="https://www.linkedin.com/in/rozandi-hikmah/"
                  target="_blank"
                >
                  <Button
                    variant="ghost"
                    colorScheme="teal"
                    leftIcon={<IoLogoLinkedin />}
                  >
                    linkedin
                  </Button>
                </Link>
              </ListItem>
            </List>
            <List>
              <ListItem>
                <Link
                  href="https://www.youtube.com/@zandizoldyc"
                  target="_blank"
                >
                  <Button
                    variant="ghost"
                    colorScheme="teal"
                    leftIcon={<IoLogoYoutube />}
                  >
                    Youtube
                  </Button>
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  href="https://id.pinterest.com/zandi_zoldyc/"
                  target="_blank"
                >
                  <Button
                    variant="ghost"
                    colorScheme="teal"
                    leftIcon={<IoLogoPinterest />}
                  >
                    Pinterst
                  </Button>
                </Link>
              </ListItem>
            </List>
          </Grid>
          <Box align="center" my={4}>
            <NextLink href="/posts" passHref scroll={false}>
              <Button rightIcon={<ChevronRightIcon />} colorScheme="teal">
                Popular posts
              </Button>
            </NextLink>
          </Box>
        </Section>
      </Container>
    </Layout>
  )
}

export default Home
export { getServerSideProps } from '../components/chakra'
