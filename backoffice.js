//variabili contenenti URL ENDPOINT e TOKEN di autorizzazione per eseguire le chiamate FETCH
const endpointUrl = "https://striveschool-api.herokuapp.com/api/product/"
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdmNzM2MWI5YzBmNzAwMTQ0ODRmZDYiLCJpYXQiOjE2ODYwNzQyMDksImV4cCI6MTY4NzI4MzgwOX0.Tb8ZtoIrT01M9S3N-7IYgCohRceMoFT3cCHEfkIXnEY";

//variabile per la gestione del DOM
let myResult = document.getElementById("result-box");

//Variabili per la gestione degli input
let id = document.getElementById("id");
let inputName = document.getElementById("name");
let inputDescription = document.getElementById("description");
let inputBrand = document.getElementById("brand");
let inputImageUrl = document.getElementById("ImageUrl");
let inputPrice = document.getElementById("price");

//variabili per la gestione dei bottoni 
const btnCreateElement = document.getElementById("btnCreateElement");
const btnApplyChanges = document.getElementById("btnApplyChanges");

/*varibile che ci permette di recuperare i dati della chiamata FETCH eseguita.
Successivamente viene inserito come parametro alla funzione di creazione lista i dati che abbiamo appena ottenuto */
async function getProduct() {
    try {
        const res = await fetch(endpointUrl, {
            headers: 
            { Authorization: "Bearer " + token}
        });
        const json = await res.json();
         json.forEach(product => {
            createPost(product)
         });
        myData = json
    } catch (error) {
        console.log(error);
    }
}

//richiamiamo la funzione attraverso window.onload per far si che venga eseguita quando l'intero contenuto della finestra, inclusi i fogli di stile, le immagini e gli script, sono stati creati
 window.onload = getProduct();




//assegniamo al bottone indicato il lancio della funzione addNewPost
btnCreateElement.addEventListener("click", ()=>{
    addNewPost()
});

//funzione asincro che permette di far partire la chiamata per creare un elemnto con i parametri richiesti
async function addNewPost() {
        const payload = {
            "name": inputName.value,
            "description": inputDescription.value,
            "brand": inputBrand.value,
            "imageUrl": inputImageUrl.value,
            "price": inputPrice.value,
        };
        const createResult = await fetch(endpointUrl, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json"
            }
        });

        //azzeriamo tutti i valori degli input una volta che la chiamata POST viene eseguita
        inputName.value = "";
        inputDescription.value = "";
        inputBrand.value = "";
        inputImageUrl.value = "";
        inputPrice.value = "";   
        //richiamiamo la funzione getProduct per avere la nostra lista di prodotti aggiornata
        getProduct()
}


