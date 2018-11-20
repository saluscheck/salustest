let SanctionsModel = require('../models/sanctions.models')
let express = require('express')
let router = express.Router()

// GET localhost:8080/sanctions
router.get('/sanctions', (req, res) => {
  if(!req.query.search) {
    return res.status(400).send('Missing URL parameter: firstName')
  }

  // CustomerModel.aggregate( [
  //   { $match : { $or: [ { "nameAlias.firstName" : req.query.search },
  //   { "nameAlias.lastName" : req.query.search } ] } },
  //   { $unwind : "$nameAlias" }

  const regexName = new RegExp("\\b" + req.query.search + "\\b", "i")

  SanctionsModel.aggregate( [
    { $match : { $or: [
    { "nameAlias.firstName" : { $regex : regexName} },
    { "nameAlias.lastName" : { $regex : regexName} },
    { "nameAlias.wholeName" : { $regex : regexName} } ] } },
    { $unwind : "$nameAlias" }

  ] )
    .then(doc => {
      res.json(doc)
    })
    .catch(err =>{
      res.status(500).json(err)
    })
})

module.exports = router
