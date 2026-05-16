document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 1000,
  });
});

const form = document.querySelector("form");
const button = document.querySelector("button");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const originalText = button.textContent;

  button.disabled = true;
  button.textContent = "Sending...";

  const name = e.target[0].value;
  const email = e.target[1].value;
  const message = e.target[2].value;

  try {
    const res = await fetch(`${API_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, message })
    });

    let data;
    try {
      data = await res.json();
    } catch {
      data = null;
    }

    console.log("STATUS:", res.status);
    console.log("RESPONSE:", data);

    if (res.ok) {
      alert("Message sent!");
      form.reset();
    } else {
      alert("Error sending message.");
    }

  } catch (err) {
    console.error("NETWORK ERROR:", err);
    alert("Network error. Try again.");
  } finally {
    button.disabled = false;
    button.textContent = originalText;
  }
});