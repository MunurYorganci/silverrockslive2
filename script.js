// script.js (ES module)
import { MENUS, CATEGORY_LABELS } from "./data/menu.js";

// -----------------------------
// PAGE MODE
// -----------------------------
const pageMenuType = (document.body.dataset.menu || "restaurant").toLowerCase();
const menuConfig = MENUS[pageMenuType] || MENUS.restaurant;
let currentLang = localStorage.getItem("lang") || "en";

function getActiveMenuItems(lang) {
  if (menuConfig.itemsByLang) {
    return [...(menuConfig.itemsByLang[lang] || menuConfig.itemsByLang.en || [])];
  }

  return [...(menuConfig.items || [])];
}

let items = getActiveMenuItems(currentLang);

// -----------------------------
// STATE
// -----------------------------
let searchQuery = "";
let isProgrammaticScroll = false;

let sectionEls = [];
let rafPending = false;

let activeModalItemId = null;
let lastFocusedEl = null;

// -----------------------------
// DOM
// -----------------------------
const chipStrip = document.getElementById("chipStrip");
const searchInput = document.getElementById("searchInput");
const menuGrid = document.getElementById("menuGrid");
const emptyState = document.getElementById("emptyState");
const resultsTitle = document.getElementById("resultsTitle");
const resultsCount = document.getElementById("resultsCount");

const topbarEl = document.querySelector(".topbar");
const chipsRowEl = document.querySelector(".controls-row");
const stickyHeaderEl = document.querySelector(".sticky-header");

// Menu type switcher
const menuTypeToggle = document.getElementById("menuTypeToggle");
const menuTypeDropdown = document.getElementById("menuTypeDropdown");

// Info modal DOM
const infoModal = document.getElementById("infoModal");
const infoCloseBtn = document.getElementById("infoCloseBtn");
const moreInfoBtn = document.getElementById("moreInfoBtn");

// Side menu DOM
const hamburgerBtn = document.getElementById("hamburgerBtn");
const sideMenu = document.getElementById("sideMenu");
const sideMenuOverlay = document.getElementById("sideMenuOverlay");
const sideMenuCloseBtn = document.getElementById("sideMenuCloseBtn");

