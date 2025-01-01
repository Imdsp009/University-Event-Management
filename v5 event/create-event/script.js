document.getElementById('eventForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const formData = {
      name: document.getElementById('name').value,
      description: document.getElementById('description').value,
      location: document.getElementById('location').value,
      start_time: new Date(document.getElementById('start_time').value).toISOString(),
      end_time: new Date(document.getElementById('end_time').value).toISOString()
    };
  
    const responseMessage = document.getElementById('responseMessage');
    responseMessage.textContent = 'Submitting...';
    responseMessage.style.color = '#555'; // Neutral color for in-progress state
  
    try {
      const response = await fetch('http://localhost:8080/events', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem("authToken")}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Success response
        responseMessage.innerHTML = `
          <div class="success">
            <h3>Event Created Successfully!</h3>
            <p><strong>Name:</strong> ${data.event.name}</p>
            <p><strong>Description:</strong> ${data.event.description}</p>
            <p><strong>Location:</strong> ${data.event.location}</p>
            <p><strong>Start Time:</strong> ${new Date(data.event.start_time).toLocaleString()}</p>
            <p><strong>End Time:</strong> ${new Date(data.event.end_time).toLocaleString()}</p>
            <p>Status: <strong>${data.event.status}</strong></p>
            <p><strong>Message:</strong> ${data.message}</p>
          </div>
        `;
        responseMessage.style.color = 'green';
      } else if (response.status === 401) {
        // Unauthorized response
        responseMessage.innerHTML = `
          <div class="error">
            <h3>Authorization Error</h3>
            <p><strong>Error:</strong> ${data.error}</p>
            <p>Please check your authorization token and try again.</p>
          </div>
        `;
        responseMessage.style.color = 'red';
      } else {
        // Handle other errors
        throw new Error(data.message || 'An unexpected error occurred.');
      }
    } catch (error) {
      responseMessage.innerHTML = `
        <div class="error">
          <h3>Submission Failed</h3>
          <p>${error.message}</p>
          <p>Please try again later.</p>
        </div>
      `;
      responseMessage.style.color = 'red';
    }
  });
  