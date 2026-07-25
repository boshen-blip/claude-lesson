// Floating WhatsApp widget shown on every page. Reads WHATSAPP_NUMBER from
// the page's main script (main.js / car-detail.js), which is loaded first.

const WHATSAPP_SUGGESTIONS = [
  "Is this car still available?",
  "Can I schedule a viewing?",
  "What's your best price?",
  "Do you offer financing options?",
];

function buildWhatsappLink(text) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

function renderWhatsappWidget() {
  const widget = document.createElement("div");
  widget.className = "whatsapp-widget";
  widget.innerHTML = `
    <div class="whatsapp-popup" id="whatsapp-popup" hidden>
      <div class="whatsapp-popup-header">
        <span>Chat with Boshen Auto</span>
        <button type="button" class="whatsapp-popup-close" aria-label="Close">&times;</button>
      </div>
      <p class="whatsapp-popup-sub">Pick a question to start on WhatsApp, or write your own.</p>
      <div class="whatsapp-suggestions">
        ${WHATSAPP_SUGGESTIONS.map((q) => `<a class="whatsapp-suggestion-btn" href="${buildWhatsappLink(q)}" target="_blank" rel="noopener">${q}</a>`).join("")}
      </div>
      <a class="whatsapp-suggestion-btn whatsapp-suggestion-btn-custom" href="${buildWhatsappLink("Hi, I have a question about a car on your website.")}" target="_blank" rel="noopener">Write your own message &rarr;</a>
    </div>
    <button type="button" class="whatsapp-fab" id="whatsapp-fab" aria-haspopup="true" aria-expanded="false" aria-label="Chat with us on WhatsApp">
      <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true" focusable="false">
        <path fill="currentColor" d="M16.02 3C9.4 3 4 8.4 4 15.02c0 2.35.62 4.55 1.7 6.46L4 29l7.72-1.63a12.9 12.9 0 0 0 4.3.74c6.62 0 12.02-5.4 12.02-12.02C28.04 8.4 22.64 3 16.02 3zm0 21.9a9.85 9.85 0 0 1-5.02-1.38l-.36-.21-4.35.92.93-4.24-.24-.37a9.86 9.86 0 0 1-1.52-5.3c0-5.46 4.44-9.9 9.9-9.9 5.46 0 9.9 4.44 9.9 9.9 0 5.46-4.44 9.9-9.9 9.9zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.93 1.17-.17.2-.34.22-.64.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.48-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.34.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.91-2.19-.24-.57-.48-.5-.66-.5-.17 0-.37-.02-.57-.02-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.47 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.35.2 1.86.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35z"/>
      </svg>
    </button>
  `;
  document.body.appendChild(widget);

  const fab = document.getElementById("whatsapp-fab");
  const popup = document.getElementById("whatsapp-popup");
  const closeBtn = widget.querySelector(".whatsapp-popup-close");

  function setOpen(open) {
    popup.hidden = !open;
    fab.setAttribute("aria-expanded", String(open));
    widget.classList.toggle("whatsapp-widget-open", open);
  }

  fab.addEventListener("click", () => setOpen(popup.hidden));
  closeBtn.addEventListener("click", () => setOpen(false));

  document.addEventListener("click", (event) => {
    if (!widget.contains(event.target)) setOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });
}

renderWhatsappWidget();
