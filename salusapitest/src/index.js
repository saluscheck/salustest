let express = require('express')
let app = express()
let lxnxRoute = require('./routes/lxnx')
let lxnxflrRoute = require('./routes/lxnx.filter')
let path = require('path')
let bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use((req, res, next) => {
  console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body)
  next()
})
app.use(lxnxRoute)
app.use(lxnxflrRoute)
app.use(express.static('public'))

// Hander for 404 - Not found
app.use((req, res, next) => {
  res.status(404).send('The page you have requested does not exist!')
})

// Handler for Error 500
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.sendFile(path.join(__dirname, '../public/500.html'))
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.info(`Server has started on ${PORT}`))