//funzione per la creazione della lista tabello dei prodotto
function createPost(product) {
    let riga = document.createElement('tr');
    riga.dataset.productId = product._id;
    let nameProduct = document.createElement('td');
    nameProduct.innerText = product.name;

    let descProduct = document.createElement('td');
    descProduct.innerText = product.description;

    let brandProduct = document.createElement('td');
    brandProduct.innerText = product.brand;

    let imageProduct = document.createElement('td');
    imageProduct.src = product.imageUrl;

    let priceProduct = document.createElement('td');
    priceProduct.innerText = product.price;


    let actionsButton = document.createElement('div');
    actionsButton.classList.add("d-flex")
    editBtn = document.createElement("button");
    editBtn.classList.add("btn", "btn-sm", "mx-1","my-1", "btn-primary");
    editBtn.innerText = "Modifica"
    delBtn = document.createElement("button");
    delBtn.classList.add("btn", "btn-sm", "mx-1", "btn-danger");
    delBtn.innerText = "Elimina";
    
   
    actionsButton.append(editBtn, delBtn);
    
    riga.append(nameProduct, descProduct, brandProduct, imageProduct, priceProduct, actionsButton);
    myResult.appendChild(riga);


    /*all'interno della funzione aggiungiamo direttamente al bottone delete un addEventList. che permetterà di lanciare la chiamata DELETE, quindi la cancellazione dell'elemento selezionato,
    attraverso il salvataggio dell'id dell'elemento selezionato aggiunto all'enpoint della chiamata DELETE. Il salvataggio dell'id è stato gestito attraverso la combinazione 
    di dataset (riga 81) ed il closest, salvando i valori desiderati in alcune variabili di stoccaggio*/
    delBtn.addEventListener("click", (event) => {
        //closest viene utilizzato per risalire la gerarchia degli elementi genitore fino a trovare il primo elemento che corrisponde al selettore specificato
        const row = event.target.closest("tr");
        const productId = row.dataset.productId;
        id.value = productId;
        deletePost(id.value);
    }); 
    /*aggiungiamo direttamente al bottone modifica un addEventList. che permette di salvare l'id (che successivamente sarà aggiunto nell'endpoint della chiamata di tipo POST) all'interno di una 
    variabile di stoccaggio utilizzando i metodi precedentemente indicati, e inserisce i valori dei vari elementi direttamente all'interno degli input di modifica,
    in modo tale da pooter effettuare le modifiche desiderata in maniera più funzionale */
    editBtn.addEventListener("click", (event) => {
        const row = event.target.closest("tr");
        const productId = row.dataset.productId;
        id.value = productId; 
        inputName.value =  product.name;
        inputDescription.value = product.description;
        inputBrand.value = product.brand;
        inputImageUrl.value = product.imageUrl;
        inputPrice.value = product.price;

        //All'interno di questa funzione, utilizziamo il metodo window.scrollTo() per scorrere la finestra della pagina verso l'inizio. 
        //L'opzione top: 0 indica che vogliamo scorrere verso la posizione iniziale della pagina, mentre l'opzione behavior: 'smooth' indica che vogliamo che lo scorrimento sia animato e fluido
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }); 
    
}

//questa chiamata permette di far partire una richiesta di tipo PUT attraverso la targhettizzazione dell'id ottenuta con il metodo "closest"
async function myPutRequest(productId) {
    const payload = {
        "name": inputName.value,
        "description": inputDescription.value,
        "brand": inputBrand.value,
        "imageUrl":  inputImageUrl.value,
        "price": inputPrice.value,
    };

    try {
        const response = await fetch(endpointUrl + productId, {
          method: 'PUT',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
            
          },
        });
        
          // Inizializzare i campi input della create:
          id.value = "";
          inputName.value = "";
          inputDescription.value = "";
          inputBrand.value = "";
          inputImageUrl.value = "";
          inputPrice.value = ""; 
        // Chiamata a getProduct per aggiornare la lista dopo la richiesta PUT
        getProduct();

    } catch (error) {
        console.log(error);
      }
}
/*assegniamo al bottone di applicazione delle modifiche il lancio della funzione myPutRequest 
che si occuperòà di far partire la chiamata FETCH di tipo PUT all'elemento che si desidera modificare */
btnApplyChanges.addEventListener("click", ()=> {
    myPutRequest(id.value);
});


//funzione asincro che permette di far partire la chiamata DELETE all'id che desidero modificare
async function deletePost(productId) {
    try {
        const delRes = await fetch(endpointUrl + productId, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + token
            }
        });
        if (delRes.ok) {
            const row = document.querySelector(`tr[data-product-id="${productId}"]`);
            if (row) {
                row.remove();
                id.value = "";
            }
        } else {
            console.log("Failed to delete product");
        }
    } catch (error) {
        console.log(error);
    }
}


//definiamo il setup della modale che permette di avere più informazioni circa il funzionamento della pagina di backoffice
const myModal = document.getElementById('staticBackdrop')
const myInput = document.getElementById('staticBackdropLabel')

myModal.addEventListener('shown.bs.modal', () => {
  myInput.focus()
})







