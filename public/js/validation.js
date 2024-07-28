function validateUsername() {
    const username = $('#registerForm input[name="username"]').val().trim();
    if (username === '') {
        return false;
    }
    return true;
}

function validateFirstName(formId) {
    const firstName = $(`${formId} input[name="firstName"]`).val().trim();
    if (firstName === '') {
        console.log('First Name is empty');
        return false;
    }
    return true;
}

function validateLastName(formId) {
    const lastName = $(`${formId} input[name="lastName"]`).val().trim();
    if (lastName === '') {
        console.log('Last Name is empty');
        return false;
    }
    return true;
}

function validateEmail(formId) {
    const email = $(`${formId} input[name="email"]`).val().trim();
    if (email === '') {
        console.log('Email is empty');
        return false;
    }

    // Email validation regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        console.log('Email is not valid');
        $(`${formId} #emailError`).text('Enter a valid email address');
        return false;
    }
    $(`${formId} #emailError`).text('');
    return true;
}

function validatePassword(formId) {
    const password = $(`${formId} input[name="password"]`).val().trim();
    if (password === '') {
        console.log('Password is empty');
        return false;
    }
    return true;
}

function validateBirthDate(formId) {
    const userBirthDateString = $(`${formId} input[name="birthDate"]`).val().trim();
    const userBirthDate = new Date(userBirthDateString); // Convert birthdate string to Date object
    const today = new Date();
    let age = today.getFullYear() - userBirthDate.getFullYear();
    const monthDiff = today.getMonth() - userBirthDate.getMonth();
    
    // If they didn't have a birthday yet, take off one year
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < userBirthDate.getDate())) {
        age--;
    }
    
    if (age < 18) {
        console.log('User is under 18');
        $(`${formId} #birthDateError`).text('Sorry, only 18 years old and up');
        return false;
    }

    $(`${formId} #birthDateError`).text('');
    return true;
}

function validateUpdateForm(formId) {
    return validateFirstName(formId) && validateLastName(formId) &&
        validateEmail(formId) && validateBirthDate(formId) && validatePassword(formId);
}

function validateForm(formId) {
    return validateFirstName(formId) && validateLastName(formId) && validateUsername(formId) &&
        validateEmail(formId) && validateBirthDate(formId) && validatePassword(formId);
}

// Export functions
export { validateFirstName, validateLastName, validateEmail, validatePassword, validateBirthDate, validateForm, validateUpdateForm};
