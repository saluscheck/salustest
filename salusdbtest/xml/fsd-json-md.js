var fs = require('fs');
var xml2js = require('xml2js')
var xml = fs.readFileSync('./fsd/fsd-latest.xml', 'utf8');

fs.writeFile('test.json', sanctions, 'utf8', function(err){
        if(err){
              console.log(err);
        } else {
              console.log('Everything went OK!');
        }});

var parser = new xml2js.Parser( { mergeAttrs: true } );
    parser.parseString(xml, function (err, result) {
      var data = JSON.stringify(result.export.sanctionEntity);
      fs.writeFile('./fsd/fsd.json', data, 'utf8', function(err){
              if(err){
                    console.log(err);
              } else {
                    console.log('Done');
              }});
    });

    // var convert = require('xml-js');
    // var options = {
    //                 compact: true,
    //                 ignoreDeclaration: true,
    //                 alwaysArray: false,
    //                 attributesKey: 'attributes'
    //               };
    // var result = convert.xml2js(xml, options);
    // var sanctions = JSON.stringify(result.export.sanctionEntity);
    //
    // console.log(result);
