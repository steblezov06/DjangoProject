
    const form = document.getElementById('registrationForm');

    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const password1 = document.getElementById('password1');
    const password2 = document.getElementById('password2');

    const nameRegex = /^[А-ЯЁA-Z][а-яёa-z]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^\+7\d{10}$/;

    function validateNameField(field) {
        const value = field.value;

        if (value.length === 0) {
            field.classList.add('is-invalid');
            field.classList.remove('is-valid');
            return false;
        } else if (value.length < 2) {
            field.classList.add('is-invalid');
            field.classList.remove('is-valid');
            return false;
        } else if (!nameRegex.test(value)) {
            field.classList.add('is-invalid');
            field.classList.remove('is-valid');
            return false;
        } else {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
            return true;
        }
    }

    function validateEmailField(field) {
        const value = field.value;

        if (value.length === 0) {
            field.classList.add('is-invalid');
            field.classList.remove('is-valid');
            return false;
        } else if (!emailRegex.test(value)) {
            field.classList.add('is-invalid');
            field.classList.remove('is-valid');
            return false;
        } else {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
            return true;
        }
    }

    function validatePhoneField(field) {
        const value = field.value;

        if (value.length === 0) {
            field.classList.add('is-invalid');
            field.classList.remove('is-valid');
            return false;
        } else if (!phoneRegex.test(value)) {
            field.classList.add('is-invalid');
            field.classList.remove('is-valid');
            return false;
        } else {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
            return true;
        }
    }

    function validatePassword1Field(field) {
        const value = field.value;

        if (value.length === 0) {
            field.classList.add('is-invalid');
            field.classList.remove('is-valid');
            return false;
        } else if (value.length < 8) {
            field.classList.add('is-invalid');
            field.classList.remove('is-valid');
            return false;
        } else {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
            return true;
        }
    }

    function validatePassword2Field(field) {
        const value = field.value;

        if (value.length === 0) {
            field.classList.add('is-invalid');
            field.classList.remove('is-valid');
            return false;
        } else if (password1 && value !== password1.value) {
            field.classList.add('is-invalid');
            field.classList.remove('is-valid');
            return false;
        } else if (password1 && !password1.classList.contains('is-valid')) {
            field.classList.add('is-invalid');
            field.classList.remove('is-valid');
            return false;
        } else {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
            return true;
        }
    }


    function validateAllFields() {
        let isValid = true;

        if (firstName) {
            if (!validateNameField(firstName)) isValid = false;
        }

        if (lastName) {
            if (!validateNameField(lastName)) isValid = false;
        }

        if (email) {
            if (!validateEmailField(email)) isValid = false;
        }

        if (phone) {
            if (!validatePhoneField(phone)) isValid = false;
        }

        if (password1) {
            if (!validatePassword1Field(password1)) isValid = false;
        }

        if (password2) {
            if (!validatePassword2Field(password2)) isValid = false;
        }

        return isValid;
    }

    if (firstName) {
        firstName.addEventListener('input', function() {
            validateNameField(this);
        });
    }

    if (lastName) {
        lastName.addEventListener('input', function() {
            validateNameField(this);
        });
    }

    if (email) {
        email.addEventListener('input', function() {
            validateEmailField(this);
        });
    }

    if (phone) {
        phone.addEventListener('input', function() {
            validatePhoneField(this);
        });
    }

    if (password1) {
        password1.addEventListener('input', function() {
            validatePassword1Field(this);
            if (password2 && password2.value.length > 0) {
                validatePassword2Field(password2);
            }
        });
    }

    if (password2) {
        password2.addEventListener('input', function() {
            validatePassword2Field(this);
        });
    }

    form.addEventListener('submit', function(event) {
        const isFormValid = validateAllFields();

        if (!isFormValid) {
            event.preventDefault();
        }
    });