// -----------------------------
// HELPERS
// -----------------------------
function escapeHtml(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function slugify(str) {
  return String(str ?? "")
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function tItem(item, field) {
  return item?.[field]?.[currentLang] || item?.[field]?.en || "";
}

function tCategory(category) {
  const translated = CATEGORY_LABELS[category];
  if (!translated) return category;
  return translated[currentLang] || translated.en || category;
}

function uniqueCategories(list) {
  return [...new Set(list.map(i => i.category))];
}

function setHeader(categoryName, totalCount) {
  const dict = I18N[currentLang] || I18N.en;
  resultsTitle.textContent = categoryName === "All" ? dict.all : tCategory(categoryName || "All");
  resultsCount.textContent = `${totalCount} ${dict.itemsSuffix}`;
}

function setSelectedChip(targetId) {
  chipStrip.querySelectorAll(".chip").forEach(c => {
    c.classList.toggle("selected", c.dataset.target === targetId);
  });

  const selected = chipStrip.querySelector(`.chip[data-target="${CSS.escape(targetId)}"]`);
  selected?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
}

function getStickyTotal() {
  const topbarH = topbarEl ? topbarEl.getBoundingClientRect().height : 56;
  const chipsH = chipsRowEl ? chipsRowEl.getBoundingClientRect().height : 72;
  const headerH = stickyHeaderEl ? stickyHeaderEl.getBoundingClientRect().height : 54;
  return { topbarH, chipsH, headerH, stickyTotal: topbarH + chipsH + headerH };
}

function updateStickyVars() {
  const { topbarH, chipsH, headerH, stickyTotal } = getStickyTotal();
  document.documentElement.style.setProperty("--topbarH", `${Math.round(topbarH)}px`);
  document.documentElement.style.setProperty("--chipsH", `${Math.round(chipsH)}px`);
  document.documentElement.style.setProperty("--headerH", `${Math.round(headerH)}px`);
  document.documentElement.style.setProperty("--stickyTotal", `${Math.round(stickyTotal)}px`);
}

// -----------------------------
// MENU TYPE DROPDOWN
// -----------------------------
function openMenuType() {
  menuTypeDropdown?.classList.add("active");
  menuTypeToggle?.setAttribute("aria-expanded", "true");
}

function closeMenuType() {
  menuTypeDropdown?.classList.remove("active");
  menuTypeToggle?.setAttribute("aria-expanded", "false");
}

menuTypeToggle?.addEventListener("click", (e) => {
  e.stopPropagation();
  menuTypeDropdown.classList.contains("active") ? closeMenuType() : openMenuType();
});

document.addEventListener("click", () => closeMenuType());
menuTypeDropdown?.addEventListener("click", (e) => e.stopPropagation());

// Mark active menu link with aria-current
(function markActiveMenuLink() {
  document.querySelectorAll("[data-menu-link]").forEach(link => {
    const isCurrent = link.dataset.menuLink === pageMenuType;

    if (isCurrent) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
})();

// -----------------------------
// SEARCH
// -----------------------------
function getSearchFilteredItems() {
  const q = searchQuery.trim().toLowerCase();
  if (!q) return [...items];

  return items.filter(i => {
    const nameEn = (i.name?.en || "").toLowerCase();
    const descEn = (i.desc?.en || "").toLowerCase();
    const nameTr = (i.name?.tr || "").toLowerCase();
    const descTr = (i.desc?.tr || "").toLowerCase();
    const cat = (i.category || "").toLowerCase();

    return (
      nameEn.includes(q) ||
      descEn.includes(q) ||
      nameTr.includes(q) ||
      descTr.includes(q) ||
      cat.includes(q)
    );
  });
}

// -----------------------------
// CHIPS
// -----------------------------
function renderChips(categories) {
  chipStrip.innerHTML = "";

  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "chip";
    btn.type = "button";
    btn.dataset.target = slugify(cat);
    btn.textContent = tCategory(cat);
    chipStrip.appendChild(btn);
  });

  chipStrip.querySelectorAll(".chip").forEach(chip => {
    chip.addEventListener("click", () => {
      const targetId = chip.dataset.target;
      const section = document.getElementById(targetId);
      if (!section) return;

      setSelectedChip(targetId);

      isProgrammaticScroll = true;
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => (isProgrammaticScroll = false), 650);
    });
  });
}

// -----------------------------
// RENDER
// -----------------------------
function render() {
  const filtered = getSearchFilteredItems();

  emptyState.hidden = filtered.length !== 0;
  menuGrid.innerHTML = "";

  const cats = uniqueCategories(items);
  renderChips(cats);

  const grouped = new Map();
  cats.forEach(cat => grouped.set(cat, []));

  filtered.forEach(it => {
    if (!grouped.has(it.category)) grouped.set(it.category, []);
    grouped.get(it.category).push(it);
  });

  let totalShown = 0;

  cats.forEach(cat => {
    const sectionItems = grouped.get(cat) || [];
    if (sectionItems.length === 0) return;

    totalShown += sectionItems.length;

    const sectionId = slugify(cat);

    const section = document.createElement("section");
    section.className = "menu-section";
    section.id = sectionId;
    section.dataset.category = cat;

    section.innerHTML = `
      <div class="section-title">${escapeHtml(tCategory(cat))}</div>
      <div class="menu-grid">
        ${sectionItems.map(i => {
          const shownName = tItem(i, "name");
          const shownDesc = tItem(i, "desc");
          const imgOk = i.image && i.image.trim() !== "";

          return `
          <div class="card" data-open="${escapeHtml(String(i.id))}" role="button" tabindex="0" aria-label="${escapeHtml(shownName)}">
            <div class="card-left">
              <div class="item-name">${escapeHtml(shownName)}</div>
              <div class="item-desc">${escapeHtml(shownDesc || "")}</div>
            </div>

            <div class="card-right">
              ${imgOk ? `
                <div class="thumb">
                  <img src="${escapeHtml(i.image)}" alt="${escapeHtml(shownName)}" loading="lazy">
                </div>
              ` : ""}
              <div class="price">${escapeHtml(i.price)}</div>
            </div>
          </div>`;
        }).join("")}
      </div>
    `;

    menuGrid.appendChild(section);
  });

  sectionEls = Array.from(document.querySelectorAll(".menu-section"));

  setHeader("All", totalShown);
  updateStickyVars();
  handleScrollSpy(true);
}

// -----------------------------
// SCROLLSPY
// -----------------------------
function handleScrollSpy(force = false) {
  if (isProgrammaticScroll && !force) return;
  if (!sectionEls.length) return;

  const { stickyTotal } = getStickyTotal();
  const anchorY = stickyTotal + 14;

  let best = sectionEls[0];
  let bestScore = Infinity;

  for (const sec of sectionEls) {
    const rect = sec.getBoundingClientRect();
    const dist = Math.abs(rect.top - anchorY);
    const passed = (rect.top - anchorY) <= 0;
    const score = passed ? dist : dist + 99999;

    if (score < bestScore) {
      bestScore = score;
      best = sec;
    }
  }

  setSelectedChip(best.id);
  setHeader(best.dataset.category || "All", getSearchFilteredItems().length);
}

function onScroll() {
  if (rafPending) return;

  rafPending = true;
  requestAnimationFrame(() => {
    rafPending = false;
    handleScrollSpy(false);
  });
}

window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", () => {
  updateStickyVars();
  handleScrollSpy(true);
});

