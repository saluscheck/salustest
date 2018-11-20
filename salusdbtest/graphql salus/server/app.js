// Taken from: https://youtu.be/Y0lDGjwRYKw

const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')

const app = express()
const port = 4000
const user = "test"
const password = "test545"

mongoose.connect(`mongodb://${ user }:${ password }@ds119503.mlab.com:19503/salustest`)
mongoose.connection.once('open', () => {
  console.log(`connected to database with user: ${ user }`)
})
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(port, () => {
  console.log(`listening for request on port ${port}`)
})
