let page = 1; // Current page
let isLoading = false; // Loading state
let hasMoreEvents = true; // Flag to check if more events are available

async function registerEvent(id) {
    try {
        const response = await fetch(`http://localhost:8080/events/register/${id}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("authToken")}`,
                "Content-Type": "application/json"
            }
        });
        //Authorization": `Bearer ${sessionStorage.getItem('authToken')}`

        const data = await response.json();
        const isSuccess = data.message === "true";
        const errorMessage = data.error || "An unknown error occurred.";
        showModal(isSuccess, isSuccess ? "Registration Successful!" : `Registration Failed: ${errorMessage}`);
    } catch (error) {
        console.error("Error registering for event:", error);
        showModal(false, "Registration Failed: Unable to connect to the server.");
    }
}

function showModal(isSuccess, message) {
    const modal = document.createElement("div");
    modal.className = `custom-modal ${isSuccess ? "success" : "failure"}`;

    const modalContent = `
        <div class="custom-modal-content">
            <span class="custom-modal-close" onclick="closeModal(this)">&times;</span>
            <div class="custom-modal-icon">${isSuccess ? "✔" : "❌"}</div>
            <p>${message}</p>
        </div>
    `;

    modal.innerHTML = modalContent;
    document.body.appendChild(modal);

    // Show the modal with animation
    setTimeout(() => {
        modal.classList.add("show");
    }, 100);

    // Automatically close the modal after 3 seconds
    setTimeout(() => {
        closeModal(modal);
    }, 3000);
}

function closeModal(modalElement) {
    if (modalElement && modalElement.classList.contains("custom-modal")) {
        modalElement.classList.remove("show");
        setTimeout(() => modalElement.remove(), 300); // Remove after transition
    } else {
        // For close button
        modalElement.closest(".custom-modal").classList.remove("show");
        setTimeout(() => modalElement.closest(".custom-modal").remove(), 300);
    }
}

async function loadMoreEvents() {
    if (isLoading || !hasMoreEvents) return;
    isLoading = true;

    try {
        console.log("Loading more events...");

        const response = await fetch("http://localhost:8080/events");
        if (!response.ok) {
            throw new Error("Failed to fetch events");
        }

        const data = await response.json();
        const { events, hasMore } = data;

        if (events.length > 0) {
            events.forEach(event => {
                const eventItem = `
                    <div class="event-item">
                        <h3>${event.name}</h3>
                        <p>Date: ${new Date(event.start_time).toLocaleDateString()} ${new Date(event.start_time).toLocaleTimeString()}</p>
                        <p><strong>Location:</strong> ${event.location}</p>
                        <p><strong>Organizer:</strong> ${event.organizer}</p>
                        <p>${event.description}</p>
                        <button class="register-button" onclick="registerEvent(${event.id})">Register</button>
                    </div>
                `;
                document.querySelector(".events-list").insertAdjacentHTML("beforeend", eventItem);
            });

            page++;
        }

        hasMoreEvents = hasMore;

        if (!hasMoreEvents) {
            document.getElementById("no-more-events").style.display = "block";
        }
    } catch (error) {
        console.error("Error loading events:", error);
    } finally {
        isLoading = false;
    }
}

window.addEventListener("scroll", () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
        loadMoreEvents();
    }
});

// Initial load
loadMoreEvents();
