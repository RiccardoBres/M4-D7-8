let endpointUrl = "https://striveschool-api.herokuapp.com/api/product/"
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdmNzM2MWI5YzBmNzAwMTQ0ODRmZDYiLCJpYXQiOjE2ODYwNzQyMDksImV4cCI6MTY4NzI4MzgwOX0.Tb8ZtoIrT01M9S3N-7IYgCohRceMoFT3cCHEfkIXnEY"
let myResult = document.getElementById("result-box");
//let endpointUrlPut = "https://striveschool-api.herokuapp.com/api/product/" + id
let responseData;

//bottoni 
let editBtn;
let delBtn;
let btnGetRequest = document.getElementById("btnGetRequest")

//variabile globale per la gestione degli input:
let id = document.getElementById("ID");






async function getProduct() {
    try {
        const res = await fetch(endpointUrl, {
            headers: { Authorization: "Bearer " + token }
        });
        const json = await res.json();

        // Rimuovi i prodotti esistenti
        myResult.innerHTML = '';

        // Crea i nuovi elementi della lista
        json.forEach(product => {
            createPost(product)
        });

        responseData = json;
        myData = json;
    } catch (error) {
        console.log(error);
    }
}

window.onload = getProduct;


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
    const editImg = document.createElement("i");
    editImg.classList.add("fa-solid", "fa-pencil", "me-1");
    const editTxt = document.createElement("span");
    editTxt.innerText = "Edit";
    editBtn.append(editImg, editTxt);
    // <button type="button" class="btn btn-primary">Delete</button>
    // <i class="fa-solid fa-trash"></i>
    delBtn = document.createElement("button");
    delBtn.classList.add("btn", "btn-sm", "mx-1", "btn-danger");
    const delImg = document.createElement("i");
    delImg.classList.add("fa-solid", "fa-trash", "me-1");
    const delTxt = document.createElement("span");
    delTxt.innerText = "Delete";
    delBtn.append(delImg, delTxt);

    actionsButton.append(editBtn, delBtn);
    
    riga.append(nameProduct, descProduct, brandProduct, imageProduct, priceProduct, actionsButton);
    myResult.appendChild(riga);


//funzionalità che mi permette di catturare l'id dell'oogetto per poi successivamente gestire la richiesta PUT e DELETE


editBtn.addEventListener("click", (event) => {
    //closest viene utilizzato per risalire la gerarchia degli elementi genitore fino a trovare il primo elemento che corrisponde al selettore specificato
    const row = event.target.closest("tr");
    const productId = row.dataset.productId;
    id.value = productId;
    
});
    
delBtn.addEventListener("click", (event) => {
    const row = event.target.closest("tr");
    const productId = row.dataset.productId;
    id.value = productId;
});

}

//funzione asincro che permette di far partire la chiamata PUT all'id che desidero modificare

async function myPutRequest(productId) {

    let inputName = document.getElementById("name");
    let inputDescription = document.getElementById("description");
    let inputBrand = document.getElementById("brand");
    let inputImageUrl = document.getElementById("ImageUrl");
    let inputPrice = document.getElementById("price");

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
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
            
          },
          body: JSON.stringify(payload),
        });
        
     // Chiamata a getProduct per aggiornare la lista dopo la richiesta PUT
     getProduct();
        
    } catch (error) {
        console.log(error);
      }
}

btnGetRequest.addEventListener("click", () => {
    myPutRequest(id.value);
  });