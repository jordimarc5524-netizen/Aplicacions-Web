const container = document.querySelector('.container');
const seats = document.querySelectorAll(' .row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const currencySelect = document.getElementById('currency');
const currencyLabel = document.getElementById('currency-label');

popularlateUI();

let ticketPrice = movieSelect.value;

// Save selected movie index and price
function serMoivieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}
localStorage

//Update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    convertPrice();
}

//Get data from localstorage and populate UI
function popularlateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

//movie select event
movieSelect.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;
    serMoivieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});


//seat click event
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat')&& 
    !e.target.classList.contains('occupied')

     ) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
 });


//Initial count and total set
updateSelectedCount();

//Canvi monetari
function convertPrice() {
    const moneda = currencySelect.value;

    if (moneda === '') {
        return;
    }
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    fetch('https://api.exchangerate-api.com/v4/latest/USD')
        .then(res => res.json())
        .then(data => {
            const rate = data.rates[moneda];
            currencyLabel.innerText = moneda;
            total.innerText = (selectedSeats.length * ticketPrice * rate).toFixed(2);
            movieSelect.options[0].innerText = 'Avengers: Endgame (' + (10 * rate).toFixed(2) + ' ' + moneda + ')';
            movieSelect.options[1].innerText = 'Joker (' + (12 * rate).toFixed(2) + ' ' + moneda + ')';
            movieSelect.options[2].innerText = 'Toy Story 4 (' + (8 * rate).toFixed(2) + ' ' + moneda + ')';
            movieSelect.options[3].innerText = 'The Lion King (' + (9 * rate).toFixed(2) + ' ' + moneda + ')';
        });
}

//selector de monedes

fetch('https://api.exchangerate-api.com/v4/latest/USD')
    .then(res => res.json())
    .then(data => {
        Object.keys(data.rates).forEach(moneda => {
            const option = document.createElement('option');
            option.value = moneda;
            option.innerText = moneda;
            currencySelect.appendChild(option);
        });
    });

currencySelect.addEventListener('change', () => {convertPrice();
});