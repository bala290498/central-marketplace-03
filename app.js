let allOffers = [];
let userLocation = null;
let userAreaLabel = "";
let selectedCategory = "";

const statusEl = document.getElementById("status");
const offersEl = document.getElementById("offers");
const locationButton = document.getElementById("locationButton");
const locationFilter = document.getElementById("locationFilter");
const distanceFilter = document.getElementById("distanceFilter");
const categoriesEl = document.getElementById("categories");
const headlineEl = document.getElementById("headline");

function offerArea(offer) { return offer.location || offer.area || ""; }
function offerCategory(offer) { return offer.category || ""; }
function displayedKm(km) { return Math.round(Number(km) || 0); }
function distanceLabel(km) { return displayedKm(km) + "+ km away"; }

function categoryIcon(name) {
  const icons = {
    "All Deals": "✦", "Dining & Cafes": "🍽", "Salon & Spa": "✂", "Grocery": "🛒",
    "Fashion": "👗", "Electronics": "📱", "Fitness": "💪", "Pharmacy": "💊",
    "Entertainment": "🎬", "Auto Care": "🚗", "Home & Living": "🏠"
  };
  return icons[name] || "●";
}

function fillLocationFilter() {
  const current = locationFilter.value;
  const areas = [...new Set(allOffers.map(offerArea).filter(Boolean))].sort();
  locationFilter.innerHTML = '<option value="">All locations</option>' +
    areas.map(area => `<option value="${escapeAttribute(area)}">${escapeHtml(area)}</option>`).join("");
  if (areas.includes(current)) locationFilter.value = current;
}

function fillCategories() {
  const cats = [...new Set(allOffers.map(offerCategory).filter(Boolean))];
  const items = ["All Deals"].concat(cats);
  categoriesEl.innerHTML = items.map((name, index) => {
    const value = index === 0 ? "" : name;
    const active = selectedCategory === value ? " active" : "";
    return `<button type="button" class="chip${active}" data-category="${escapeAttribute(value)}"><span class="chip-icon">${categoryIcon(name)}</span><span>${escapeHtml(name)}</span></button>`;
  }).join("");
}

async function loadOffers() {
  try {
    const response = await fetch("./offers.json", { cache: "no-store" });
    if (!response.ok) throw new Error("Could not load offers.json");
    allOffers = await response.json();
    fillLocationFilter();
    fillCategories();
    renderOffers();
  } catch (error) {
    statusEl.textContent = "Could not load offers. Please check offers.json.";
    fillCategories();
    console.error(error);
  }
}

function distanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function directionsUrl(offer) {
  const origin = userLocation.latitude + "," + userLocation.longitude;
  const destination = Number(offer.latitude) + "," + Number(offer.longitude);
  return "https://www.google.com/maps/dir/?api=1&origin=" +
    encodeURIComponent(origin) + "&destination=" + encodeURIComponent(destination) +
    "&travelmode=driving";
}

function renderOffers() {
  const selectedArea = locationFilter.value;
  const maxDisplayedKm = Number(distanceFilter.value);
  let nearby = allOffers.filter(offer => {
    const areaOk = !selectedArea || offerArea(offer) === selectedArea;
    const catOk = !selectedCategory || offerCategory(offer) === selectedCategory;
    return areaOk && catOk;
  });
  if (userLocation) {
    nearby = nearby.map(offer => ({
      ...offer,
      distance: distanceKm(userLocation.latitude, userLocation.longitude, Number(offer.latitude), Number(offer.longitude))
    })).sort((a, b) => a.distance - b.distance);
    if (maxDisplayedKm) nearby = nearby.filter(offer => displayedKm(offer.distance) <= maxDisplayedKm);
    if (headlineEl) headlineEl.textContent = "Exclusive discounts verified near you";
  }
  if (!nearby.length) {
    offersEl.innerHTML = '<div class="empty">No offers found.</div>';
    return;
  }
  offersEl.innerHTML = nearby.map(offer => {
    const badge = offer.badge || offer.dealType || "";
    const business = offer.business || offer.store || offer.merchant || "";
    const ends = offer.validity || offer.ends || offer.expiry || "";
    const badgeTone = Math.abs(String(offer.id || badge || offer.title).split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0)) % 13;
    return `
    <article class="offer">
      <div class="offer-brand">
        ${badge ? `<span class="badge c${badgeTone}">${escapeHtml(badge)}</span>` : ""}
        ${business ? `<span class="business">${escapeHtml(business)}</span>` : ""}
      </div>
      <h2>${escapeHtml(offer.title)}</h2>
      <p class="desc">${escapeHtml(offer.description || "")}</p>
      <div class="offer-meta">
        <span class="area">${offerArea(offer) ? "↗ " + escapeHtml(offerArea(offer)) : "—"}</span>
        <span class="distance">${userLocation ? distanceLabel(offer.distance) : "km"}</span>
        <span class="ends">${ends ? escapeHtml(ends) : "—"}</span>
      </div>
      <p class="confirm-note">*call and confirm the deal before visit</p>
      <div class="actions">
        ${offer.phone ? `<a class="call-link" href="tel:${escapeAttribute(String(offer.phone).replaceAll(" ", ""))}">Call</a>` : "<span></span>"}
        <a class="map-link" href="${escapeAttribute(userLocation ? directionsUrl(offer) : (offer.mapUrl || "#"))}" target="_blank" rel="noopener noreferrer">Maps</a>
        <button type="button" class="share-btn"
          data-title="${escapeAttribute(offer.title || "")}"
          data-business="${escapeAttribute(business)}"
          data-description="${escapeAttribute(offer.description || "")}"
          data-validity="${escapeAttribute(ends)}"
          data-location="${escapeAttribute(offerArea(offer))}"
          data-phone="${escapeAttribute(offer.phone || "")}"
          data-map="${escapeAttribute(userLocation ? directionsUrl(offer) : (offer.mapUrl || ""))}">Share</button>
      </div>
    </article>`;
  }).join("");
}

