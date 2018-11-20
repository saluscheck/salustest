document.getElementById('getData').addEventListener('click', getData);

function getData() {
  // Bij deployment op Google App Engine poortnummer verwijderen - Bij testen op localhost toevoegen
  // https://salustest-7df6a.appspot.com/sanctions?search=
  // Online API kan niet in client worden gebruikt bij test op localhost vanwege CORS
    
    document.getElementById('example-table').innerHTML = ""
    var api_path = "http://localhost:8080/sanctions?search="
    var naam = document.getElementById("searchString").value
    var url = api_path + naam
    console.log(naam)
    console.log(url)
    document.getElementById('result').innerHTML = '<div class="container">loading ....</div>';
    document.getElementById("loader").style.display = "inline";
    document.getElementById('example-table').style.display = "none";
    fetch(url)
      .then((res) => { return res.json() })
      .then((data) => {
        if(data.length == 0) {
          console.log("Empty")
          document.getElementById('loader').style.display = "none";
          document.getElementById('result').innerHTML = "Geen resultaten";
        } else {
          let result = `<h2>Zoekresultaten (${data.length} items)</h2>`;
          document.getElementById('result').innerHTML = result;
          document.getElementById('example-table').style.display = "block";
          var table = new Tabulator("#example-table", {
            data:data, //set initial table data
            layout:"fitColumns",
            groupBy:"euReferenceNumber",
            columns:[
                {title:"Voornaam", field: "nameAlias.firstName"},
                {title:"Achternaam", field: "nameAlias.lastName"},
                {title:"Volledige naam", field: "nameAlias.wholeName"},
            ],
        });
        document.getElementById('loader').style.display = "none";
  }
})
}
