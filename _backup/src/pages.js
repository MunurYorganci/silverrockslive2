import { I18N } from './lib/i18n.js'

const langToggle       = document.getElementById('langToggle')
const langDropdown     = document.getElementById('langDropdown')
const currentLangLabel = document.getElementById('currentLangLabel')
const hamburgerBtn     = document.getElementById('hamburgerBtn')
const sideMenu         = document.getElementById('sideMenu')
const sideMenuOverlay  = document.getElementById('sideMenuOverlay')
const sideMenuCloseBtn = document.getElementById('sideMenuCloseBtn')

let currentLang = localStorage.getItem('lang') || 'en'

function applyLanguage(lang) {
  currentLang = lang
  const dict = I18N[lang] || I18N.en
  currentLangLabel.textContent = dict.langLabel
  document.documentElement.lang = lang
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n
    if (dict[key] !== undefined) el.textContent = dict[key]
  })
  document.querySelectorAll('.lang-option').forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.lang === lang)
  })
  localStorage.setItem('lang', lang)
}

function openSideMenu() {
  sideMenu.classList.add('open')
  sideMenuOverlay.classList.add('open')
  sideMenu.setAttribute('aria-hidden', 'false')
  sideMenuOverlay.setAttribute('aria-hidden', 'false')
  hamburgerBtn.setAttribute('aria-expanded', 'true')
  document.body.style.overflow = 'hidden'
}

function closeSideMenu() {
  sideMenu.classList.remove('open')
  sideMenuOverlay.classList.remove('open')
  sideMenu.setAttribute('aria-hidden', 'true')
  sideMenuOverlay.setAttribute('aria-hidden', 'true')
  hamburgerBtn.setAttribute('aria-expanded', 'false')
  document.body.style.overflow = ''
}

langToggle.addEventListener('click', e => {
  e.stopPropagation()
  langDropdown.classList.toggle('active')
  langToggle.setAttribute('aria-expanded', String(langDropdown.classList.contains('active')))
})
document.addEventListener('click', () => {
  langDropdown.classList.remove('active')
  langToggle.setAttribute('aria-expanded', 'false')
})
langDropdown.addEventListener('click', e => e.stopPropagation())
document.querySelectorAll('.lang-option').forEach(btn => {
  btn.addEventListener('click', () => { applyLanguage(btn.dataset.lang); langDropdown.classList.remove('active') })
})

hamburgerBtn.addEventListener('click', () => {
  sideMenu.classList.contains('open') ? closeSideMenu() : openSideMenu()
})
hamburgerBtn.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); sideMenu.classList.contains('open') ? closeSideMenu() : openSideMenu() }
})
sideMenuCloseBtn.addEventListener('click', closeSideMenu)
sideMenuOverlay.addEventListener('click', closeSideMenu)
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeSideMenu()
})

applyLanguage(currentLang)
