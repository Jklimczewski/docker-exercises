const express = require('express')
const axios = require('axios')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    axios.get('http://b-service:5000').then(result => res.send(result.data)).catch(err => console.log(err))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})