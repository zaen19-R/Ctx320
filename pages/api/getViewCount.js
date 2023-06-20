// pages/api/increaseVisitorCount.js
import { chmod, writeFile, readFile } from 'fs/promises'

export default async function handler(req, res) {
  try {
    const filePath = './data/visitorCount.json'
    const permissions = 0o600

    // Set the file permissions to read and write (owner only)
    await chmod(filePath, permissions)

    // Read the current visitor count from a data file
    const data = await readFile(filePath, 'utf-8')
    let { count } = JSON.parse(data)

    // Increase the visitor count
    // count++

    // Save the updated visitor count to the data file
    await writeFile(filePath, JSON.stringify({ count }), 'utf-8')
    count++
    // Return the updated visitor count as the response
    res.status(200).json({ visitorCount: count })
  } catch (error) {
    // Handle the error
    console.error('Error:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
