const form = document.getElementById('contactForm');

const firstName = document.getElementById('validationCustom01');
const lastName = document.getElementById('validationCustom02');
const phone = document.getElementById('validationCustom03');
const email = document.getElementById('validationCustom04');
const message = document.getElementById('validationCustom05');

const nameRegex = /^[А-ЯЁA-Z][а-яёa-z]+$/; // Первая заглавная остальные строчные (только буквы)
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // email
const phoneRegex = /^\+7\d{10}$/; // +7 и 10 цифр после

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

function validateMessageField(field) {
    const value = field.value;

    if (value.length === 0) {
        field.classList.add('is-invalid');
        field.classList.remove('is-valid');
        return false;
    } else if (value.length < 10) {
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

    if (message) {
        if (!validateMessageField(message)) isValid = false;
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

if (message) {
    message.addEventListener('input', function() {
        validateMessageField(this);
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