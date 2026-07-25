// Renders the car grid on index.html and wires up the contact form.

const CONTACT_EMAIL = "boshen.goh@gmail.com";
const WHATSAPP_NUMBER = "6583396593";

function speak(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
}

function formatPrice(price) {
  return price.toLocaleString("en-SG", { style: "currency", currency: "SGD", maximumFractionDigits: 0 });
}

function renderCarGrid() {
  const grid = document.getElementById("car-grid");
  if (!grid) return;

  grid.innerHTML = CARS.map((car) => `
    <a class="car-card" href="car.html?id=${car.id}">
      <img src="${car.image}" alt="${car.year} ${car.make} ${car.model}" loading="lazy" />
      <div class="car-card-body">
        ${car.featured ? '<span class="featured-badge">Featured</span>' : ""}
        <div class="car-card-title">${car.year} ${car.make} ${car.model}</div>
        <div class="car-card-meta car-card-plate"><span class="plate-badge">${car.plateNumber}</span></div>
        <div class="car-card-meta">${car.bodyType} &middot; ${car.mileage.toLocaleString()} km &middot; ${car.transmission}</div>
        <div class="car-card-meta">COE expires ${car.coeExpiry}</div>
        <div class="car-card-price">${formatPrice(car.price)}</div>
        <div class="car-card-cta">View Details &rarr;</div>
      </div>
    </a>
  `).join("");
}

function validateContactForm(form) {
  const fields = [
    { input: form.name, label: "Name", check: (v) => v.length > 0 },
    { input: form.email, label: "Email", check: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
    { input: form.message, label: "Message", check: (v) => v.length > 0 },
  ];

  let firstInvalid = null;
  for (const field of fields) {
    const value = field.input.value.trim();
    const valid = field.check(value);
    field.input.classList.toggle("invalid", !valid);
    if (!valid && !firstInvalid) firstInvalid = field;
  }

  if (firstInvalid) {
    firstInvalid.input.focus();
    return firstInvalid.label === "Email" && firstInvalid.input.value.trim().length > 0
      ? "Please enter a valid email address."
      : `Please fill in your ${firstInvalid.label.toLowerCase()}.`;
  }
  return null;
}

function wireContactForm() {
  const form = document.getElementById("contact-form");
  const note = document.getElementById("contact-note");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const validationError = validateContactForm(form);
    if (validationError) {
      note.textContent = validationError;
      return;
    }

    const submitButton = form.querySelector("button[type=submit]");
    submitButton.disabled = true;
    note.textContent = "Sending...";

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name.value.trim(),
          email: form.email.value.trim(),
          message: form.message.value.trim(),
          _subject: "New website inquiry - Boshen Auto",
        }),
      });

      if (!response.ok) throw new Error("Request failed");

      const data = await response.json();
      if (data.success === "false") throw new Error(data.message || "Request failed");

      note.textContent = "Thanks! Your message has been sent — we'll get back to you soon.";
      speak("Thank you for your submission. We will get back in 3 business days.");
      form.reset();
    } catch (err) {
      note.textContent = "Sorry, something went wrong. Please try WhatsApp instead.";
    } finally {
      submitButton.disabled = false;
    }
  });
}

function wireWhatsappLink() {
  const link = document.getElementById("whatsapp-link");
  if (!link) return;
  const text = encodeURIComponent("Hi, I'm interested in one of your cars listed on the Boshen Auto website.");
  link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

function wireChecklistWhatsappLink() {
  const link = document.getElementById("checklist-whatsapp-link");
  if (!link) return;
  const text = encodeURIComponent("Hi, could you walk me through the 10-point buying checklist for one of your cars?");
  link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

renderCarGrid();
wireContactForm();
wireWhatsappLink();
wireChecklistWhatsappLink();
