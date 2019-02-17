document.getElementById('getData').addEventListener('click', getData);

function getData() {
  // Bij deployment op Google App Engine poortnummer verwijderen - Bij testen op localhost toevoegen
  // https://salustest-7df6a.appspot.com/sanctions?search=
  // Online API kan niet in client worden gebruikt bij test op localhost vanwege CORS
    var api_path = "https://salustest-7df6a.appspot.com/sanctions?search="
    var naam = document.getElementById("searchString").value
    var url = api_path + naam
    console.log(naam)
    console.log(url)
    document.getElementById('result').innerHTML = '<div class="container">De data wordt opgehaald. Dit kan tot 15 seconden duren.</div>';
    document.getElementById("loader").style.display = "inline";
    fetch(url)
      .then((res) => { return res.json() })
      .then((data) => {
        
        if(data.length == 0) {
          console.log("Empty")
          document.getElementById("loader").style.display = "none";
          document.getElementById('result').innerHTML = "Geen resultaten"; 
        } else {
          var listname = "Peps"
          data = data.Hit.filter(a => a.ListName == listname)
          console.log(JSON.stringify(data))
          let result = 
              `
                <div class="container">
                  <h2>Zoekresultaten (${data.length} items)</h2>
                  <table class="table">
                  <thead>
                      <tr>
                        <th>List name</th>
                        <th>First</th> 
                        <th>Last</th>
                        <th>Nationality</th>
                      </tr>
                  </thead>
                  <tbody>
              `
            data.forEach((ind) => {
              console.log(ind)
            const { Forename, Name, Nationality, ListName } = ind
            result +=
              `
                      <tr class="w3-ul">
                          <td> ${ ListName }</td>
                          <td> ${ Forename }</td>
                          <td> ${ Name }</td>
                          <td> ${ Nationality }</td>
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
              document.getElementById('peps').innerHTML = result;
  }
})
}
