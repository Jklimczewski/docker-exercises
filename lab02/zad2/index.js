const express = require('express')
const app = express()
const port = 8080

app.get('/', (req, res) => {
    const date = new Date();
  res.json({
    data: date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate(),
    godzina: date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})