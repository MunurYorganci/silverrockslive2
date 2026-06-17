import { supabase } from '../lib/supabase.js'

// -----------------------------
// AUTH GUARD
// -----------------------------
const { data: { session } } = await supabase.auth.getSession()
if (!session) { location.href = '/admin/login.html' }

// -----------------------------
// STATE
// -----------------------------
let allItems     = []
let activeFilter = 'all'
let editingId    = null      // null = adding new, string = editing existing

// -----------------------------
// DOM
// -----------------------------
const filterLinks    = document.querySelectorAll('.filter-link')
const tbody          = document.getElementById('itemsTbody')
const addBtn         = document.getElementById('addItemBtn')
const formModal      = document.getElementById('itemFormModal')
const formEl         = document.getElementById('itemForm')
const formTitle      = document.getElementById('formTitle')
const cancelBtn      = document.getElementById('cancelBtn')
const saveBtn        = document.getElementById('saveBtn')
const imageInput     = document.getElementById('imageInput')
const imagePreview   = document.getElementById('imagePreview')
const currentImgWrap = document.getElementById('currentImgWrap')
const currentImg     = document.getElementById('currentImg')
const logoutBtn      = document.getElementById('logoutBtn')
const toastEl        = document.getElementById('toast')

// -----------------------------
// TOAST
// -----------------------------
let toastTimer
function toast(msg, type = 'success') {
  toastEl.textContent = msg
  toastEl.className   = `toast toast--${type} show`
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 3000)
}

// -----------------------------
// FETCH
// -----------------------------
async function fetchItems() {
  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) { toast('Failed to load items: ' + error.message, 'error'); return }
  allItems = data
  renderTable()
}

// -----------------------------
// RENDER TABLE
// -----------------------------
function renderTable() {
  const filtered = activeFilter === 'all'
    ? allItems
    : allItems.filter(i => i.menu_type === activeFilter)

  if (!filtered.length) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:32px;color:#94a3b8;">No items found.</td></tr>`
    return
  }

  tbody.innerHTML = filtered.map(item => `
    <tr data-id="${item.id}">
      <td class="td-img">
        ${item.image_url
          ? `<img src="${escHtml(item.image_url)}" alt="" class="table-thumb">`
          : `<div class="table-thumb-empty"></div>`}
      </td>
      <td>
        <div class="item-name-cell">${escHtml(item.name_en)}</div>
        <div class="item-sub-cell">${escHtml(item.name_tr)}</div>
      </td>
      <td>${escHtml(item.category)}</td>
      <td><span class="menu-badge menu-badge--${item.menu_type}">${item.menu_type}</span></td>
      <td class="td-price">${escHtml(item.price)}</td>
      <td>
        <label class="toggle" title="${item.active ? 'Click to deactivate' : 'Click to activate'}">
          <input type="checkbox" class="toggle-input" data-id="${item.id}" ${item.active ? 'checked' : ''}>
          <span class="toggle-slider"></span>
        </label>
      </td>
      <td class="td-actions">
        <button class="btn-icon btn-edit" data-id="${item.id}" title="Edit">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </button>
        <button class="btn-icon btn-delete" data-id="${item.id}" title="Delete">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
        </button>
      </td>
    </tr>
  `).join('')

  // Active toggle
  tbody.querySelectorAll('.toggle-input').forEach(cb => {
    cb.addEventListener('change', () => toggleActive(cb.dataset.id, cb.checked))
  })
  // Edit
  tbody.querySelectorAll('.btn-edit').forEach(btn => {
    btn.addEventListener('click', () => openEditForm(btn.dataset.id))
  })
  // Delete
  tbody.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', () => deleteItem(btn.dataset.id))
  })
}

