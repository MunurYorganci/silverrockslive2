import { supabase }        from './lib/supabase.js'
import { CATEGORY_LABELS } from './lib/categories.js'
import { I18N }            from './lib/i18n.js'

// -----------------------------
// PAGE MODE
// -----------------------------
const pageMenuType = (document.body.dataset.menu || 'restaurant').toLowerCase()
let currentLang    = localStorage.getItem('lang') || 'en'
let items          = []

// -----------------------------
// STATE
// -----------------------------
let searchQuery          = ''
let isProgrammaticScroll = false
let sectionEls           = []
let rafPending           = false
let activeModalItemId    = null
let lastFocusedEl        = null

// -----------------------------
// DOM
// -----------------------------
const chipStrip      = document.getElementById('chipStrip')
const menuGrid       = document.getElementById('menuGrid')
const emptyState     = document.getElementById('emptyState')
const loadingState   = document.getElementById('loadingState')
const errorState     = document.getElementById('errorState')
const resultsTitle   = document.getElementById('resultsTitle')
const resultsCount   = document.getElementById('resultsCount')
const topbarEl       = document.querySelector('.topbar')
const chipsRowEl     = document.querySelector('.controls-row')
const stickyHeaderEl = document.querySelector('.sticky-header')

const menuTypeToggle   = document.getElementById('menuTypeToggle')
const menuTypeDropdown = document.getElementById('menuTypeDropdown')

const itemModal        = document.getElementById('itemModal')
const modalImg         = document.getElementById('modalImg')
const modalTitle       = document.getElementById('modalTitle')
const modalSub         = document.getElementById('modalSub')
const modalPrice       = document.getElementById('modalPrice')
const modalCategoryBadge = document.getElementById('modalCategoryBadge')
const modalCloseBtn    = document.getElementById('modalCloseBtn')
const modalShareBtn    = document.getElementById('modalShareBtn')

const infoModal        = document.getElementById('infoModal')
const infoCloseBtn     = document.getElementById('infoCloseBtn')
const moreInfoBtn      = document.getElementById('moreInfoBtn')

const hamburgerBtn     = document.getElementById('hamburgerBtn')
const sideMenu         = document.getElementById('sideMenu')
const sideMenuOverlay  = document.getElementById('sideMenuOverlay')
const sideMenuCloseBtn = document.getElementById('sideMenuCloseBtn')

const langToggle       = document.getElementById('langToggle')
const langDropdown     = document.getElementById('langDropdown')
const currentLangLabel = document.getElementById('currentLangLabel')

const backToTopBtn     = document.getElementById('backToTop')

