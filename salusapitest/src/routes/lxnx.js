let express = require('express')
let router = express.Router()
let fetch = require('node-fetch')
let xml2js = require('xml2js')

// GET localhost:3000/sanctions

// const url = "https://testapi.aml-check.com/v3/namecheck.asmx/CheckFullName?FullName=Awad&DateFrom=1981-01-01&Probabilite=80&Code=aaa&FullName"



router.get('/lxnx', (req, res) => {
var api_path = "https://api.aml-check.com/v3/namecheck.asmx/CheckFullName?"
var naam = req.query.search
var url = api_path + "FullName=" + naam + "&DateFrom=2000-01-01&Probabilite=100&Code=<CODE HERE>"
var parser = new xml2js.Parser({explicitRoot: false, explicitArray: false})
console.log("Requesting ....")
fetch(url)
     .then(result => result.text())
     .then(body => parser.parseString(body, function (err, result) {
        var json = JSON.stringify(result)
        console.log(json)
        res.json(result)
    }) 
    )
 })

module.exports = router
