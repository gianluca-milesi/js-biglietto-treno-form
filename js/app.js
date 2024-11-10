console.log(axios);

const userKmInput = document.querySelector(".user-km");
const userAgeInput = document.querySelector(".user-age");
const inputsForm = document.getElementById("user-inputs");
const ticketSectionEl = document.querySelector(".ticket");
const rowEl = document.querySelector(".ticket .container .row");

const basicTicketPrice = 0.21;


inputsForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const userKm = userKmInput.value;
    const userAge = userAgeInput.value;

    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`

    ticketSectionEl.classList.remove("d-none");

    const ticketFinalPrice = calculateTicketPrice(userKm, userAge);
    const ticketFinalPriceInt = parseInt(ticketFinalPrice);
    generateTicketCard(userKm, userAge, ticketFinalPriceInt, formattedDate);

    userKmInput.value = "";
    userAgeInput.value = "";
});

function calculateTicketPrice(km, age) {
    const ticketPrice = basicTicketPrice * km;

    return calculateDiscount(age, ticketPrice);
};


function calculateDiscount(age, price) {
    if (age > 65) {
        price -= price * 0.6;
    } else if (age < 18) {
        price -= price * 0.4;
    }
    return price;
};


function generateTicketCard(km, age, price, date) {

    rowEl.innerHTML = "";

    let discountName = "Standard"

    if (age > 65) {
        discountName = "Over 65";
    } else if (age < 18) {
        discountName = "Minorenne"
    }

    const carriage = Math.floor(Math.random() * 12) + 1;
    const sit = Math.floor(Math.random() * 30) + 1;

    const randomNumber500to1000 = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let trainCode = "" + randomNumber500to1000;
    for (let i = 0; i < 5; i++) {
        trainCode += letters.charAt(Math.floor(Math.random() * letters.length))
    };

    const randomNumber1000to8000 = Math.floor(Math.random() * (8000 - 1000 + 1)) + 1000;
    let ticketCode = randomNumber1000to8000 + "";
    for (let i = 0; i < 8; i++) {
        ticketCode += letters.charAt(Math.floor(Math.random() * letters.length))
    };

    const ticketCard = `
                    <div class="col-lg-6 col-xl-3">
                            <figure class="m-0 d-flex align-items-center justify-content-center h-100">
                                <img src="./img/img-train.png">
                            </figure>
                    </div>
                    <div class="col-lg-6 col-xl-3">
                        <div class="card h-100 p-3 d-flex align-items-center justify-content-center bg-danger text-white fs-5">
                            <section class="ticket_info">
                                <h3 class="mb-4">Informazioni treno</h3>
                                <p>Carrozza: ${carriage}</p>
                                <p>Posto: ${sit}</p>
                                <p>Codice Treno: ${trainCode}</p>
                            </section>
                        </div>
                    </div>
                    <div class="col-lg-6 col-xl-3">
                        <div class="card h-100 p-3 d-flex align-items-center justify-content-center bg-danger text-white fs-5">
                            <section class="ticket_info">
                                <h3 class="mb-4">Informazioni Viaggio</h3>
                                <p>Numero Km: ${km}</p>
                                <p>Biglietto: ${discountName}</p>
                                <p>Prezzo: ${price}€</p>                                
                            </section>
                        </div>
                    </div>
                    <div class="col-lg-6 col-xl-3">
                        <div class="card h-100">
                            <section class="ticket_info ticket_info d-flex align-items-center text-center fs-5 flex-column">
                                <h3 class="m-0">Codice QR</h3>
                                <img src="./img/qr-code.svg" class="qr-code">
                                <p>Codice corsa: ${ticketCode}</p>
                                <p>Data: ${date}</p>
                            </section>
                        </div>
                    </div>`

    rowEl.innerHTML += ticketCard;
};