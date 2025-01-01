/*window.onload = function() {
    AOS.init({
      duration: 1000, // Sets the duration for the animations
      once: true, // Whether animation should happen only once - while scrolling down
      mirror: false, // Whether elements should animate out while scrolling past them
    });
  };*/
function learnMore() {
  function learnMore() {
    window.location.href = "events.html"; // Redirects to the events page
  }
}

function registerEvent(eventName) {
  alert("You have successfully registered for " + eventName + "!");
  // You can also redirect to a registration page or send the data to the server
  // window.location.href = 'register.html?event=' + eventName;
}
function swiperAnimation() {
  const swiper = new Swiper(".mySwiper", {
    slidesPerView: "auto",
    centeredSlides: true,
    spaceBetween: 100,
  });
}
window.onload = function () {
  AOS.init({
    duration: 1000,
    once: true,
    mirror: false,
  });
};

function learnMore() {
  window.location.href = "events.html"; // Redirects to the events page
}

// Function to handle the search
function handleSearch() {
  const searchInput = document.querySelector(".search_input");
  const searchTerm = searchInput.value.toLowerCase().trim();

  if (searchTerm) {
    // In a real application, you would typically send this search term to a server
    // or search through a local database. For this example, we'll just alert the term.
    alert(`Searching for: ${searchTerm}`);

    // You could also redirect to a search results page, like this:
    // window.location.href = `search-results.html?q=${encodeURIComponent(searchTerm)}`;
  } else {
    alert("Please enter a search term.");
  }
}

// Add event listener to search icon
document.querySelector(".search_icon").addEventListener("click", handleSearch);

// Add event listener to search input for 'Enter' key press
document
  .querySelector(".search_input")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  });
const calendarContainer = document.getElementById("calendar-container");

flatpickr(calendarContainer, {
  inline: false,
  dateFormat: "Y-m-d",
  onChange: function (selectedDates, dateStr, instance) {
    fetchEvents(dateStr);
  },
});

function fetchEvents(date) {
  // This function would typically make an AJAX call to your backend
  // For demonstration, we'll just log the date and show an alert
  console.log("Fetching events for date:", date);
  alert(
    `Fetching events for ${date}. In a real application, this would query the backend.`
  );
}
// Get the profile button
const profileButton = document.getElementById("profileButton");
const popupForm = document.getElementById("popupForm");
const closePopup = document.getElementById("closePopup");
const formTitle = document.getElementById("formTitle");
const confirmPasswordBox = document.getElementById("confirmPasswordBox");
const termsPolicy = document.getElementById("termsPolicy");
const submitButton = document.getElementById("submitButton");
const toggleLink = document.getElementById("toggleLogin");
const registrationForm = document.getElementById("registrationForm");

let isLoginForm = false;

// Open the registration popup when profile button is clicked
profileButton.addEventListener("click", () => {
  popupForm.classList.add("active");
  toggleForm(false); // Always open the registration form by default
});

// Close the popup when the close button is clicked
closePopup.addEventListener("click", () => {
  popupForm.classList.remove("active");
  clearForm();
});

// Function to toggle between Login and Registration forms
function toggleForm(showLogin) {
  clearForm(); // Clear the form before switching
  isLoginForm = showLogin;
  
  if (isLoginForm) {
    formTitle.innerText = "Login";
    confirmPasswordBox.style.display = "none";
    termsPolicy.style.display = "none";
    submitButton.value = "Login Now";
    toggleLink.innerHTML = `Don't have an account? <a href="#">Register now</a>`;
  } else {
    formTitle.innerText = "Registration";
    confirmPasswordBox.style.display = "block";
    termsPolicy.style.display = "flex";
    submitButton.value = "Register Now";
    toggleLink.innerHTML = `Already have an account? <a href="#">Login now</a>`;
  }
}

// Function to clear the form
function clearForm() {
  registrationForm.reset();
  const inputs = registrationForm.querySelectorAll('input:not([type="submit"])');
  inputs.forEach(input => {
    if (input.type === "checkbox") {
      input.checked = false;
    } else {
      input.value = "";
    }
  });
}

// Event listener for the toggle link
toggleLink.addEventListener("click", (e) => {
  e.preventDefault();
  toggleForm(!isLoginForm);
});

// Initialize the form as a registration form
toggleForm(false);
document.getElementById('event-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  // Get input values
  const title = document.getElementById('event-title').value;
  const date = document.getElementById('event-date').value;
  const time = document.getElementById('event-time').value;
  const venue = document.getElementById('event-venue').value;
  const description = document.getElementById('event-description').value;

  // Validate inputs (simple validation here, you can enhance it)
  if (!title || !date || !time || !venue || !description) {
      alert("Please fill in all fields.");
      return;
  }

  // Create event object
  const eventDetails = {
      title,
      date,
      time,
      venue,
      description
  };

  // Here you would typically send this data to your server or store it in a database.
  console.log('Event Created:', eventDetails);

  // Confirmation message
  document.getElementById('confirmation-message').innerText = `Event "${title}" has been created successfully!`;

  // Clear the form
  document.getElementById('event-form').reset();
});
function scheduleEvent(eventDetails) {
  // Generate a calendar entry (this is a simulation; implement actual scheduling as needed)
  const calendarEntry = `Event Scheduled: ${eventDetails.title} on ${eventDetails.date} at ${eventDetails.time} in ${eventDetails.venue}.`;

  // Simulating notifications based on user preferences (for demo purposes, we'll assume all users get notified)
  alert(calendarEntry); // This could be an email/SMS notification in a real application

  // You could also append the event to the events list (or update the UI)
  const eventsList = document.querySelector('.events-list');
  const newEventItem = document.createElement('div');
  newEventItem.classList.add('event-item');
  newEventItem.innerHTML = `
      <h3>${eventDetails.title}</h3>
      <p>Date: ${eventDetails.date}</p>
      <p>Time: ${eventDetails.time}</p>
      <p>Venue: ${eventDetails.venue}</p>
      <p>${eventDetails.description}</p>
      <button class="register-button" onclick="registerEvent('${eventDetails.title}')">Register</button>
  `;
  eventsList.appendChild(newEventItem);
}

// Call the schedule function inside the submit event
document.getElementById('event-form').addEventListener('submit', function(event) {
  // ... existing code ...

  // Schedule the event
  scheduleEvent(eventDetails);
});
