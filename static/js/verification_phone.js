const form = document.getElementById('verificationForm');
const codeInput = document.getElementById('verification_code');

const codeRegex = /^\d{6}$/;

function validateCodeField(field) {
    const value = field.value;

    if (value.length === 0) {
        field.classList.add('is-invalid');
        field.classList.remove('is-valid');
        return false;
    } else if (value.length !== 6) {
        field.classList.add('is-invalid');
        field.classList.remove('is-valid');
        return false;
    } else if (!codeRegex.test(value)) {
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

    if (codeInput) {
        if (!validateCodeField(codeInput)) isValid = false;
    }

    return isValid;
}

if (codeInput) {
    codeInput.addEventListener('input', function() {
        validateCodeField(this);
    });
}

if (form) {
    form.addEventListener('submit', function(event) {
        const isFormValid = validateAllFields();

        if (!isFormValid) {
            event.preventDefault();
        }
    });
}