// -----------------------------
// HELPERS
// -----------------------------
function escapeHtml(str) {
  return String(str ?? '')
    .replaceAll('&', '&amp;').replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;').replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function slugify(str) {
  return String(str ?? '').toLowerCase().trim()
    .replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

function tItem(item, field) {
  return item?.[field]?.[currentLang] || item?.[field]?.en || ''
}

function tCategory(cat) {
  const t = CATEGORY_LABELS[cat]
  if (!t) return cat
  return t[currentLang] || t.en || cat
}

function uniqueCategories(list) {
  return [...new Set(list.map(i => i.category))]
}

function setHeader(categoryName, total) {
  const dict = I18N[currentLang] || I18N.en
  resultsTitle.textContent = categoryName === 'All' ? dict.all : tCategory(categoryName || 'All')
  resultsCount.textContent = `${total} ${dict.itemsSuffix}`
}

function setSelectedChip(targetId) {
  chipStrip.querySelectorAll('.chip').forEach(c => {
    c.classList.toggle('selected', c.dataset.target === targetId)
  })
  chipStrip.querySelector(`.chip[data-target="${CSS.escape(targetId)}"]`)
    ?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
}

function getStickyTotal() {
  const topbarH  = topbarEl  ? topbarEl.getBoundingClientRect().height  : 56
  const chipsH   = chipsRowEl ? chipsRowEl.getBoundingClientRect().height : 72
  const headerH  = stickyHeaderEl ? stickyHeaderEl.getBoundingClientRect().height : 54
  return { topbarH, chipsH, headerH, stickyTotal: topbarH + chipsH + headerH }
}

function updateStickyVars() {
  const { topbarH, chipsH, headerH, stickyTotal } = getStickyTotal()
  const s = document.documentElement.style
  s.setProperty('--topbarH',    `${Math.round(topbarH)}px`)
  s.setProperty('--chipsH',     `${Math.round(chipsH)}px`)
  s.setProperty('--headerH',    `${Math.round(headerH)}px`)
  s.setProperty('--stickyTotal',`${Math.round(stickyTotal)}px`)
}

function showLoading(visible) {
  if (loadingState) loadingState.hidden = !visible
  if (menuGrid)     menuGrid.hidden = visible
  if (chipStrip)    chipStrip.hidden = visible
}

function showError(msg) {
  if (errorState) { errorState.hidden = false; errorState.textContent = msg }
  showLoading(false)
}

// -----------------------------
// MENU TYPE DROPDOWN
// -----------------------------
menuTypeToggle?.addEventListener('click', e => {
  e.stopPropagation()
  const open = menuTypeDropdown.classList.toggle('active')
  menuTypeToggle.setAttribute('aria-expanded', String(open))
})
document.addEventListener('click', () => {
  menuTypeDropdown?.classList.remove('active')
  menuTypeToggle?.setAttribute('aria-expanded', 'false')
})
menuTypeDropdown?.addEventListener('click', e => e.stopPropagation())

;(function markActiveMenuLink() {
  document.querySelectorAll('[data-menu-link]').forEach(link => {
    if (link.dataset.menuLink === pageMenuType) link.setAttribute('aria-current', 'page')
    else link.removeAttribute('aria-current')
  })
})()

// -----------------------------
// SEARCH
// -----------------------------
function getSearchFilteredItems() {
  const q = searchQuery.trim().toLowerCase()
  if (!q) return [...items]
  return items.filter(i => {
    return [i.name?.en, i.name?.tr, i.desc?.en, i.desc?.tr, i.category]
      .some(v => (v || '').toLowerCase().includes(q))
  })
}

// -----------------------------
// CHIPS
// -----------------------------
function renderChips(categories) {
  chipStrip.innerHTML = ''
  categories.forEach(cat => {
    const btn = document.createElement('button')
    btn.className = 'chip'
    btn.type = 'button'
    btn.dataset.target = slugify(cat)
    btn.textContent = tCategory(cat)
    btn.addEventListener('click', () => {
      const section = document.getElementById(btn.dataset.target)
      if (!section) return
      setSelectedChip(btn.dataset.target)
      isProgrammaticScroll = true
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
      window.setTimeout(() => (isProgrammaticScroll = false), 650)
    })
    chipStrip.appendChild(btn)
  })
}

// -----------------------------
// RENDER
// -----------------------------
function render() {
  const filtered = getSearchFilteredItems()
  emptyState.hidden = filtered.length !== 0
  menuGrid.innerHTML = ''

  const cats = uniqueCategories(items)
  renderChips(cats)

  const grouped = new Map()
  cats.forEach(cat => grouped.set(cat, []))
  filtered.forEach(it => {
    if (!grouped.has(it.category)) grouped.set(it.category, [])
    grouped.get(it.category).push(it)
  })

  let totalShown = 0

  cats.forEach(cat => {
    const sectionItems = grouped.get(cat) || []
    if (!sectionItems.length) return
    totalShown += sectionItems.length

    const section = document.createElement('section')
    section.className = 'menu-section'
    section.id = slugify(cat)
    section.dataset.category = cat

    section.innerHTML = `
      <div class="section-title">${escapeHtml(tCategory(cat))}</div>
      <div class="menu-grid">
        ${sectionItems.map(i => {
          const name    = tItem(i, 'name')
          const desc    = tItem(i, 'desc')
          const imgOk   = i.image && i.image.trim() !== ''
          return `
          <div class="card" data-open="${escapeHtml(String(i.id))}" role="button" tabindex="0" aria-label="${escapeHtml(name)}">
            <div class="card-left">
              <div class="item-name">${escapeHtml(name)}</div>
              <div class="item-desc">${escapeHtml(desc)}</div>
              <div class="price">${escapeHtml(i.price)}</div>
            </div>
            ${imgOk ? `<div class="card-right"><div class="thumb"><img src="${escapeHtml(i.image)}" alt="${escapeHtml(name)}" loading="lazy"></div></div>` : ''}
          </div>`
        }).join('')}
      </div>`

    menuGrid.appendChild(section)
  })

  sectionEls = Array.from(document.querySelectorAll('.menu-section'))
  setHeader('All', totalShown)
  updateStickyVars()
  handleScrollSpy(true)
}

// -----------------------------
// SCROLL SPY
// -----------------------------
function handleScrollSpy(force = false) {
  if (isProgrammaticScroll && !force) return
  if (!sectionEls.length) return

  const { stickyTotal } = getStickyTotal()
  const anchorY = stickyTotal + 14
  let best = sectionEls[0], bestScore = Infinity

  for (const sec of sectionEls) {
    const rect  = sec.getBoundingClientRect()
    const dist  = Math.abs(rect.top - anchorY)
    const score = (rect.top - anchorY) <= 0 ? dist : dist + 99999
    if (score < bestScore) { bestScore = score; best = sec }
  }

  setSelectedChip(best.id)
  setHeader(best.dataset.category || 'All', getSearchFilteredItems().length)
}

function onScroll() {
  if (rafPending) return
  rafPending = true
  requestAnimationFrame(() => { rafPending = false; handleScrollSpy(false) })
}

window.addEventListener('scroll', onScroll, { passive: true })
window.addEventListener('resize', () => { updateStickyVars(); handleScrollSpy(true) })

// -----------------------------
// ITEM MODAL
// -----------------------------
function findItemById(id) {
  return items.find(x => String(x.id) === String(id))
}

menuGrid.addEventListener('click', e => {
  const card = e.target.closest('[data-open]')
  if (card) openItemModal(card.getAttribute('data-open'))
})
menuGrid.addEventListener('keydown', e => {
  if (e.key !== 'Enter' && e.key !== ' ') return
  const card = e.target.closest('[data-open]')
  if (!card) return
  e.preventDefault()
  openItemModal(card.getAttribute('data-open'))
})

function openItemModal(id) {
  const item = findItemById(id)
  if (!item) return
  activeModalItemId = String(id)
  lastFocusedEl = document.activeElement

  modalTitle.textContent = tItem(item, 'name')
  modalSub.textContent   = tItem(item, 'desc')
  modalPrice.textContent = item.price || ''
  modalCategoryBadge.textContent = tCategory(item.category || '')

  const imgOk = item.image && item.image.trim() !== ''
  if (imgOk) { modalImg.src = item.image; modalImg.alt = tItem(item, 'name'); modalImg.hidden = false }
  else        { modalImg.removeAttribute('src'); modalImg.alt = ''; modalImg.hidden = true }

  itemModal.classList.add('open')
  itemModal.setAttribute('aria-hidden', 'false')
  document.body.style.overflow = 'hidden'
  modalCloseBtn.focus()
}

function refreshOpenModalText() {
  if (!activeModalItemId) return
  const item = findItemById(activeModalItemId)
  if (!item) return
  modalTitle.textContent = tItem(item, 'name')
  modalSub.textContent   = tItem(item, 'desc')
  modalCategoryBadge.textContent = tCategory(item.category || '')
  if (item.image && item.image.trim()) modalImg.alt = tItem(item, 'name')
}

function closeItemModal() {
  itemModal.classList.remove('open')
  itemModal.setAttribute('aria-hidden', 'true')
  document.body.style.overflow = ''
  activeModalItemId = null
  lastFocusedEl?.focus?.()
}

modalCloseBtn?.addEventListener('click', closeItemModal)
itemModal?.addEventListener('click', e => { if (e.target === itemModal) closeItemModal() })
modalShareBtn?.addEventListener('click', async () => {
  if (!activeModalItemId) return
  const item = findItemById(activeModalItemId)
  if (!item) return
  const name = tItem(item, 'name')
  try {
    if (navigator.share) await navigator.share({ title: name, text: `${name} - ${item.price}`, url: location.href })
    else if (navigator.clipboard) {
      await navigator.clipboard.writeText(`${name} - ${item.price}`)
      alert(currentLang === 'tr' ? 'Panoya kopyalandı ✅' : 'Copied to clipboard ✅')
    }
  } catch { /* user cancelled */ }
})

// -----------------------------
// INFO MODAL
// -----------------------------
function openInfoModal() {
  if (!infoModal) return
  infoModal.classList.add('open')
  infoModal.setAttribute('aria-hidden', 'false')
  document.body.style.overflow = 'hidden'
  infoCloseBtn?.focus()
}
function closeInfoModal() {
  if (!infoModal) return
  infoModal.classList.remove('open')
  infoModal.setAttribute('aria-hidden', 'true')
  document.body.style.overflow = ''
  lastFocusedEl?.focus?.()
}
moreInfoBtn?.addEventListener('click', () => { lastFocusedEl = document.activeElement; openInfoModal() })
moreInfoBtn?.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); lastFocusedEl = document.activeElement; openInfoModal() }
})
infoCloseBtn?.addEventListener('click', closeInfoModal)
infoModal?.addEventListener('click', e => { if (e.target === infoModal) closeInfoModal() })

