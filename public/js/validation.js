$(document).ready(function() {

    function validateFirstName() {
        const firstName = $('#registerForm input[name="firstName"]').val().trim();
        if (firstName === '') {
            return false;
        }
        return true;
    }

    function validateLastName() {
        const lastName = $('#registerForm input[name="lastName"]').val().trim();
        if (lastName === '') {
            return false;
        }
        return true;
    }

    function validateUsername() {
        const username = $('#registerForm input[name="username"]').val().trim();
        if (username === '') {
            return false;
        }
        return true;
    }

    function validateEmail() {
        const email = $('#registerForm input[name="email"]').val().trim();
        if (email === '') {
            return false;
        }

        // Email validation regex
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            $('#emailError').text('Enter a valid email address');
            return false;
        }
        $('#emailError').text('');
        return true;
    }

    function validatePassword() {
        const password = $('#registerForm input[name="password"]').val().trim();
        if (password === '') {
            return false;
        }
        return true;
    }

    function validateBirthDate() {
        const userBirthDateString = $('#registerForm input[name="birthDate"]').val().trim();
        const userBirthDate = new Date(userBirthDateString); // Convert birthdate string to Date object
        const today = new Date();
        let age = today.getFullYear() - userBirthDate.getFullYear();
        const monthDiff = today.getMonth() - userBirthDate.getMonth();
        
        // If they didn't have a birthday yet, take off one year
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < userBirthDate.getDate())) {
            age--;
        }
        
        if (age < 18) {
            $('#birthDateError').text('Sorry, only 18 years old and up');
            return false
        }

        $('#birthDateError').text('');
        return true

    }

    // Check on submit
    $('#registerForm').submit(function(event) {

        // Prevent submit if not everything is ok
        if (!validateFirstName() || !validateLastName() || !validateUsername() ||
            !validateEmail() || !validateBirthDate() || !validatePassword()) {
            event.preventDefault();
        }
    });
});