function escHtml(str) {
  return String(str ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;')
}

// -----------------------------
// TOGGLE ACTIVE
// -----------------------------
async function toggleActive(id, active) {
  const { error } = await supabase.from('menu_items').update({ active }).eq('id', id)
  if (error) { toast('Error: ' + error.message, 'error'); fetchItems(); return }
  allItems = allItems.map(i => i.id === id ? { ...i, active } : i)
  toast(active ? 'Item activated.' : 'Item hidden from menu.')
}

// -----------------------------
// DELETE
// -----------------------------
async function deleteItem(id) {
  const item = allItems.find(i => i.id === id)
  if (!confirm(`Delete "${item?.name_en}"? This cannot be undone.`)) return

  // Delete image from storage if exists
  if (item?.image_url) {
    const path = item.image_url.split('/item-images/')[1]
    if (path) await supabase.storage.from('item-images').remove([path])
  }

  const { error } = await supabase.from('menu_items').delete().eq('id', id)
  if (error) { toast('Error: ' + error.message, 'error'); return }
  allItems = allItems.filter(i => i.id !== id)
  renderTable()
  toast('Item deleted.')
}

// -----------------------------
// FORM — OPEN / CLOSE
// -----------------------------
function openAddForm() {
  editingId = null
  formTitle.textContent = 'Add Item'
  formEl.reset()
  imagePreview.innerHTML = ''
  if (currentImgWrap) currentImgWrap.hidden = true
  saveBtn.textContent = 'Add Item'
  formModal.classList.add('open')
}

function openEditForm(id) {
  const item = allItems.find(i => i.id === id)
  if (!item) return
  editingId = id
  formTitle.textContent = 'Edit Item'

  formEl.name_en.value    = item.name_en    || ''
  formEl.name_tr.value    = item.name_tr    || ''
  formEl.desc_en.value    = item.desc_en    || ''
  formEl.desc_tr.value    = item.desc_tr    || ''
  formEl.category.value   = item.category   || ''
  formEl.menu_type.value  = item.menu_type  || 'restaurant'
  formEl.price.value      = item.price      || ''

  imagePreview.innerHTML = ''
  if (item.image_url && currentImgWrap && currentImg) {
    currentImg.src = item.image_url
    currentImgWrap.hidden = false
  } else if (currentImgWrap) {
    currentImgWrap.hidden = true
  }

  saveBtn.textContent = 'Save Changes'
  formModal.classList.add('open')
}

function closeForm() {
  formModal.classList.remove('open')
  editingId = null
  formEl.reset()
  imagePreview.innerHTML = ''
}

addBtn.addEventListener('click', openAddForm)
cancelBtn.addEventListener('click', closeForm)
document.getElementById('cancelBtn2')?.addEventListener('click', closeForm)
formModal.addEventListener('click', e => { if (e.target === formModal) closeForm() })
document.addEventListener('keydown', e => { if (e.key === 'Escape' && formModal.classList.contains('open')) closeForm() })

// Image preview
imageInput.addEventListener('change', () => {
  const file = imageInput.files[0]
  if (!file) { imagePreview.innerHTML = ''; return }
  const url = URL.createObjectURL(file)
  imagePreview.innerHTML = `<img src="${url}" alt="preview" class="img-preview">`
})

// -----------------------------
// FORM — SUBMIT
// -----------------------------
formEl.addEventListener('submit', async e => {
  e.preventDefault()
  saveBtn.disabled = true
  saveBtn.textContent = 'Saving…'

  const fields = {
    name_en:   formEl.name_en.value.trim(),
    name_tr:   formEl.name_tr.value.trim(),
    desc_en:   formEl.desc_en.value.trim(),
    desc_tr:   formEl.desc_tr.value.trim(),
    category:  formEl.category.value.trim(),
    menu_type: formEl.menu_type.value,
    price:     formEl.price.value.trim(),
  }

  // Upload image if a new file was selected
  const file = imageInput.files[0]
  if (file) {
    const ext  = file.name.split('.').pop()
    const path = `${editingId || crypto.randomUUID()}.${ext}`
    const { error: upErr } = await supabase.storage.from('item-images').upload(path, file, { upsert: true })
    if (upErr) { toast('Image upload failed: ' + upErr.message, 'error'); saveBtn.disabled = false; saveBtn.textContent = editingId ? 'Save Changes' : 'Add Item'; return }
    fields.image_url = supabase.storage.from('item-images').getPublicUrl(path).data.publicUrl
  }

  let error
  if (editingId) {
    ;({ error } = await supabase.from('menu_items').update(fields).eq('id', editingId))
  } else {
    const maxOrder = allItems.length ? Math.max(...allItems.map(i => i.sort_order || 0)) : 0
    ;({ error } = await supabase.from('menu_items').insert({ ...fields, sort_order: maxOrder + 1, active: true }))
  }

  saveBtn.disabled = false
  saveBtn.textContent = editingId ? 'Save Changes' : 'Add Item'

  if (error) { toast('Error: ' + error.message, 'error'); return }

  closeForm()
  await fetchItems()
  toast(editingId ? 'Item updated.' : 'Item added.')
})

// -----------------------------
// FILTER
// -----------------------------
filterLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault()
    activeFilter = link.dataset.filter
    filterLinks.forEach(l => l.classList.toggle('active', l.dataset.filter === activeFilter))
    renderTable()
  })
})

// -----------------------------
// LOGOUT
// -----------------------------
logoutBtn.addEventListener('click', async () => {
  await supabase.auth.signOut()
  location.href = '/admin/login.html'
})

// -----------------------------
// INIT
// -----------------------------
fetchItems()
