let mongoose = require('mongoose')

const server = 'ds119503.mlab.com:19503'
const database = 'salustest'
const user = 'test'
const password = 'test545'

mongoose.connect(`mongodb://${user}:${password}@${server}/${database}`)

let SdnSchema = new mongoose.Schema({
            firstName: [
                String
            ],
            lastName: [
                String
            ]
}, {collection: "sdn"})

module.exports = mongoose.model('Sdn', SdnSchema)
