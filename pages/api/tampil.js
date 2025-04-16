import { json } from 'express'
import { promises as fs } from 'fs'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const file = await fs.readFile(
      process.cwd() + 'pages/api/data.json',
      'utf8'
    )
    const data = json.parse(file)

    res.status(200).json(data)
  } else {
    res.status(404).send('Not Found')
  }
}