function setLocationButton(label) {
  const hasArea = !!(label && label !== "Allow location" && label !== "Locating...");
  locationButton.classList.toggle("detected", hasArea);
  locationButton.textContent = hasArea ? ("📍 " + label) : (label || "Allow location");
  locationButton.title = label || "Allow location";
}

function formatAddress(address) {
  if (!address) return "";
  return address.suburb || address.neighbourhood || address.quarter ||
    address.village || address.town || address.city_district || address.city || "";
}

async function lookupUserArea(latitude, longitude) {
  try {
    const osmUrl = "https://nominatim.openstreetmap.org/reverse?format=jsonv2&zoom=16&addressdetails=1&lat=" +
      encodeURIComponent(latitude) + "&lon=" + encodeURIComponent(longitude);
    const osmResponse = await fetch(osmUrl, { headers: { Accept: "application/json" } });
    if (!osmResponse.ok) throw new Error("lookup failed");
    const data = await osmResponse.json();
    userAreaLabel = formatAddress(data.address);
  } catch (error) {
    try {
      const backup = await (await fetch("https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=" +
        encodeURIComponent(latitude) + "&longitude=" + encodeURIComponent(longitude) + "&localityLanguage=en")).json();
      userAreaLabel = backup.locality || backup.city || backup.principalSubdivision || "";
    } catch (backupError) {
      userAreaLabel = "";
    }
  }
  setLocationButton(userAreaLabel || "Allow location");
}

function detectLocation() {
  if (!navigator.geolocation) {
    setLocationButton("Allow location");
    return;
  }
  setLocationButton("Locating...");
  navigator.geolocation.getCurrentPosition(
    position => {
      userLocation = { latitude: position.coords.latitude, longitude: position.coords.longitude };
      renderOffers();
      lookupUserArea(userLocation.latitude, userLocation.longitude);
    },
    () => setLocationButton("Allow location"),
    { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 }
  );
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}
function escapeAttribute(value) { return escapeHtml(value); }

offersEl.addEventListener("click", async event => {
  const button = event.target.closest(".share-btn");
  if (!button) return;
  const title = button.getAttribute("data-title") || "Deal";
  const business = button.getAttribute("data-business") || "";
  const description = button.getAttribute("data-description") || "";
  const validity = button.getAttribute("data-validity") || "";
  const location = button.getAttribute("data-location") || "";
  const phone = button.getAttribute("data-phone") || "";
  const map = button.getAttribute("data-map") || "";
  const shareText = [
    business ? "*" + business + "*" : "",
    "*" + title + "*",
    description,
    validity ? "Validity: " + validity : "",
    "",
    location ? "Location: " + location : "",
    phone ? "Call: " + phone : "",
    "_call and confirm the deal before visit_",
    "",
    "Map: " + (map || ""),
    "",
    "For more deals visit: centralmarketplace.in"
  ].join("\n");
  try {
    if (navigator.share) await navigator.share({ title, text: shareText });
    else if (navigator.clipboard) await navigator.clipboard.writeText(shareText);
  } catch (error) {
    if (error && error.name !== "AbortError") console.error(error);
  }
});

const chromeBar = document.getElementById("chrome");
const menuButton = document.getElementById("menuButton");
const siteNav = document.getElementById("siteNav");
const navBackdrop = document.getElementById("navBackdrop");
const navClose = document.getElementById("navClose");
function setMenuOpen(open) {
  siteNav.classList.toggle("open", open);
  if (navBackdrop) navBackdrop.classList.toggle("open", open);
  document.body.style.overflow = open ? "hidden" : "";
}
menuButton.addEventListener("click", () => setMenuOpen(!siteNav.classList.contains("open")));
if (navClose) navClose.addEventListener("click", () => setMenuOpen(false));
if (navBackdrop) navBackdrop.addEventListener("click", () => setMenuOpen(false));
let lastScrollY = window.scrollY || 0;
window.addEventListener("scroll", () => {
  const y = window.scrollY || 0;
  const delta = y - lastScrollY;
  if (Math.abs(delta) < 12) return;
  if (delta > 0 && y > 80) {
    chromeBar.classList.add("compact");
    setMenuOpen(false);
  } else if (delta < 0) {
    chromeBar.classList.remove("compact");
  }
  lastScrollY = y;
}, { passive: true });

locationButton.addEventListener("click", detectLocation);
locationFilter.addEventListener("change", renderOffers);
distanceFilter.addEventListener("change", renderOffers);
categoriesEl.addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  selectedCategory = button.getAttribute("data-category") || "";
  fillCategories();
  renderOffers();
});

loadOffers();
detectLocation();
