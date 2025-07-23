const express = require('express')
const fs = require('fs')
const cors = require('cors')
const app = express()
const port = 2210

app.use(cors())
app.use(express.json())

app.post('/save-file', (req, res) => {
  // Read the existing file or start with an empty array
  fs.readFile('fichas.json', 'utf8', (err, data) => {
    let fichas = []
    if (!err && data) {
      try {
        fichas = JSON.parse(data)
      } catch (e) {
        // If file is corrupted, start fresh
        fichas = []
      }
    }

    // Add the new name as an object
    fichas.push(req.body)
    // Write the updated array back to the file
    fs.writeFile('fichas.json', JSON.stringify(fichas, null, 2), err => {
      if (err) {
        return res.status(500).json({ error: 'Error saving file' })
      }
      res.json({ message: 'Salvo com sucesso' })
    })
  })
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
