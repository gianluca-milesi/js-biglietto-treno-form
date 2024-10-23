const costPerKm = 0.21;
const numKm = document.querySelector(".num-km");
const textResult = document.getElementById("text-result");
const age = document.getElementById("age");
const formButton = document.getElementById("form-btn");


// formButton.addEventListener("click", function (event) {
//     event.preventDefault();

//     if (age.value === "underage") {
//         discount += (((costPerKm * numKm.value) / 100) * 20);
//         textResult.innerHTML = `${costPerKm * numKm.value - discount}`;
//     } else if (age.value === "over-65") {
//         discount += (((costPerKm * numKm.value) / 100) * 40);
//         textResult.innerHTML = `${costPerKm * numKm.value - discount}`;
//     } else {
//         textResult.innerHTML = `${costPerKm * numKm.value}`;
//     }

// });


formButton.addEventListener("click", function (event) {
    event.preventDefault();

    let kmValue = parseFloat(numKm.value);
    let totalCost = costPerKm * kmValue;
    let discount = calculateDiscount(totalCost, age.value);
    let finalCost = totalCost - discount;

    textResult.innerHTML = `${finalCost.toFixed(2)}€`;
});

function calculateDiscount(cost, ageCategory) {
    let discount = 0;
    if (ageCategory === "underage") {
        discount += (((cost) / 100) * 20);
    } else if (ageCategory === "over-65") {
        discount += (((cost) / 100) * 40);
    }
    return discount;
}






