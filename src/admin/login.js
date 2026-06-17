import { supabase } from '../lib/supabase.js'

const form    = document.getElementById('loginForm')
const emailEl = document.getElementById('email')
const passEl  = document.getElementById('password')
const errEl   = document.getElementById('loginError')
const btnEl   = document.getElementById('loginBtn')

// Already logged in → go straight to dashboard
supabase.auth.getSession().then(({ data }) => {
  if (data.session) location.href = '/admin/dashboard.html'
})

form.addEventListener('submit', async e => {
  e.preventDefault()
  errEl.hidden = true
  btnEl.disabled = true
  btnEl.textContent = 'Signing in…'

  const { error } = await supabase.auth.signInWithPassword({
    email:    emailEl.value.trim(),
    password: passEl.value,
  })

  if (error) {
    errEl.textContent = error.message
    errEl.hidden = false
    btnEl.disabled = false
    btnEl.textContent = 'Sign In'
  } else {
    location.href = '/admin/dashboard.html'
  }
})
