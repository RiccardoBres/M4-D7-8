//variabili contenenti URL ENDPOINT e TOKEN di autorizzazione per eseguire le chiamate FETCH
const endpointUrl = "https://striveschool-api.herokuapp.com/api/product/"
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdmNzM2MWI5YzBmNzAwMTQ0ODRmZDYiLCJpYXQiOjE2ODYwNzQyMDksImV4cCI6MTY4NzI4MzgwOX0.Tb8ZtoIrT01M9S3N-7IYgCohRceMoFT3cCHEfkIXnEY"
//variabili necessarie per la manipolazione del DOM
let mainPage = document.getElementById("container");
let dettailsContainer = document.getElementById("dettailsContainer");
const searchButton = document.getElementById("searchButton");
//contenitore dei dati ottenuti attraverso la chiamata all'ENDPOINT
let myData = [];


//questa funzione è destinata alla creazione della pagina dettagli 
function createDettails(product) {
    let dettailsCard = document.createElement("div");
    dettailsCard.classList.add("d-flex", "card", "justify-content-center", "align-items-center", "dettails-card");
    let title = document.createElement("h3");
    title.innerText = product.name;
    let image = document.createElement("img");
    image.classList.add("image-fluid","dettails-fixedSize", "pt-4", "radius-circle");
    image.src = product.imageUrl;
    let description = document.createElement("p");
    description.innerText = product.description;
    let price = document.createElement("p");
    price.innerText = "Prezzo" + " " + product.price + "EUR"; 
    dettailsContainer.append(dettailsCard);
    dettailsCard.append(title,description,image, price);
  }
  

//questa funzione è destinata alla creazione delle varie card. Viene aggiunta una combinazione di classi CSS per rendere i vari element organizzati
function myCard(element) {
        let cardBox = document.createElement("div");
        cardBox.classList.add("card","my-4", "text-center", "pt-1","cardBox-size","d-flex","align-items-center","cardStyle" ,"transition-scale");
        let name = document.createElement("h5");
        name.classList.add("my-3")
        name.innerText = element.name;
        let image = document.createElement("img");
        image.classList.add("image-fluid","img-size");
        image.src = element.imageUrl;
        let familyType = document.createElement("a");
        //il parametro element rappresenta l'elemento corrente nell'iterazione.
        familyType.href = `index.html?q=${element._id}`;
        console.log(familyType);
        familyType.classList.add("mt-3", "text-decoration-none",)
        familyType.innerText = element.brand;

        cardBox.appendChild(name);
        cardBox.appendChild(image);
        cardBox.appendChild(familyType);
        mainPage.appendChild(cardBox); 
} 
//funzione che permette di recuperare i dati dalla chiamata fetch. Una volta recuperati i dati, verrano passati come parametro della funzione myCard per creare gli elementi 
async function getData() {
    try {
        const res = await fetch(endpointUrl, {headers: { Authorization: "Bearer " + token}});
        const json = await res.json();
        json.forEach(json => {
            myCard(json);
        });
        myData = json;
    } catch (error) {
        console.log(error);
    }
}


/*attraverso questa condizione targhettiziamo l'elemento selezionato ed eseguiamo una nuova chiamata fetch, con riferimento all'elemnto selezionato, 
successivamente passiamo come parametro i dati ottenuti alla funzione che crea il layout della sezione dettagli  */
if (window.location.search) {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("q"); // Ottenete l'id come number/string
    getDettails(query); // Passa l'ID del prodotto alla funzione getDettails
      async function getDettails(productId) {
        try {
          const res = await fetch(endpointUrl + productId, {
            headers: {
              Authorization: "Bearer " + token
            }
          });
          const json = await res.json();
          createDettails(json); // Passa l'oggetto json alla funzione createDettails
          mainPage.classList.add("d-none");
          //hideCards(); //richiamiamo la funzione per nascondere le card non selezionate
        } catch (error) {
          console.log(error);
        }
      }
  }

/*questa sezione di codice permette di elaborare un criterio di ricerca. 
Utiliziamo il metodo filter() per filtrare i dati della chiamata all'enpoint, con il valore inserito nell'input di ricerca.
Successivamente chiediamo di farci ritornare ogni elemento che includa il valore dell'input di ricerca*/
  searchButton.addEventListener("click", () => {
    let inputValue = document.getElementById("search").value.toLowerCase();
    let filteredCards = myData.filter((element) => {
      return element.name.toLowerCase().includes(inputValue);
      
    });
    
    // Rimuovi le card esistenti prima di creare le nuove card filtrate
    mainPage.innerHTML = "";
    inputValue.innerHTML = " ";
  
    // Crea le card solo per i libri filtrati
    filteredCards.forEach((card) => {
        myCard(card);
      });
  }); 

//lanciamo la funzione getData
getData();




  



    




