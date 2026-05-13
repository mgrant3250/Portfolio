document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 1000,
  });
});

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = e.target[0].value;
  const email = e.target[1].value;
  const message = e.target[2].value;

  const res = await fetch(`${API_URL}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, message })
  });

  const data = await res.json();
  console.log("STATUS:", res.status);
  console.log("RESPONSE:", data);

  if (res.ok) {
    alert("Message sent!");
  } else {
    alert("Error sending message.");
  }
});