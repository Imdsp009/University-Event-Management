// Handle form submission when the user clicks "Register Now"
document.getElementById('registrationForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent form from submitting the traditional way

    // Get the values entered by the user in the form fields
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const termsAccepted = document.getElementById('terms').checked;

    // Basic validation to ensure password and confirm password match
    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return; // Stop further execution
    }

    // Basic validation to check if terms are accepted
    if (!termsAccepted) {
        alert('You must accept the terms and conditions.');
        return; // Stop further execution
    }

    // Send a POST request to the backend with the form data
    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Indicate we're sending JSON data
            },
            body: JSON.stringify({ name, email, password }) // Send data as JSON
        });

        // Wait for the response from the backend
        const result = await response.json();

        // If the response is OK (status 200), show a success message
        if (response.ok) {
            alert(result.message); // Success message returned from the server
        } else {
            alert(result.error || 'Failed to register student.'); // Error message returned from server
        }
    } catch (error) {
        // Catch any errors (e.g., network issues) and log/display them
        console.error('Error during registration:', error);
        alert('Failed to register student. Please try again later.');
    }
});