// -----------------------------
// SIDE MENU
// -----------------------------
function openSideMenu() {
  if (!sideMenu || !sideMenuOverlay) return
  lastFocusedEl = document.activeElement
  sideMenu.classList.add('open'); sideMenuOverlay.classList.add('open')
  sideMenu.setAttribute('aria-hidden', 'false'); sideMenuOverlay.setAttribute('aria-hidden', 'false')
  hamburgerBtn?.setAttribute('aria-expanded', 'true')
  document.body.style.overflow = 'hidden'
  sideMenuCloseBtn?.focus()
}
function closeSideMenu() {
  if (!sideMenu || !sideMenuOverlay) return
  sideMenu.classList.remove('open'); sideMenuOverlay.classList.remove('open')
  sideMenu.setAttribute('aria-hidden', 'true'); sideMenuOverlay.setAttribute('aria-hidden', 'true')
  hamburgerBtn?.setAttribute('aria-expanded', 'false')
  document.body.style.overflow = ''
  lastFocusedEl?.focus?.()
}
hamburgerBtn?.addEventListener('click', () => { sideMenu?.classList.contains('open') ? closeSideMenu() : openSideMenu() })
hamburgerBtn?.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); sideMenu?.classList.contains('open') ? closeSideMenu() : openSideMenu() }
})
sideMenuCloseBtn?.addEventListener('click', closeSideMenu)
sideMenuOverlay?.addEventListener('click', closeSideMenu)

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && itemModal?.classList.contains('open'))  closeItemModal()
  if (e.key === 'Escape' && infoModal?.classList.contains('open'))  closeInfoModal()
  if (e.key === 'Escape' && sideMenu?.classList.contains('open'))   closeSideMenu()
})

