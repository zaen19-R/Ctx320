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

  // const handleClose = () => {
  //   setIsOpen(false)
  //   fetch('/api/increaseVisitiorCount', { method: 'POST' })
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log('Jumlah pengunjung ditambahkan : ', data.visitorCount)
  //     })
  //     .catch(error => {
  //       console.error('terjadi kesalahan :', error)
  //     })
  // }
  const handleClose = async () => {
    setIsOpen(false)

    try {
      // Make a POST request to the API endpoint to increase the visitor count
      const response = await fetch('/api/increaseVisitorCount', {
        method: 'POST'
      })

      if (response.ok) {
        const data = await response.json()
        const visitorCount = data.visitorCount
        console.log('Visitor count:', visitorCount)
        // Use the updated visitor count for further purposes
      } else {
        // Handle the response error
        console.log('Error:', response.statusText)
      }
    } catch (error) {
      // Handle the request error
      console.log('Error:', error.message)
    }
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
