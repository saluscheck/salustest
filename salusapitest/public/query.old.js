document.getElementById('getData').addEventListener('click', getData);

function getData() {
  // Bij deployment op Google App Engine poortnummer verwijderen - Bij testen op localhost toevoegen
  // https://salustest-7df6a.appspot.com/sanctions?search=
  // Online API kan niet in client worden gebruikt bij test op localhost vanwege CORS
    var api_path = "http://localhost:8080/sanctions?search="
    var naam = document.getElementById("searchString").value
    var url = api_path + naam
    console.log(naam)
    console.log(url)
    document.getElementById('result').innerHTML = '<div class="container">loading ....</div>';
    document.getElementById("loader").style.display = "inline";
    fetch(url)
      .then((res) => { return res.json() })
      .then((data) => {
        if(data.length == 0) {
          console.log("Empty")
          document.getElementById("loader").style.display = "none";
          document.getElementById('result').innerHTML = "Geen resultaten"; 
        } else {
          let result = `<h2>Zoekresultaten (${data.length} items)</h2>`;
            data.forEach((ind) => {
              console.log(ind)
            const { euReferenceNumber, nameAlias: {firstName, middleName, lastName, wholeName} } = ind
            result +=
              `<div class=row>
                   <ul class="w3-ul">
                       <li> euReferenceNumber : ${euReferenceNumber[0]}</li>
                       <li> First : ${firstName[0]}</li>
                       <li> Middle : ${middleName[0]}</li>
                       <li> Last : ${lastName[0]}</li>
                       <li> Whole : ${wholeName[0]}</li>
                       <hr />
                   </ul>
                </div>`;
                  document.getElementById("loader").style.display = "none";
                  document.getElementById('result').innerHTML = result; //!! Test outside foreach
              });
  }
})
}
