$(document).ready(function() {

    function validateFirstName(formId) {
        const firstName = $(`${formId} input[name="firstName"]`).val().trim();
        if (firstName === '') {
            return false;
        }
        return true;
    }

    function validateLastName(formId) {
        const lastName = $(`${formId} input[name="lastName"]`).val().trim();
        if (lastName === '') {
            return false;
        }
        return true;
    }

    function validateEmail(formId) {
        const email = $(`${formId} input[name="email"]`).val().trim();
        if (email === '') {
            return false;
        }

        // Email validation regex
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            $(`${formId} #emailError`).text('Enter a valid email address');
            return false;
        }
        $(`${formId} #emailError`).text('');
        return true;
    }

    function validatePassword(formId) {
        const password = $(`${formId} input[name="password"]`).val().trim();
        if (password === '') {
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
            $(`${formId} #birthDateError`).text('Sorry, only 18 years old and up');
            return false;
        }

        $(`${formId} #birthDateError`).text('');
        return true;
    }

    function validateForm(formId) {
        return validateFirstName(formId) && validateLastName(formId) &&
            validateEmail(formId) && validateBirthDate(formId) && validatePassword(formId);
    }

    // Check on submit of a registration form
    $('#registerForm').submit(function(event) {
        if (!validateForm('#registerForm')) {
            event.preventDefault();
        }
    });

    // Check on submit of an update form
    $('#update-customer-form').submit(function(event) {
        if (!validateForm('#update-customer-form')) {
            event.preventDefault();
        }
    });
});