// -----------------------------
// ITEM MODAL
// -----------------------------
const itemModal = document.getElementById("itemModal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalSub = document.getElementById("modalSub");
const modalPrice = document.getElementById("modalPrice");
const modalCategoryBadge = document.getElementById("modalCategoryBadge");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const modalShareBtn = document.getElementById("modalShareBtn");

function findItemById(id) {
  return items.find(x => String(x.id) === String(id));
}

menuGrid.addEventListener("click", (e) => {
  const card = e.target.closest("[data-open]");
  if (!card) return;
  openItemModal(card.getAttribute("data-open"));
});

menuGrid.addEventListener("keydown", (e) => {
  if (e.key !== "Enter" && e.key !== " ") return;
  const card = e.target.closest("[data-open]");
  if (!card) return;
  e.preventDefault();
  openItemModal(card.getAttribute("data-open"));
});

function openItemModal(id) {
  const item = findItemById(id);
  if (!item) return;

  activeModalItemId = String(id);
  lastFocusedEl = document.activeElement;

  modalTitle.textContent = tItem(item, "name");
  modalSub.textContent = tItem(item, "desc");
  modalPrice.textContent = item.price || "";
  modalCategoryBadge.textContent = tCategory(item.category || "");

  const imgOk = item.image && item.image.trim() !== "";
  if (imgOk) {
    modalImg.src = item.image;
    modalImg.alt = tItem(item, "name") || "Menu item";
    modalImg.hidden = false;
  } else {
    modalImg.removeAttribute("src");
    modalImg.alt = "";
    modalImg.hidden = true;
  }

  itemModal.classList.add("open");
  itemModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  modalCloseBtn.focus();
}

function refreshOpenModalText() {
  if (!activeModalItemId) return;
  const item = findItemById(activeModalItemId);
  if (!item) return;

  modalTitle.textContent = tItem(item, "name");
  modalSub.textContent = tItem(item, "desc");
  modalCategoryBadge.textContent = tCategory(item.category || "");
  if (item.image && item.image.trim() !== "") {
    modalImg.alt = tItem(item, "name") || "Menu item";
  }
}

function closeItemModal() {
  itemModal.classList.remove("open");
  itemModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  activeModalItemId = null;

  if (lastFocusedEl && typeof lastFocusedEl.focus === "function") {
    lastFocusedEl.focus();
  }
}

modalCloseBtn?.addEventListener("click", closeItemModal);

itemModal?.addEventListener("click", (e) => {
  if (e.target === itemModal) closeItemModal();
});

modalShareBtn?.addEventListener("click", async () => {
  if (!activeModalItemId) return;
  const item = findItemById(activeModalItemId);
  if (!item) return;

  const name = tItem(item, "name");
  const shareText = `${name} - ${item.price}`;

  try {
    if (navigator.share) {
      await navigator.share({ title: name, text: shareText, url: location.href });
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareText);
      alert(currentLang === "tr" ? "Panoya kopyalandı ✅" : "Copied to clipboard ✅");
    }
  } catch {
    // user cancelled or permission denied
  }
});

// -----------------------------
// INFO MODAL
// -----------------------------
function openInfoModal() {
  if (!infoModal) return;
  infoModal.classList.add("open");
  infoModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  infoCloseBtn?.focus();
}

function closeInfoModal() {
  if (!infoModal) return;
  infoModal.classList.remove("open");
  infoModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  if (lastFocusedEl && typeof lastFocusedEl.focus === "function") {
    lastFocusedEl.focus();
  }
}

moreInfoBtn?.addEventListener("click", () => {
  lastFocusedEl = document.activeElement;
  openInfoModal();
});

moreInfoBtn?.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    lastFocusedEl = document.activeElement;
    openInfoModal();
  }
});

infoCloseBtn?.addEventListener("click", closeInfoModal);

infoModal?.addEventListener("click", (e) => {
  if (e.target === infoModal) closeInfoModal();
});

// -----------------------------
// SIDE MENU
// -----------------------------
function openSideMenu() {
  if (!sideMenu || !sideMenuOverlay) return;

  lastFocusedEl = document.activeElement;
  sideMenu.classList.add("open");
  sideMenuOverlay.classList.add("open");
  sideMenu.setAttribute("aria-hidden", "false");
  sideMenuOverlay.setAttribute("aria-hidden", "false");
  hamburgerBtn?.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
  sideMenuCloseBtn?.focus();
}

