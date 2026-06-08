const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//Show input error message
form. showErrorinput(input, message) {
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
            const validateEmail = (email) => {
                return String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
            };
        }

        //Event listeners
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            if (username.value === ''){
                    showError('Username is required');
                } else {
                    showSuccess(username);
                }
                if (email.value === ''){
                        showError('Email is required');
                    } else if(isValidEmail(email.value())) {
                        showError('Email is not valid');
                    }
                    else {
                            showSuccess(email);
                        }
                        if (password.value === ''){
                                showError('Password is required');
                            } else {
                                showSuccess(password);
                            }
                            if (password2.value === ''){
                                    showError('Password confirmation is required');
                                } else {
                                    showSuccess(password2);
                                }
                        });