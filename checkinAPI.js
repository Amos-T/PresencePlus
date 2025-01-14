// // checkinAPI.js
// document.addEventListener('DOMContentLoaded', () => {
//     const form = document.getElementById('userForm');
//     const emailInput = document.querySelector('input[name="email"]');
//     const nameInput = document.querySelector('input[name="name"]');
//     const checkInButton = document.querySelector('.form-btn');
  
//     const AZURE_LOGIC_APP_ENDPOINT = 'https://prod-11.southafricanorth.logic.azure.com/workflows/23979598b6cb4941aab30fc246538dc9/triggers/manual/paths/invoke/NotifyByMail?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=LzXmBL6mNFDZ3ys-RFkL3W8kDGjzB37smmlYUTxJWGo';
  
//     checkInButton.addEventListener('click', async (e) => {
//       e.preventDefault();
//     //   const phone = phoneInput.value.trim();
//       const name= nameInput.value.trim();
//       const email = emailInput.value.trim();
  
//       if (!email) {
//         alert('Email is required');
//         return;
//       }
  
//       try {
//         // Send check-in request
//         const checkInResponse = await fetch(AZURE_LOGIC_APP_ENDPOINT, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({ 
//             message: 
//             name, 
//             email
//           })
//         });
  
//         // const checkInResult = await checkInResponse.json();
  
//         if (checkInResponse.ok) {
//           alert('Check-in Successful!');
//         //   window.location.href = 'dashboard.html';
//         } else {
//           alert("failed Check-In");
//         }
//       } catch (error) {
//         console.log('Amos')
//         console.log(error);
//         alert('Check-in failed. Please try again.');
//       }
//     });
//   });
  
//   // server.js (Node.js with Express)
//   const express = require('express');
//   const bodyParser = require('body-parser');
//   const cors = require('cors');
  
//   const app = express();
//   app.use(cors());
//   app.use(bodyParser.json());
  
//   const registeredUsers = [
//     { phone: '1234567890' },
//     { phone: '9876543210' }
//   ];
  
//   app.post('/api/checkin', (req, res) => {
//     const { message: phone } = req.body;
  
//     if (!phone || phone.length < 10) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid phone number'
//       });
//     }
  
//     const isRegistered = registeredUsers.some(user => user.phone === phone);
  
//     if (!isRegistered) {
//       return res.status(403).json({
//         success: false,
//         message: 'User not registered'
//       });
//     }
  
//     res.status(200).json({
//       success: true,
//       message: 'Check-in Successful!',
//       timestamp: new Date().toISOString()
//     });
//   });
  
//   const PORT = process.env.PORT || 5000;
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });





// Get the form element
const form = document.getElementById('userForm');

// Replace with your deployed Google Apps Script URL
const scriptURL = 'https://script.google.com/macros/s/AKfycbzwawvPKT4vD1ZaOkbD35hMPDqwE1XkefuFJzc9tRMb6OVbkDFpIK5GOV7own-F9h5K/exec';

form.addEventListener('submit', e => {
    e.preventDefault();
    
    // Show loading state
    const button = form.querySelector('button');
    const originalButtonText = button.innerHTML;
    button.innerHTML = 'Submitting...';
    
    // Get form data
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => data[key] = value);
    
    // Add timestamp
    data.timestamp = new Date().toLocaleString();

    // Submit form data
    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        // Clear form
        form.reset();
        
        // Show success message
        alert('Check-in successful!');
        
        // Reset button text
        button.innerHTML = originalButtonText;
    })
    .catch(error => {
        console.error('Error!', error.message);
        alert('Error submitting form. Please try again.');
        
        // Reset button text
        button.innerHTML = originalButtonText;
    });
});