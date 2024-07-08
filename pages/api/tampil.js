import { promises as fs } from 'fs'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const file = await fs.readFile(
      process.cwd() + 'pages/api/data.json',
      'utf8'
    )
    const data = JSON.parse(file)

    res.status(200).JSON(data)
  } else {
    res.status(404).send('Not Found')
  }
}
