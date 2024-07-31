import { validateForm } from './validation.js';

$(document).ready(function() {
    // Check on submit of a registration form
    $('#registerForm').submit(function(event) {
        if (!validateForm('#registerForm')) {
            event.preventDefault();
        }
    });
});