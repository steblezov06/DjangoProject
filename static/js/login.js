
    const form = document.getElementById('loginForm');
    const email = document.getElementById('loginEmail');
    const password = document.getElementById('loginPassword');

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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

    function validatePasswordField(field) {
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


    function validateAllFields() {
        let isValid = true;

        if (email) {
            if (!validateEmailField(email)) isValid = false;
        }

        if (password) {
            if (!validatePasswordField(password)) isValid = false;
        }

        return isValid;
    }

    if (email) {
        email.addEventListener('input', function() {
            validateEmailField(this);
        });
    }

    if (password) {
        password.addEventListener('input', function() {
            validatePasswordField(this);
        });
    }

    form.addEventListener('submit', function(event) {
        const isFormValid = validateAllFields();

        if (!isFormValid) {
            event.preventDefault();
        }
    });