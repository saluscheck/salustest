document.getElementById('getData').addEventListener('click', getData);
document.getElementById('getPDF').addEventListener('click', getPDF);

function getData() {
  // Bij deployment op Google App Engine poortnummer verwijderen - Bij testen op localhost toevoegen
  // https://salustest-7df6a.appspot.com/lxnx?search=
  // http://localhost:8080/lxnx?search=
  // Online API kan niet in client worden gebruikt bij test op localhost vanwege CORS
    var api_path = "https://salustest-7df6a.appspot.com/lxnx?search="
    var naam = document.getElementById("Name").value
    var url = api_path + naam
    console.log(naam)
    console.log(url)
    document.getElementById('result').innerHTML = '<div class="alert alert-primary">De data wordt opgehaald. Dit kan ca. 15 seconden duren.</div>';
    document.getElementById("loader").style.display = "inline";
    fetch(url)
      .then((res) => { return res.json() })
      .then((data) => {
        data = data.Hit
        if(data == undefined) {
          console.log("Empty")
          document.getElementById("loader").style.display = "none";
          document.getElementById('result').innerHTML = "Geen resultaten"; 
        } else {
          console.log(JSON.stringify(data))
          globalData = data
          let result = 
              `
                <div class="container">
                  <h2>Zoekresultaten (${data.length} items)</h2>
                  <table id="result-table" class="table table-hover">
                  <thead>
                      <tr>
                        <th>Bron</th>
                        <th>Voor</th> 
                        <th>Naam</th>
                        <th>Geboortedatum</th>
                        <th>Nationaliteit</th>
                        <th>Reden</th>
                      </tr>
                  </thead>
                  <tbody>
              `
            data.forEach((ind) => {
              
            const { Forename, Name, BirthDate, Nationality, Reason, ListName } = ind
            result +=
              `
                      <tr class="w3-ul">
                          <td> ${ ListName }</td>
                          <td> ${ Forename }</td>
                          <td> ${ Name }</td>
                          <td align="right"> ${ BirthDate }</td>
                          <td> ${ Nationality }</td>
                          <td> ${ Reason }</td>
                      </tr>
              `
              })
              result +=
              `
                    </tbody>
                  </table>
              </div>  
              `
              document.getElementById("loader").style.display = "none";
              document.getElementById('result').innerHTML = result;            
  }
})
}

function getPDF() {
var columns = [
    {title: "Bron", dataKey: "ListName"},
    {title: "Voor", dataKey: "Forename"}, 
    {title: "Naam", dataKey: "Name"},
    {title: "Geboortedatum", dataKey: "BirthDate"},
    {title: "Nationaliteit", dataKey: "Nationality"},
    {title: "Reden", dataKey: "Reason"}
];
var rows = globalData;

// Only pt supported (not mm or in)
var doc = new jsPDF({
  orientation: 'landscape'
});
doc.autoTable(columns, rows, {styles: {overflow: 'linebreak'}});
doc.save('sanctions.pdf');
}
