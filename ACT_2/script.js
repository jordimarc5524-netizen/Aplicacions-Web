const cunrencyEl_one = document.getElementById("currency-one");
const amountEl_one = document.getElementById("amount-one");
const cunrencyEl_two = document.getElementById("currency-two");
const amountEl_two = document.getElementById("amount-two");

const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");


// Fetch exchange rates and update the DOM
function calculate() {
    const constrency_one = cunrencyEl_one.value;
    const constrency_two = cunrencyEl_two.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${constrency_one}`)
        .then(res => res.json())
        .then(data => {
            const rate = data.rates[constrency_two];
            rateEl.innerText = `1 ${constrency_one} = ${rate} ${constrency_two}`;
            amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
        });
}

// Event listeners
cunrencyEl_one.addEventListener("change", calculate);
amountEl_one.addEventListener('input', () => {
    if (amountEl_one.value < 0) {
        amountEl_one.value = 0;
    }
    calculate();
});
cunrencyEl_two.addEventListener("change", calculate);
amountEl_two.addEventListener('input', () => {
    if (amountEl_two.value < 0) {
        amountEl_two.value = 0;
    }
    calculate();
});

swap.addEventListener("click", () => {
    const temp = cunrencyEl_one.value;
    cunrencyEl_one.value = cunrencyEl_two.value;
    cunrencyEl_two.value = temp;
    calculate();
});

calculate();