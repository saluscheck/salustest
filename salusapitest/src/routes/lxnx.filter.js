let express = require('express')
let router = express.Router()
let fetch = require('node-fetch')
let xml2js = require('xml2js')
// Code: D6E9A654-33E4-47E5-8A67-E3812C0F3E49
router.get('/lxnxflr/:listname', (req, res) => {
var api_path = "https://api.aml-check.com/v3/namecheck.asmx/CheckFullName?"
var naam = req.query.search
var url = api_path + "FullName=" + naam + "&DateFrom=1981-01-01&Probabilite=100&Code=D6E9A654-33E4-47E5-8A67-E3812C0F3E49"
console.log(url)
var parser = new xml2js.Parser({explicitRoot: false, explicitArray: false})
var listname = req.params.listname
console.log("Requesting ....")
fetch(url)
     .then(result => result.text())
     .then(body => parser.parseString(body, function (err, result) {
         result = result.Hit
         console.log(result)
         console.log(typeof result)
         if(err) {
            console.log(err)
         } 
         else
         {
            if (!(result instanceof Array)) {
               resultArray = []
               resultArray.push(result)
               result = resultArray   
           } 
           console.log("Nr of items in array is " + length(result))   
           console.log(listname)
           var resultflr = result.filter(item => item.ListName == listname)
           res.json(resultflr)
         }
    }) 
    )
 })

function length(obj) {
   return Object.keys(obj).length;
}

module.exports = router
