let endpointUrl = "https://striveschool-api.herokuapp.com/api/product/"
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdmNzM2MWI5YzBmNzAwMTQ0ODRmZDYiLCJpYXQiOjE2ODYwNzQyMDksImV4cCI6MTY4NzI4MzgwOX0.Tb8ZtoIrT01M9S3N-7IYgCohRceMoFT3cCHEfkIXnEY"
let mainPage = document.getElementById("container")

async function getData() {
    try {
        const res = await fetch(endpointUrl, {headers: { Authorization: "Bearer " + token}});
        const json = await res.json();
        myCard(json);
    } catch (error) {
        console.log(error);
    }
}


function myCard(products) {
    products.forEach(element => {
        let cardBox = document.createElement("div");
        cardBox.classList.add("card", "col-md-3", "col-sm-6", "col-12", "my-4", "text-center", "pt-1","cardBox-size","d-flex","align-items-center");
        let name = document.createElement("h5");
        name.classList.add("my-3")
        name.innerText = element.name;
        let image = document.createElement("img");
        image.classList.add("image-fluid","img-size");
        image.src = element.imageUrl;
        let familyType = document.createElement("a"); //pagina dettagli
        familyType.classList.add("mt-3", "text-decoration-none",)
        familyType.innerText = element.brand;

        cardBox.appendChild(name);
        cardBox.appendChild(image);
        cardBox.appendChild(familyType);

        container.appendChild(cardBox);
    });
} 

getData();