// -----------------------------
// LANGUAGE SWITCHER
// -----------------------------
langToggle.addEventListener('click', e => {
  e.stopPropagation()
  const open = langDropdown.classList.toggle('active')
  langToggle.setAttribute('aria-expanded', String(open))
})
document.addEventListener('click', () => { langDropdown.classList.remove('active'); langToggle.setAttribute('aria-expanded', 'false') })
langDropdown.addEventListener('click', e => e.stopPropagation())
document.querySelectorAll('.lang-option').forEach(btn => {
  btn.addEventListener('click', () => { applyLanguage(btn.getAttribute('data-lang')); langDropdown.classList.remove('active') })
})

function applyLanguage(lang) {
  currentLang = lang
  const dict  = I18N[lang] || I18N.en
  currentLangLabel.textContent = dict.langLabel
  document.documentElement.lang = lang
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n')
    if (dict[key] !== undefined) el.textContent = dict[key]
  })
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder')
    if (dict[key]) el.setAttribute('placeholder', dict[key])
  })
  document.querySelectorAll('.lang-option').forEach(btn => {
    btn.classList.toggle('selected', btn.getAttribute('data-lang') === lang)
  })
  localStorage.setItem('lang', lang)
  render()
  refreshOpenModalText()
}

// -----------------------------
// BACK TO TOP
// -----------------------------
window.addEventListener('scroll', () => { if (backToTopBtn) backToTopBtn.hidden = window.scrollY < 400 }, { passive: true })
backToTopBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }))

// -----------------------------
// DATA — fetch from Supabase
// -----------------------------
function rowToItem(row) {
  return {
    id:       row.id,
    category: row.category,
    price:    row.price,
    image:    row.image_url || '',
    name:     { en: row.name_en || '', tr: row.name_tr || '' },
    desc:     { en: row.desc_en || '', tr: row.desc_tr || '' },
  }
}

async function loadMenu() {
  showLoading(true)
  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
    .eq('menu_type', pageMenuType)
    .eq('active', true)
    .order('sort_order', { ascending: true })

  if (error) {
    const dict = I18N[currentLang] || I18N.en
    showError(dict.loadError)
    return
  }

  items = data.map(rowToItem)
  showLoading(false)
  applyLanguage(currentLang)
}

// Real-time: re-fetch whenever admin changes anything
supabase
  .channel('menu_live')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'menu_items', filter: `menu_type=eq.${pageMenuType}` }, () => loadMenu())
  .subscribe()

loadMenu()
