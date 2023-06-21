// pages/api/users.js

export default function handler(req, res) {
  // Logika penanganan permintaan API
  if (req.method === 'GET') {
    // Contoh mengirimkan data pengguna sebagai respons
    const users = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' }
    ]
    res.status(200).json(users)
  } else {
    res.status(404).send('Not found')
  }
}
