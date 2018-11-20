var fs = require('fs');
var xml2js = require('xml2js')
var xml = fs.readFileSync('./sdn/sdn.xml', 'utf8');

var parser = new xml2js.Parser( { ignoreAttrs: true, mergeAttrs: true } );
    parser.parseString(xml, function (err, result) {
      var data = JSON.stringify(result.sdnList.sdnEntry);
      console.table(data)
      fs.writeFile('./sdn/sdn.json', data, 'utf8', function(err){
              if(err){
                    console.log(err);
              } else {
                    console.log('Done');
              }});
    });
