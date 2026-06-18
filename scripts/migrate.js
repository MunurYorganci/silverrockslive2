/**
 * One-time migration: pushes all items from data/menu.js into Supabase.
 *
 * Usage:
 *   1. Make sure .env has VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY filled in.
 *   2. Run:  npm run migrate
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync }  from 'fs'
import ws               from 'ws'
import { fileURLToPath } from 'url'
import { dirname, join }  from 'path'

// Read .env manually (no dotenv needed, just simple parsing)
const __dir  = dirname(fileURLToPath(import.meta.url))
const envRaw = readFileSync(join(__dir, '../.env'), 'utf8')
const env    = Object.fromEntries(
  envRaw.split('\n')
    .filter(l => l.trim() && !l.startsWith('#'))
    .map(l => l.split('=').map(p => p.trim()))
    .filter(([k]) => k)
)

const supabaseUrl     = env['VITE_SUPABASE_URL']
const serviceRoleKey  = env['SUPABASE_SERVICE_ROLE_KEY']

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌  Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
  realtime: { transport: ws }
})

// Import menu data
const { MENUS } = await import('../data/menu.js')

const rows = []

for (const [menuType, config] of Object.entries(MENUS)) {
  const items = config.items || config.itemsByLang?.en || []
  items.forEach((item, idx) => {
    // Skip duplicates — cafe and pool share the same items
    const already = rows.find(r => r.id_legacy === String(item.id) && r.menu_type === menuType)
    if (already) return

    rows.push({
      id_legacy:  String(item.id),
      menu_type:  menuType,
      category:   item.category  || '',
      name_en:    item.name?.en  || '',
      name_tr:    item.name?.tr  || '',
      desc_en:    item.desc?.en  || '',
      desc_tr:    item.desc?.tr  || '',
      price:      item.price     || '',
      image_url:  item.image     || '',
      sort_order: idx,
      active:     true,
    })
  })
}

console.log(`Migrating ${rows.length} items…`)

const CHUNK = 50
for (let i = 0; i < rows.length; i += CHUNK) {
  const chunk = rows.slice(i, i + CHUNK)
  const { error } = await supabase.from('menu_items').insert(chunk)
  if (error) {
    console.error(`❌  Error at chunk ${i}:`, error.message)
    process.exit(1)
  }
  console.log(`  ✅  ${Math.min(i + CHUNK, rows.length)} / ${rows.length}`)
}

console.log('🎉  Migration complete!')