function closeSideMenu() {
  if (!sideMenu || !sideMenuOverlay) return;

  sideMenu.classList.remove("open");
  sideMenuOverlay.classList.remove("open");
  sideMenu.setAttribute("aria-hidden", "true");
  sideMenuOverlay.setAttribute("aria-hidden", "true");
  hamburgerBtn?.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";

  if (lastFocusedEl && typeof lastFocusedEl.focus === "function") {
    lastFocusedEl.focus();
  }
}

hamburgerBtn?.addEventListener("click", () => {
  if (sideMenu?.classList.contains("open")) {
    closeSideMenu();
  } else {
    openSideMenu();
  }
});

hamburgerBtn?.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    if (sideMenu?.classList.contains("open")) {
      closeSideMenu();
    } else {
      openSideMenu();
    }
  }
});

sideMenuCloseBtn?.addEventListener("click", closeSideMenu);
sideMenuOverlay?.addEventListener("click", closeSideMenu);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && itemModal?.classList.contains("open")) closeItemModal();
  if (e.key === "Escape" && infoModal?.classList.contains("open")) closeInfoModal();
  if (e.key === "Escape" && sideMenu?.classList.contains("open")) closeSideMenu();
});


// -----------------------------
// SEARCH INPUT
// -----------------------------
searchInput?.addEventListener("input", (e) => {
  searchQuery = e.target.value;
  render();
});

// -----------------------------
// LANGUAGE SWITCHER
// -----------------------------
const I18N = {
  en: {
    moreInfo: "More Info",
    search: "Search",
    langLabel: "English",
    restaurant: "Restaurant",
    cafe: "Cafe",
    pool: "Pool",
    restaurantMenu: "Restaurant Menu",
    cafeMenu: "Cafe Menu",
    poolMenu: "Pool Menu",
    all: "All",
    itemsSuffix: "item(s)",
    emptyState: "No items found.",
    addressLabel: "Address",
    phoneLabel: "Phone",
    hoursLabel: "Opening Hours",
    restaurantTitle: "Silver Rocks Restaurant & Bar",
    navMenu: "Menu",
    navHome: "Home",
    navRestaurantMenu: "Restaurant Menu",
    navCafeMenu: "Cafe Menu",
    navPoolMenu: "Pool Menu",
    navAbout: "About",
    navContact: "Contact"
  },
  tr: {
    moreInfo: "Daha Fazla Bilgi",
    search: "Ara",
    langLabel: "Türkçe",
    restaurant: "Restoran",
    cafe: "Kafe",
    pool: "Havuz",
    restaurantMenu: "Restoran Menüsü",
    cafeMenu: "Kafe Menüsü",
    poolMenu: "Havuz Menüsü",
    all: "Tümü",
    itemsSuffix: "ürün",
    emptyState: "Ürün bulunamadı.",
    addressLabel: "Adres",
    phoneLabel: "Telefon",
    hoursLabel: "Çalışma Saatleri",
    restaurantTitle: "Silver Rocks Restoran & Bar",
    navMenu: "Menü",
    navHome: "Ana Sayfa",
    navRestaurantMenu: "Restoran Menüsü",
    navCafeMenu: "Kafe Menüsü",
    navPoolMenu: "Havuz Menüsü",
    navAbout: "Hakkında",
    navContact: "İletişim"
  }
};

const langToggle = document.getElementById("langToggle");
const langDropdown = document.getElementById("langDropdown");
const currentLangLabel = document.getElementById("currentLangLabel");

function openLangMenu() {
  langDropdown.classList.add("active");
  langToggle.setAttribute("aria-expanded", "true");
}

function closeLangMenu() {
  langDropdown.classList.remove("active");
  langToggle.setAttribute("aria-expanded", "false");
}

langToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  langDropdown.classList.contains("active") ? closeLangMenu() : openLangMenu();
});

document.addEventListener("click", () => closeLangMenu());
langDropdown.addEventListener("click", (e) => e.stopPropagation());

document.querySelectorAll(".lang-option").forEach(btn => {
  btn.addEventListener("click", () => {
    applyLanguage(btn.getAttribute("data-lang"));
    closeLangMenu();
  });
});

function applyLanguage(lang) {
  currentLang = lang;
  items = getActiveMenuItems(lang);
  const dict = I18N[lang] || I18N.en;

  currentLangLabel.textContent = dict.langLabel;
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[key]) el.setAttribute("placeholder", dict[key]);
  });

  document.querySelectorAll(".lang-option").forEach(btn => {
    btn.classList.toggle("selected", btn.getAttribute("data-lang") === lang);
  });

  localStorage.setItem("lang", lang);

  render();
  refreshOpenModalText();
}

applyLanguage(currentLang);

// -----------------------------
// BACK TO TOP
// -----------------------------
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (backToTopBtn) backToTopBtn.hidden = window.scrollY < 400;
}, { passive: true });

backToTopBtn?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});