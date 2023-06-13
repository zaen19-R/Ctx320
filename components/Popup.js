import React, { useState, useEffect } from 'react'
import { Image } from '@chakra-ui/react'
import { Heading, Box, Button, Grid } from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent } from '@chakra-ui/react'

const AutoLoadPopup = () => {
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 15)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <Modal isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent padding="10px" bg="bl" backdropFilter="blur(8px)">
        <Box display={'flex'} justifyContent={'flex-end'}>
          <Button onClick={handleClose} colorScheme="teal">
            Close
          </Button>
        </Box>
        <Box mt={-5} height={'150'}>
          <Grid templateColumns="auto 1fr" columnGap={4} alignItems="center">
            <Image
              src="/images/zandybanner.png"
              alt="Zandy Banner"
              height={150}
              rounded={'100%'}
            />
            <Box color="white">
              <Heading as="h1">Welcome</Heading>
              <Heading as="h4" variant="body-paraf">
                to Ctx320
              </Heading>
            </Box>
          </Grid>
        </Box>
      </ModalContent>
    </Modal>
  )
}

export default AutoLoadPopup
