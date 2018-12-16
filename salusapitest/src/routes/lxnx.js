let express = require('express')
let router = express.Router()
let fetch = require('node-fetch');

// GET localhost:3000/sanctions

// const url = "https://testapi.aml-check.com/v3/namecheck.asmx/CheckFullName?FullName=Awad&DateFrom=1981-01-01&Probabilite=80&Code=aaa&FullName"

router.get('/lxnx', (req, res) => {
var api_path = "https://testapi.aml-check.com/v3/namecheck.asmx/CheckFullName?"
var naam = req.query.search
var url = api_path + "FullName=" + naam + "&DateFrom=1981-01-01&Probabilite=80&Code=aaa&FullName"
console.log("Requesting ....")
  fetch(url)
    .then(res => res.text())
    .then(body => console.log(body));
})

module.exports = router
