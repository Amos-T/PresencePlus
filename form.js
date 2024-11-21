// document.getElementById('userForm').addEventListener('submit', async (e) => {
//     e.preventDefault();
    
//     const formData = new FormData(e.target);
//     const data = Object.fromEntries(formData.entries());

//     try {
//         const response = await fetch('/submit-form', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data)
//         });

//         if (response.ok) {
//             window.location.href = 'dashboard.html';
//         } else {
//             alert('Form submission failed');
//         }   
//     } catch (error) {
//         console.error('Error:', error);
//         alert('An error occurred');
//     }
// });


document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.validate-form');
    const inputs = form.querySelectorAll('.input');
    const submitButton = document.getElementById('submit-form');

    // Validation functions
    const validations = {
        name: function(value) {
            // Require at least 2 words, only letters and spaces
            return /^[a-zA-Z]+\s[a-zA-Z\s]+$/.test(value.trim());
        },
        email: function(value) {
            // Standard email validation with basic format check
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
        },
        phone: function(value) {
            // Validate phone number (10 digits, optional formatting)
            return /^(\+\d{1,2}\s?)?(\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/.test(value.trim());
        },
        message: function(value) {
            // Require at least 10 characters
            return value.trim().length >= 10;
        }
    };

    // Error display function
    function showError(input, isValid) {
        const parentDiv = input.closest('.validate');
        const validateMessage = parentDiv.getAttribute('data-validate');

        if (!isValid) {
            // Add error styling
            parentDiv.classList.add('alert-validate');
            parentDiv.setAttribute('data-validate', validateMessage);
        } else {
            // Remove error styling
            parentDiv.classList.remove('alert-validate');
        }
    }

    // Validate individual input
    function validateInput(input) {
        const name = input.getAttribute('name');
        const value = input.value;
        const isValid = validations[name](value);
        showError(input, isValid);
        return isValid;
    }

    // Add real-time validation on input
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            validateInput(this);
        });
    });

    // Form submission handler
    submitButton.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default form submission
        
        let isFormValid = true;

        // Validate all inputs
        inputs.forEach(input => {
            if (!validateInput(input)) {
                isFormValid = false;
            }
        });

        // If all validations pass, allow form submission or further processing
        if (isFormValid) {
            // Option 1: Redirect to dashboard (as in your original HTML)
            window.location.href = 'dashboard.html';

            // Option 2: If you want to submit form data via AJAX, uncomment and modify:
            // const formData = new FormData(form);
            // fetch('/submit-endpoint', {
            //     method: 'POST',
            //     body: formData
            // })
            // .then(response => response.json())
            // .then(data => {
            //     if (data.success) {
            //         window.location.href = 'dashboard.html';
            //     }
            // })
            // .catch(error => {
            //     console.error('Error:', error);
            // });
        }
    });

    // Optional: CSS to enhance validation feedback
    const styleTag = document.createElement('style');
    styleTag.textContent = `
        .validate { position: relative; }
        .validate.alert-validate::before {
            content: attr(data-validate);
            position: absolute;
            max-width: 70%;
            background-color: #fff;
            border: 1px solid #ff0000;
            color: #ff0000;
            padding: 5px;
            top: 100%;
            left: 0;
            z-index: 10;
        }
    `;
    document.head.appendChild(styleTag);
});