let SdnModel = require('../models/sdn.models')
let express = require('express')
let router = express.Router()

// GET localhost:3000/sanctions
router.get('/sdn', (req, res) => {
  if(!req.query.search) {
    return res.status(400).send('Missing URL parameter: firstName')
  }

  const regexName = new RegExp("\\b" + req.query.search + "\\b", "i")

  SdnModel.aggregate( [
    { $match : { $or: [ { "firstName" : { $regex : regexName } }, { "lastName" : { $regex : regexName } } ] } }

  ] )
    .then(doc => {
      res.json(doc)
    })
    .catch(err =>{
      res.status(500).json(err)
    })
})

module.exports = router
