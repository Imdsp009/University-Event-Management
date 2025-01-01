// Navbar Scroll Effect





// window.addEventListener("scroll", function () {
//   const navbar = document.querySelector(".navbar-custom");
//   if (window.scrollY > 50) {
//     navbar.classList.add("scrolled");
//   } else {
//     navbar.classList.remove("scrolled");
//   }
// });

// // Autocomplete Search Functionality
// const searchInput = document.getElementById("searchInput");
// const suggestionsDiv = document.getElementById("autocompleteSuggestions");
// const mockBackendData = [
//   "Apple", "Banana", "Cherry", "Date", "Fig", "Grape",
//   "Honeydew", "Kiwi", "Lemon", "Mango"
// ];

// function showSuggestions(query) {
//   if (query.length === 0) {
//     suggestionsDiv.innerHTML = "";
//     suggestionsDiv.style.display = "none";
//     return;
//   }

//   setTimeout(() => {
//     const filteredSuggestions = mockBackendData.filter(item =>
//       item.toLowerCase().includes(query.toLowerCase())
//     );

//     suggestionsDiv.innerHTML = "";
//     if (filteredSuggestions.length > 0) {
//       filteredSuggestions.forEach(item => {
//         const suggestionItem = document.createElement("div");
//         suggestionItem.classList.add("autocomplete-suggestion");
//         suggestionItem.textContent = item;
//         suggestionItem.addEventListener("click", () => {
//           searchInput.value = item;
//           suggestionsDiv.innerHTML = "";
//           suggestionsDiv.style.display = "none";
//         });
//         suggestionsDiv.appendChild(suggestionItem);
//       });
//       suggestionsDiv.style.display = "block";
//     } else {
//       suggestionsDiv.style.display = "none";
//     }
//   }, 200);
// }

// searchInput.addEventListener("input", () => showSuggestions(searchInput.value));
// searchInput.addEventListener("blur", () => setTimeout(() => {
//   suggestionsDiv.style.display = "none";
// }, 200));
// searchInput.addEventListener("focus", () => {
//   if (searchInput.value.length > 0) {
//     showSuggestions(searchInput.value);
//   }
// });

// // Registration/Login Popup
// const profileButton = document.getElementById("profileButton");
// const popupForm = document.getElementById("popupForm");
// const closePopup = document.getElementById("closePopup");
// const formTitle = document.getElementById("formTitle");
// const confirmPasswordBox = document.getElementById("confirmPasswordBox");
// const termsPolicy = document.getElementById("termsPolicy");
// const submitButton = document.getElementById("submitButton");
// const toggleLink = document.getElementById("toggleLogin");
// const registrationForm = document.getElementById("registrationForm");
// const nameInput = document.getElementById("name");
// const emailInput = document.getElementById("email");
// const passwordInput = document.getElementById("password");
// const confirmPasswordInput = document.getElementById("confirmPassword");
// const termsAccepted = document.getElementById("termsAccepted");

// let isLoginForm = false;

// profileButton.addEventListener("click", () => {
//   popupForm.classList.add("active");
//   toggleForm(false);
// });

// closePopup.addEventListener("click", () => {
//   popupForm.classList.remove("active");
//   clearForm();
// });

// function toggleForm(showLogin) {
//   clearForm();
//   isLoginForm = showLogin;

//   if (isLoginForm) {
//     formTitle.innerText = "Login";
//     confirmPasswordBox.style.display = "none";
//     termsPolicy.style.display = "none";
//     confirmPasswordInput.removeAttribute("required");
//     nameInput.removeAttribute("required");
//     termsAccepted.removeAttribute("required");
//     submitButton.value = "Login Now";
//     toggleLink.innerHTML = `Don't have an account? <a href="#">Register now</a>`;
//   } else {registrationForm.addEventListener("submit", e => {
//     e.preventDefault();
//     const userData = {
//       email: emailInput.value,
//       password: passwordInput.value
//     };
  
//     if (!isLoginForm) {
//       // Registration-specific validations
//       const name = nameInput.value;
//       const confirmPassword = confirmPasswordInput.value;
  
//       if (name === "" || confirmPassword === "") {
//         alert("Please fill in all fields.");
//         return;
//       }
  
//       if (passwordInput.value !== confirmPassword) {
//         alert("Passwords do not match.");
//         return;
//       }
  
//       if (!termsAccepted.checked) {
//         alert("You must accept the terms and conditions.");
//         return;
//       }
  
//       userData.username = name; // Add username for registration
//     } else {
//       // Login form validation
//       const name = nameInput.value;
//       if (name !== "") {
//         userData.username = name; // Include username if provided
//       }
//     }
  
//     const endpoint = isLoginForm
//       ? "http://localhost:8080/login"
//       : "http://localhost:8080/signup";
  
