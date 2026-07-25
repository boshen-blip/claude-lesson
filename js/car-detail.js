// Reads ?id= from the URL and renders the matching car's full details on car.html.

const CONTACT_EMAIL = "boshen.goh@gmail.com";
const WHATSAPP_NUMBER = "6583396593";

function formatPrice(price) {
  return price.toLocaleString("en-SG", { style: "currency", currency: "SGD", maximumFractionDigits: 0 });
}

function setMetaTag(attr, key, content) {
  let tag = document.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function updateHeadForCar(car) {
  const title = `${car.year} ${car.make} ${car.model} — Boshen Auto`;
  const description = `${car.year} ${car.make} ${car.model} for sale in Singapore at ${formatPrice(car.price)}. ${car.mileage.toLocaleString()} km, COE expires ${car.coeExpiry}. Vehicle no. ${car.plateNumber}.`;
  const url = `https://boshen-blip.github.io/claude-lesson/car.html?id=${car.id}`;

  document.title = title;
  setMetaTag("name", "description", description);
  setMetaTag("property", "og:type", "website");
  setMetaTag("property", "og:site_name", "Boshen Auto");
  setMetaTag("property", "og:title", title);
  setMetaTag("property", "og:description", description);
  setMetaTag("property", "og:url", url);
  setMetaTag("property", "og:image", car.image);
  setMetaTag("name", "twitter:card", "summary_large_image");
  setMetaTag("name", "twitter:title", title);
  setMetaTag("name", "twitter:description", description);
  setMetaTag("name", "twitter:image", car.image);

  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  canonical.setAttribute("href", url);

  const schema = document.createElement("script");
  schema.type = "application/ld+json";
  schema.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Vehicle",
    name: `${car.year} ${car.make} ${car.model}`,
    vehicleModelDate: String(car.year),
    manufacturer: car.make,
    model: car.model,
    mileageFromOdometer: { "@type": "QuantitativeValue", value: car.mileage, unitCode: "KMT" },
    vehicleTransmission: car.transmission,
    fuelType: car.fuel,
    color: car.color,
    image: car.image,
    offers: {
      "@type": "Offer",
      price: car.price,
      priceCurrency: "SGD",
      availability: "https://schema.org/InStock",
      url,
    },
  });
  document.head.appendChild(schema);
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

  updateHeadForCar(car);

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
          <tr><td>Vehicle No.</td><td><span class="plate-badge">${car.plateNumber}</span></td></tr>
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
