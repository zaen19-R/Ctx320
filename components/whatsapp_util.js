import { Box, Container, IconButton } from '@chakra-ui/react'
import { FaWhatsapp } from 'react-icons/fa'

const handleSendMessage = () => {
  const phoneNumber = '6289503215816'
  const message = 'Silahkan tinggalkan pesan : '

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
    message
  )}`
  window.open(whatsappUrl, '_blank')
}
const WhatsAppButton = () => {
  return (
    <Box position="fixed">
      <Container
        display="flex"
        p={2}
        maxW="container.md"
        wrap="wrap"
        align="center"
        justify="space-between"
      >
        <Box>
          <IconButton
            bg="#128c7e"
            _hover={{ bg: '#075e54' }}
            color="white"
            aria-label="WhatsApp"
            icon={<FaWhatsapp />}
            onClick={handleSendMessage}
          />
        </Box>
      </Container>
    </Box>
  )
}

export default WhatsAppButton
