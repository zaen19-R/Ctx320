import { Box, IconButton } from '@chakra-ui/react'
import { FaWhatsapp } from 'react-icons/fa'

const handleSendMessage = () => {
  const phoneNumber = '6289503215816';
  const message = 'Silahkan tinggalkan pesan : ';

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
};
const WhatsAppButton = () => {
  return (
    <Box 
    position='fixed'
    
    >
      <IconButton
      bg='green'
      aria-label="WhatsApp"
      icon={<FaWhatsapp />}
      onClick={handleSendMessage}
    />
    </Box>
  );
};

export default WhatsAppButton;
