const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const edat = document.getElementById('edat');

// Show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// check email is valid
function checkEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if(re.test(input.value.trim())) {
        showSuccess(input);
    }else{
        showError(input, 'Email is not valid');
    }
}

// Check password is valid
function checkPassword(input) {
    const charesp = /[`~!@#$%^&*()\-_=+{}\[\]\\|;:'",.<>?\/]/.test(input.value);
    const majuscula = /[A-Z]/.test(input.value);
    const minuscula = /[a-z]/.test(input.value);
    const xifra = /[0-9]/.test(input.value);

    if (input.value.length < 8) {
        showError(input, 'La contrasenya ha de tenir mínim 8 caràcters');
    } else if (!majuscula) {
        showError(input, 'Ha de contenir almenys una majúscula');
    } else if (!minuscula) {
        showError(input, 'Ha de contenir almenys una minúscula');
    } else if (!xifra) {
        showError(input, 'Ha de contenir almenys una xifra');
    } else if (!charesp) {
        showError(input, 'Ha de contenir almenys un Caracter especial');
     } else {
        showSuccess(input);
    }
}

// Check required fields
function checkrequired(inputArr) {
    inputArr.forEach(function(input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
}

// Check input length
function checklength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    } else {
        showSuccess(input);
    }
}

//Check passwords match
function checkPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'Passwords do not match');
    }else {        showSuccess(input2);
    }
}

// Get fieldname
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
form.addEventListener('submit', function(e) {
    e.preventDefault();

    checkrequired([username, email, password, password2]);
    checklength(username, 3, 15);
    checkPassword(password, password2);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
    checkEdat(edat);
});

// Comprova que l'edat és >= 0 i < 1000
function checkEdat(input) {
    if (input.value.trim() === '') {
        showError(input, 'L\'edat és obligatòria');
    } else if (input.value < 0 || input.value >= 1000) {
        showError(input, 'L\'edat ha de ser entre 0 i 999');
    } else {
        showSuccess(input);
    }
}