//     fetch(endpoint, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(userData)
//     })
//       .then(response => response.json())
//       .then(data => {
//         if (data.message) {
//           alert(data.message || "Operation successful.");
//           if (data.token) {
//             localStorage.setItem("authToken", data.token);
//           }
//           popupForm.classList.remove("active");
//           clearForm();
//         } else if (data.error) {
//           alert(data.error || "Something went wrong. Please try again.");
//         }
//       })
//       .catch(error => {
//         console.error("Error:", error);
//         alert("An error occurred. Please try again later.");
//       });
//   });
  
//   termsAccepted.addEventListener("change", () => {
//     submitButton.disabled = !termsAccepted.checked;
//   });
  
//     formTitle.innerText = "Registration";
//     confirmPasswordBox.style.display = "block";
//     termsPolicy.style.display = "flex";
//     confirmPasswordInput.setAttribute("required", "true");
//     nameInput.setAttribute("required", "true");
//     termsAccepted.setAttribute("required", "true");
//     submitButton.value = "Register Now";
//     toggleLink.innerHTML = `Already have an account? <a href="#">Login now</a>`;
//   }
// }

// function clearForm() {
//   registrationForm.reset();
//   const inputs = registrationForm.querySelectorAll('input:not([type="submit"])');
//   inputs.forEach(input => {
//     if (input.type === "checkbox") {
//       input.checked = false;
//     } else {
//       input.value = "";
//     }
//   });
// }

// toggleLink.addEventListener("click", e => {
//   e.preventDefault();
//   toggleForm(!isLoginForm);
// });
// registrationForm.addEventListener("submit", e => {
//   e.preventDefault();
//   const userData = {
//     email: emailInput.value,
//     password: passwordInput.value
//   };

//   if (!isLoginForm) {
//     // Registration-specific validations
//     const name = nameInput.value;
//     const confirmPassword = confirmPasswordInput.value;

//     if (name === "" || confirmPassword === "") {
//       alert("Please fill in all fields.");
//       return;
//     }

//     if (passwordInput.value !== confirmPassword) {
//       alert("Passwords do not match.");
//       return;
//     }

//     if (!termsAccepted.checked) {
//       alert("You must accept the terms and conditions.");
//       return;
//     }

//     userData.username = name; // Add username for registration
//   } else {
//     // Login form validation
//     const name = nameInput.value;
//     if (name !== "") {
//       userData.username = name; // Include username if provided
//     }
//   }

//   const endpoint = isLoginForm
//     ? "http://localhost:8080/login"
//     : "http://localhost:8080/signup";

//   fetch(endpoint, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(userData)
//   })
//     .then(response => response.json())
//     .then(data => {
//       if (data.message) {
//         alert(data.message || "Operation successful.");
//         if (data.token) {
//           localStorage.setItem("authToken", data.token);
//         }
//         popupForm.classList.remove("active");
//         clearForm();
//       } else if (data.error) {
//         alert(data.error || "Something went wrong. Please try again.");
//       }
//     })
//     .catch(error => {
//       console.error("Error:", error);
//       alert("An error occurred. Please try again later.");
//     });
// });

// termsAccepted.addEventListener("change", () => {
//   submitButton.disabled = !termsAccepted.checked;
// });
// Navbar Scroll Effect
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar-custom");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Autocomplete Search Functionality
const searchInput = document.getElementById("searchInput");
const suggestionsDiv = document.getElementById("autocompleteSuggestions");
const mockBackendData = [
  "Apple", "Banana", "Cherry", "Date", "Fig", "Grape",
  "Honeydew", "Kiwi", "Lemon", "Mango"
];

function showSuggestions(query) {
  if (query.length === 0) {
    suggestionsDiv.innerHTML = "";
    suggestionsDiv.style.display = "none";
    return;
  }

  setTimeout(() => {
    const filteredSuggestions = mockBackendData.filter(item =>
      item.toLowerCase().includes(query.toLowerCase())
    );

    suggestionsDiv.innerHTML = "";
    if (filteredSuggestions.length > 0) {
      filteredSuggestions.forEach(item => {
        const suggestionItem = document.createElement("div");
        suggestionItem.classList.add("autocomplete-suggestion");
        suggestionItem.textContent = item;
        suggestionItem.addEventListener("click", () => {
          searchInput.value = item;
          suggestionsDiv.innerHTML = "";
          suggestionsDiv.style.display = "none";
        });
        suggestionsDiv.appendChild(suggestionItem);
      });
      suggestionsDiv.style.display = "block";
    } else {
      suggestionsDiv.style.display = "none";
    }
  }, 200);
}

searchInput.addEventListener("input", () => showSuggestions(searchInput.value));
searchInput.addEventListener("blur", () => setTimeout(() => {
  suggestionsDiv.style.display = "none";
}, 200));
searchInput.addEventListener("focus", () => {
  if (searchInput.value.length > 0) {
    showSuggestions(searchInput.value);
  }
});

