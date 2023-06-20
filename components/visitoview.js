import { useEffect, useState } from 'react'
import { Flex, Text, Icon } from '@chakra-ui/react'
import { BiShow } from 'react-icons/bi'

const VisitorCount = () => {
  const [count, setCount] = useState(null)

  useEffect(() => {
    // Panggil API untuk mendapatkan jumlah pengunjung dari server
    fetch('/api/getViewCount')
      .then(response => response.json())
      .then(data => {
        setCount(data.visitorCount)
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }, [])

  return (
    <Flex alignItems="center">
      {count !== null && (
        <>
          <Text fontSize="smaller">{count}</Text>
          {/* <Text fontSize="smaller" ml={2}>
            Views
          </Text> */}
          <Icon as={BiShow} boxSize={5} ml={2} />
        </>
      )}
    </Flex>
  )
}

export default VisitorCount
