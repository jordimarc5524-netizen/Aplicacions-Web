const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//Show input error message
function showErrorinput(input, message) {
    const formControl = input.parentElement; 
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

//Show success outline
function showSuccess(input) {
    const formControl = input.parentElement; 
    formControl.className = 'form-control success';
}

//check email is valid
function isValidEmail(email) {

    const re =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(String(email).toLowerCase());
}

//Event listeners
form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (username.value === '')
        showError('Username is required');
        else showSuccess(username);
});

