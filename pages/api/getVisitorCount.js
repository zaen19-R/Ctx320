// pages/api/getVisitorCount.js
import { readFile } from 'fs/promises'

export default async function handler(req, res) {
  try {
    const filePath = './.data/visitorCount.json'

    // Read the visitor count from the data file
    const data = await readFile(filePath, 'utf-8')
    const { count } = JSON.parse(data)

    // Return the visitor count as the response
    res.status(200).json({ visitorCount: count })
  } catch (error) {
    // Handle the error
    console.error('Error:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
