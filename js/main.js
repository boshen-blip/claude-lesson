// Renders the car grid on index.html and wires up the contact form.

const CONTACT_EMAIL = "boshen.goh@gmail.com";
const WHATSAPP_NUMBER = "6591234567"; // TODO: replace with your real WhatsApp number (65 + 8-digit SG number)

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
        <div class="car-card-meta">${car.bodyType} &middot; ${car.mileage.toLocaleString()} km &middot; ${car.transmission}</div>
        <div class="car-card-meta">COE expires ${car.coeExpiry}</div>
        <div class="car-card-price">${formatPrice(car.price)}</div>
        <div class="car-card-cta">View Details &rarr;</div>
      </div>
    </a>
  `).join("");
}

function wireContactForm() {
  const form = document.getElementById("contact-form");
  const note = document.getElementById("contact-note");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    const subject = `Website inquiry from ${name}`;
    const body = `${message}\n\n— ${name} (${email})`;
    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
    note.textContent = "Opening your email client to send this message...";
  });
}

function wireWhatsappLink() {
  const link = document.getElementById("whatsapp-link");
  if (!link) return;
  const text = encodeURIComponent("Hi, I'm interested in one of your cars listed on the Boshen Auto website.");
  link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

renderCarGrid();
wireContactForm();
wireWhatsappLink();
