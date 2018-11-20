let SdnModel = require('../models/sdn.models')
let express = require('express')
let router = express.Router()

// GET localhost:3000/sanctions
router.get('/sdn', (req, res) => {
  if(!req.query.search) {
    return res.status(400).send('Missing URL parameter: firstName')
  }

  SdnModel.aggregate( [
    { $match : { $or: [ { "firstName" : req.query.search }, { "lastName" : req.query.search } ] } }

  ] )
    .then(doc => {
      res.json(doc)
    })
    .catch(err =>{
      res.status(500).json(err)
    })
})

module.exports = router
