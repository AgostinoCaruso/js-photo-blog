/*
*CONSEGNA*
*Milestone 1*
Sfruttando gli screen e gli asset in allegato riproduciamo la grafica proposta in maniera statica: utilizzando soltanto HTML e CSS e riproducendo una singola fotografia (usiamo una qualunque immagine a piacimento)
*Milestone 2*
Utilizzando Postman, testiamo una chiamata all’endpoint di JSON Placeholder:
https://jsonplaceholder.typicode.com/photos?_limit=6
Studiamo bene la risposta e i dati che ci fornisce iniziando a pensare a come poterli sfruttare.
*Milestone 3*
Inseriamo un foglio JavaScript ed effettuiamo una chiamata AJAX all’API di JSON Placeholder, sfruttando la risposta per generare dinamicamente in pagina una serie di foto!
*Bonus*
rendi la pagina responsive, in modo che su mobile e tablet le foto si dispongano man mano una sotto l’altra ed il titolo abbia una dimensione adeguata
*/


const baseUrl = "https://jsonplaceholder.typicode.com/";
const resource = "photos";
const numImg = 6;
const params = { "_limit": numImg };

const eleDivContainer = document.querySelector(".container");
const eleOverlay = document.querySelector(".overlay");

FuncAxios();
function FuncAxios() {
    axios.get(baseUrl + resource, { params })
        .then((response) => {
            const photos = response.data;

            for(let i = 0; i<photos.length; i++){
                const urlImg = photos[i].url;
                const urlText = photos[i].title;
                const urlTextUppercase = urlText.charAt(0).toUpperCase() + urlText.slice(1);
                
                CreateCard(urlImg, urlTextUppercase);
            }
        })
        .catch((error) => {
            console.error("Errore nella chiamata API:", error);
        });
}
const template = "";

function CreateCard(img, text) {
    const card = document.createElement("div");
    card.className = "card debugger";

    card.innerHTML = `
        <span class="pinAbsolute"><img src="./img/pin.svg" alt=""></span>
        <div class="card-img debugger">
            <img src="${img}" alt="test">
        </div>
        <div class="card-text debugger">
            ${text}
        </div>
    `;
    eleDivContainer.appendChild(card);

    let isCentered = false;

    card.addEventListener("click", (event) => {
        event.stopPropagation();

        const elePin = card.querySelector(".pinAbsolute");
        elePin.classList.toggle("my-d-none"); 
        eleOverlay.classList.toggle("my-d-none");

        if (!isCentered) {
            card.classList.add("centered");
        } else {
            card.classList.remove("centered");
        }

        isCentered = !isCentered; // Alterna lo stato
    });
}
