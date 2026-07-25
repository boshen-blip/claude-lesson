// Reads ?id= from the URL and renders the matching car's full details on car.html.

const CONTACT_EMAIL = "contact@boshenauto.com"; // TODO: replace with your real email
const WHATSAPP_NUMBER = "6591234567"; // TODO: replace with your real WhatsApp number (65 + 8-digit SG number)

function formatPrice(price) {
  return price.toLocaleString("en-SG", { style: "currency", currency: "SGD", maximumFractionDigits: 0 });
}

function renderCarDetail() {
  const container = document.getElementById("car-detail");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));
  const car = CARS.find((c) => c.id === id);

  if (!car) {
    container.innerHTML = `
      <div class="not-found">
        <h2>Car Not Found</h2>
        <p>We couldn't find a car matching that listing. It may have been sold or the link is incorrect.</p>
        <a href="index.html#inventory" class="btn btn-primary">Back to Inventory</a>
      </div>
    `;
    return;
  }

  document.title = `${car.year} ${car.make} ${car.model} — Boshen Auto`;

  const subject = `Inquiry about ${car.year} ${car.make} ${car.model}`;
  const body = `Hi, I'm interested in the ${car.year} ${car.make} ${car.model} (${formatPrice(car.price)}) listed on your site.`;
  const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const whatsappText = encodeURIComponent(`Hi, I'm interested in the ${car.year} ${car.make} ${car.model} (${car.plateNumber}) listed at ${formatPrice(car.price)}.`);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`;

  container.innerHTML = `
    <div class="car-detail-grid">
      <div>
        <img src="${car.image}" alt="${car.year} ${car.make} ${car.model}" />
        ${car.imageCredit ? `<p class="image-credit">Photo: <a href="${car.imageCreditUrl}" target="_blank" rel="noopener">${car.imageCredit}</a></p>` : ""}
      </div>
      <div>
        ${car.featured ? '<span class="featured-badge">Featured</span>' : ""}
        <h1 class="car-detail-title">${car.year} ${car.make} ${car.model}</h1>
        <div class="car-detail-price">${formatPrice(car.price)}</div>
        <table class="spec-table">
          <tr><td>Vehicle No.</td><td>${car.plateNumber}</td></tr>
          <tr><td>COE Expiry</td><td>${car.coeExpiry}</td></tr>
          <tr><td>Body Type</td><td>${car.bodyType}</td></tr>
          <tr><td>Mileage</td><td>${car.mileage.toLocaleString()} km</td></tr>
          <tr><td>Transmission</td><td>${car.transmission}</td></tr>
          <tr><td>Fuel</td><td>${car.fuel}</td></tr>
          <tr><td>Color</td><td>${car.color}</td></tr>
        </table>
        <p class="car-detail-description">${car.description}</p>
        <div class="detail-cta-row">
          <a href="${mailtoUrl}" class="btn btn-primary">Email Us</a>
          <a href="${whatsappUrl}" class="btn btn-whatsapp" target="_blank" rel="noopener">WhatsApp Us</a>
        </div>
      </div>
    </div>
  `;
}

renderCarDetail();
