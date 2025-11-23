import {
  Container,
  Heading,
  SimpleGrid,
  Box,
  Button,
  Text,
  HStack,
  VStack,
  Divider
} from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { WorkGridItem } from '../components/grid-item'
import New_thumnail from '../public/images/MONSTER.png'
import * as XLSX from 'xlsx'
import { useState } from 'react'

const Nomorks = () => {
  const [excelData, setExcelData] = useState([])

  const handleImportExcel = e => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = event => {
      // gunakan ArrayBuffer untuk kompatibilitas
      const data = new Uint8Array(event.target.result)
      const workbook = XLSX.read(data, { type: 'array' })

      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]

      // Ambil data jadi array 2 dimensi
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

      // Ambil hanya kolom 0 dan 1
      const result = jsonData.map(row => ({
        ks_number: row[0] || '',
        box_number: row[1] || ''
      }))

      console.log('Data Excel:', result)
      setExcelData(result)
    }

    reader.readAsArrayBuffer(file)
  }

  const handlePrintA4 = () => {
    // remove previous style if exists
    const prev = document.getElementById('print-a4-style')
    if (prev && prev.parentNode) prev.parentNode.removeChild(prev)

    const style = document.createElement('style')
    style.id = 'print-a4-style'
    style.innerHTML = `
     @page {
  size: A4 portrait;
  margin: 10mm;
}

@media print {

  html, body {
    margin: 0;
    padding: 0;
    width: 210mm;
    height: 297mm;
  }

  body * {
    visibility: hidden;
  }

  #print-area, #print-area * {
    visibility: visible;
  }

  /* ====== PRINT AREA LAYOUT (POTRAIT) ====== */
  #print-area {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;  /* 2 rows, 1 column */
    justify-content: center; /* center vertically */
    align-items: center;     /* center horizontally */
    gap: 20mm;
    box-sizing: border-box;
  }

  /* ====== LABEL CARD (A5 IN POTRAIT MODE) ====== */
  .label-card {
  width: 180mm;            /* Lebar area label */
  height: 120mm;           /* Tinggi label */
  border: 2px solid #222;
  background: #fff;

  // display: flex;
  // flex-direction: column;
  justify-content: center; /* Center vertical */
  align-items: center;     /* Center horizontal */
  text-align: center;      /* Center text */

  padding: 10mm;           /* Hindari tulisan terlalu mepet border */
  box-sizing: border-box;

  page-break-inside: avoid;
  break-inside: avoid;
}
  /* ========= TEXT STYLE ========= */
  .label-card .ks {
    font-size: 80pt;
    font-weight: 900;
    margin-bottom: 10pt;
  }

  .label-card .box {
    font-size: 65pt;
    font-weight: 800;
  }
}


        /* Hide any UI elements during print */
        a, button, input, label, .chakra-divider { display: none !important; }
      }
    `
    document.head.appendChild(style)

    window.print()

    // cleanup a bit later
    setTimeout(() => {
      const s = document.getElementById('print-a4-style')
      if (s && s.parentNode) s.parentNode.removeChild(s)
    }, 1200)
  }
  return (
    <Layout title="Works">
      {/* print styles are injected dynamically by the print handler */}

      <Container>
        <Heading as="h3" fontSize={20} mb={4}>
          Cetak Nomor Keep Stock
        </Heading>

        <HStack spacing={3} mb={4}>
          <Button _hover={{ backgroundColor: 'teal.600', color: 'white' }}>
            Kembali
          </Button>

          <Button
            as="label"
            cursor="pointer"
            mb="0"
            bg="green.400"
            color="white"
            _hover={{ bg: 'green.600' }}
          >
            Add Data Excel
            <input
              type="file"
              hidden
              accept=".xlsx, .xls"
              onChange={handleImportExcel}
            />
          </Button>

          <Button
            onClick={handlePrintA4}
            bg="blue.400"
            color="white"
            _hover={{ bg: 'blue.600' }}
          >
            Cetak (A4)
          </Button>
        </HStack>

        {/* <SimpleGrid columns={[1, 1, 1]} gap={6}>
        <Section>
          <WorkGridItem title="Nomor Keep Stock" thumbnail={New_thumnail} />
        </Section>
      </SimpleGrid> */}
        <Section>
          <VStack align="stretch" spacing={6}>
            {/* <Box
              bg="white"
              p={4}
              borderRadius="md"
              boxShadow="sm"
              width="100%"
              overflowX="auto"
            >
              <Text fontWeight="semibold" mb={2}>
                Preview Data Excel ({excelData.length})
              </Text>
              {excelData.length === 0 ? (
                <Text color="gray.500">
                  Belum ada data. Tambahkan file Excel.
                </Text>
              ) : (
                <SimpleGrid columns={[1, 2]} spacing={4}>
                  {excelData.map((item, index) => (
                    <Box key={index} p={3} borderWidth="1px" borderRadius="md">
                      <Text fontSize="lg" fontWeight="bold">
                        {item.ks_number || '(kosong)'}
                      </Text>
                      <Text color="gray.600">{item.box_number || ''}</Text>
                    </Box>
                  ))}
                </SimpleGrid>
              )}
            </Box> */}

            <Divider />

            <Box
              id="print-area"
              bg="white"
              p={6}
              borderRadius="sm"
              borderWidth="1px"
              width="100%"
              maxW="640px"
              mx="auto"
            >
              {/* layout labels for printing, centered */}
              {excelData.length === 0 ? (
                <Text textAlign="center" color="gray.500">
                  Preview cetak kosong — tambahkan data Excel lalu klik Cetak
                  (A4).
                </Text>
              ) : (
                <SimpleGrid columns={1} spacing={6}>
                  {excelData.map((item, index) => (
                    <Box
                      key={index}
                      className="label-card"
                      p={4}
                      border="2px"
                      borderColor="black"
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text className="ks" fontWeight="1000" color="black">
                        {item.ks_number || '-'}
                      </Text>
                      <Text className="box" color="black">
                        {item.box_number || ''}
                      </Text>
                    </Box>
                  ))}
                </SimpleGrid>
              )}
            </Box>
          </VStack>
        </Section>
      </Container>
    </Layout>
  )
}

export default Nomorks
export { getServerSideProps } from '../components/chakra'
