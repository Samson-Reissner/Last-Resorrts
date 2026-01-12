const chatMessages = document.getElementById("chatMessages");
const userMessageInput = document.getElementById("userMessage");

// TEMP BACKEND ENDPOINT (replace later)
const API_URL = "http://localhost:3000/api/messages";

function sendMessage() {
    const message = userMessageInput.value.trim();
    if (!message) return;

    // Show message instantly on UI
    addMessage("You", message);

    // Clear input
    userMessageInput.value = "";

    // Send to backend (standby)
    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            sender: "customer",
            message: message
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log("Message sent:", data);
    })
    .catch(err => {
        console.error("Backend not connected yet:", err);
    });
}

function addMessage(sender, message) {
    const div = document.createElement("div");
    div.classList.add("message");

    div.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatMessages.appendChild(div);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}
