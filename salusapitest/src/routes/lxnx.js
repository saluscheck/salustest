let express = require('express')
let router = express.Router()
let fetch = require('node-fetch')
let xml2js = require('xml2js')

router.get('/lxnx', (req, res) => {
var api_path = "https://api.aml-check.com/v3/namecheck.asmx/CheckFullName?"
var naam = req.query.search
var url = api_path + "FullName=" + naam + "&DateFrom=1981-01-01&Probabilite=100&Code=D6E9A654-33E4-47E5-8A67-E3812C0F3E49"
var parser = new xml2js.Parser({explicitRoot: false, explicitArray: false})
console.log("Requesting ....")
fetch(url)
     .then(result => result.text())
     .then(body => parser.parseString(body, function (err, result) {

      if(err) {
         console.log(err)
      } 
      else
      {
        var json = JSON.stringify(result)
        console.log(json)
        res.json(result.Hit)
      }
    }) 
    )
 })

module.exports = router