// Registration/Login Popup
const profileButton = document.getElementById("profileButton");
const popupForm = document.getElementById("popupForm");
const closePopup = document.getElementById("closePopup");
const formTitle = document.getElementById("formTitle");
const confirmPasswordBox = document.getElementById("confirmPasswordBox");
const termsPolicy = document.getElementById("termsPolicy");
const submitButton = document.getElementById("submitButton");
const toggleLink = document.getElementById("toggleLogin");
const registrationForm = document.getElementById("registrationForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const termsAccepted = document.getElementById("termsAccepted");

let isLoginForm = false;

profileButton.addEventListener("click", () => {
  popupForm.classList.add("active");
  toggleForm(false);
});

closePopup.addEventListener("click", () => {
  popupForm.classList.remove("active");
  clearForm();
});

function toggleForm(showLogin) {
  clearForm();
  isLoginForm = showLogin;

  if (isLoginForm) {
    formTitle.innerText = "Login";
    confirmPasswordBox.style.display = "none";
    termsPolicy.style.display = "none";
    confirmPasswordInput.removeAttribute("required");
    nameInput.removeAttribute("required");
    termsAccepted.removeAttribute("required");
    submitButton.value = "Login Now";
    toggleLink.innerHTML = `Don't have an account? <a href="#">Register now</a>`;
  } else {
    formTitle.innerText = "Registration";
    confirmPasswordBox.style.display = "block";
    termsPolicy.style.display = "flex";
    confirmPasswordInput.setAttribute("required", "true");
    nameInput.setAttribute("required", "true");
    termsAccepted.setAttribute("required", "true");
    submitButton.value = "Register Now";
    toggleLink.innerHTML = `Already have an account? <a href="#">Login now</a>`;
  }
}

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

toggleLink.addEventListener("click", e => {
  e.preventDefault();
  toggleForm(!isLoginForm);
});

registrationForm.addEventListener("submit", e => {
  e.preventDefault();
  const userData = {
    email: emailInput.value,
    password: passwordInput.value
  };

  if (!isLoginForm) {
    const name = nameInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (name === "" || confirmPassword === "") {
      alert("Please fill in all fields.");
      return;
    }

    if (passwordInput.value !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!termsAccepted.checked) {
      alert("You must accept the terms and conditions.");
      return;
    }

    userData.username = name;
  } else {
    delete userData.username;
  }

  const endpoint = isLoginForm
    ? "http://localhost:8080/login"
    : "http://localhost:8080/signup";

  fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  })
    .then(response => response.json())
    .then(data => {
      if (data.message) {
        alert(data.message || "Operation successful.");
        if (data.token) {
          sessionStorage.setItem("authToken", data.token);
        }
        popupForm.classList.remove("active");
        clearForm();
      } else if (data.error) {
        alert(data.error || "Something went wrong. Please try again.");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    });
});

termsAccepted.addEventListener("change", () => {
  submitButton.disabled = !termsAccepted.checked;
});

// Wishlist Modal
var modal = document.getElementById("wishlistModal");
var openModalBtn = document.getElementById("openModal");
var closeModalBtn = document.getElementById("closeModal");
var wishlistItemsContainer = document.getElementById("wishlistItems");
var clearAllBtn = document.getElementById("clearAllBtn");

var wishlistItems = [];

async function fetchWishlistItems() {
  try {
    const response = await fetch("http://localhost:8080/events/my-registrations", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch wishlist items");
    }

    const data = await response.json();
    return data.events || [];
  } catch (error) {
    console.error("Failed to fetch wishlist items:", error);
    return [];
  }
}

function renderWishlistItems() {
  wishlistItemsContainer.innerHTML = "";
  if (wishlistItems.length === 0) {
    wishlistItemsContainer.innerHTML = '<div class="empty-state">Your wishlist is empty</div>';
    clearAllBtn.style.display = "none";
    return;
  }

  clearAllBtn.style.display = "block";
  wishlistItems.forEach(item => {
    var itemElement = document.createElement("div");
    itemElement.classList.add("item");
    itemElement.innerHTML =
      `<span>${item.name}</span>
       <button class="remove-btn" onclick="removeItem(${item.id})">
         <i class="fas fa-trash"></i>
       </button>`;
    wishlistItemsContainer.appendChild(itemElement);
  });
}

function removeItem(id) {
  wishlistItems = wishlistItems.filter(item => item.id !== id);
  renderWishlistItems();
}

function clearAllItems() {
  wishlistItems = [];
  renderWishlistItems();
}

openModalBtn.addEventListener("click", async function () {
  if (!localStorage.getItem("authToken")) {
    alert("Please log in to access your wishlist.");
    return;
  }

  modal.style.display = "block";

  try {
    wishlistItems = await fetchWishlistItems();
    renderWishlistItems();
  } catch (error) {
    console.error("Failed to fetch wishlist items:", error);
  }
});

closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", event => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

clearAllBtn.addEventListener("click", clearAllItems);
