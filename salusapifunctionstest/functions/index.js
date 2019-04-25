const functions = require('firebase-functions');
const fetch = require('node-fetch')
const xml2js = require('xml2js')

exports.lxnxApiFlrState = functions.https.onRequest(
    (req, res) => {
        const listname = req.query.listname
        const naam = req.query.search
        const state = req.query.state
        switch(state) {
            case "test":
                api_path = "https://testapi.aml-check.com/v3/namecheck.asmx/CheckFullName?"
                code = process.env.TEST_CODE
                break

            case "production":
                api_path = "https://api.aml-check.com/v3/namecheck.asmx/CheckFullName?"
                code = process.env.PROD_CODE
                break
        }
        // const api_path = "https://testapi.aml-check.com/v3/namecheck.asmxCheckFullName?"
        // const api_path = "https://api.aml-check.com/v3/namecheck.asmx/CheckFullName?"
        const url = api_path + "FullName=" + naam + "&DateFrom=1981-01-01&Probabilite=100&Code=" + code
        console.log(url)
        const parser = new xml2js.Parser({explicitRoot: false, explicitArray: false})
        console.log("Requesting ....")
        console.log(listname)
        console.log(state)
        fetch(url)
        .then(result => result.text())
        .then(body => parser.parseString(body, (err, result) => {
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
                var resultflr = result.filter(item => item.ListName === listname)
                res.json(resultflr)
            }
            return
        })    
        )
        .catch((error) => {
            console.log(error)
            res.status(400).end()
            return
        })
        
    }
)

exports.lxnxApiFlr = functions.https.onRequest(
    (req, res) => {
        const listname = req.query.listname
        const naam = req.query.search
        const api_path = "https://testapi.aml-check.com/v3/namecheck.asmx/CheckFullName?"
        const code = process.env.TEST_CODE
        
        // const api_path = "https://testapi.aml-check.com/v3/namecheck.asmx/CheckFullName?"
        // const api_path = "https://api.aml-check.com/v3/namecheck.asmx/CheckFullName?"
        const url = api_path + "FullName=" + naam + "&DateFrom=1981-01-01&Probabilite=100&Code=" + code
        console.log(url)
        const parser = new xml2js.Parser({explicitRoot: false, explicitArray: false})
        console.log("Requesting ....")
        console.log(listname)
        fetch(url)
        .then(result => result.text())
        .then(body => parser.parseString(body, (err, result) => {
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
                var resultflr = result.filter(item => item.ListName === listname)
                res.json(resultflr)
            }
            return
        })    
        )
        .catch((error) => {
            console.log(error)
            res.status(400).end()
            return
        })
        
    }
)