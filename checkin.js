document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('userForm');
    const phoneInput = form.querySelector('input[name="phone"]');
    const submitButton = form.querySelector('.form-btn');

    // Validation function for phone number
    function validatePhoneNumber(phone) {
        // Regex to validate various phone number formats
        // This can be adjusted based on your specific requirements
        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        return phoneRegex.test(phone.trim());
    }

    // Simulated database of registered phone numbers
    const registeredPhones = [
        '+1234567890', 
        '9876543210', 
        '(555) 123-4567',
        '123-456-7890'
    ];

    // Function to check phone number in database
    function checkPhoneInDatabase(phone) {
        // Normalize phone number for comparison
        const normalizedPhone = phone.replace(/[\s\(\)\-\.]/g, '');
        
        return registeredPhones.some(registeredPhone => 
            registeredPhone.replace(/[\s\(\)\-\.]/g, '') === normalizedPhone
        );
    }

    // Real Backend Version (Commented Out)
    /*
    async function checkPhoneInDatabase(phone) {
        try {
            const response = await fetch('/api/check-phone', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phone: phone })
            });

            const result = await response.json();
            return result.exists;
        } catch (error) {
            console.error('Error checking phone number:', error);
            return false;
        }
    }
    */

    // Form submission handler
    submitButton.addEventListener('click', async function(e) {
        e.preventDefault(); // Prevent default form submission

        const phone = phoneInput.value.trim();

        // Validate phone number format
        if (!validatePhoneNumber(phone)) {
            showError(phoneInput, 'Invalid phone number format');
            return;
        }

        try {
            // Check if phone number exists in database
            const phoneExists = await checkPhoneInDatabase(phone);

            if (phoneExists) {
                // Phone number found - proceed to dashboard
                window.location.href = 'dashboard.html';
            } else {
                // Phone number not found
                showError(phoneInput, 'Phone number not registered');
            }
        } catch (error) {
            console.error('Validation error:', error);
            showError(phoneInput, 'Error validating phone number');
        }
    });

    // Error display function
    function showError(input, message) {
        const parentDiv = input.closest('.validate');
        
        // Remove any existing error
        const existingError = parentDiv.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Create and append error message
        const errorSpan = document.createElement('span');
        errorSpan.className = 'error-message';
        errorSpan.style.color = 'red';
        errorSpan.style.fontSize = '0.8em';
        errorSpan.style.marginTop = '5px';
        errorSpan.textContent = message;

        parentDiv.appendChild(errorSpan);
        parentDiv.classList.add('alert-validate');
    }

    // Optional: Remove error on input
    phoneInput.addEventListener('input', function() {
        const parentDiv = this.closest('.validate');
        parentDiv.classList.remove('alert-validate');
        
        const existingError = parentDiv.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    });

    // Optional: CSS for error styling
    const styleTag = document.createElement('style');
    styleTag.textContent = `
        .validate { position: relative; }
        .validate.alert-validate input {
            border-color: red;
        }
        .error-message {
            display: block;
            color: red;
            font-size: 0.8em;
            margin-top: 5px;
        }
    `;
    document.head.appendChild(styleTag);
});