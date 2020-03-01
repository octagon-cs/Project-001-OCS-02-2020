const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('<center><h1>waena-desa on develop!</h1></center>'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))